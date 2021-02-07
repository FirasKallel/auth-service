import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserLoginDto } from './dto/user-login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { StudentService } from '../student/student.service';
import { ProfessorService } from '../professor/professor.service';
import { UserRoleEnum } from './user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
    @Inject(forwardRef(() => StudentService))
    private studentService: StudentService,
    @Inject(forwardRef(() => ProfessorService))
    private professorService: ProfessorService,
  ) {}

  async create(user: {
    password: string;
    role: string;
    cin: string;
    email: string;
  }) {
    const new_user = new this.userModel(user);
    new_user.password = await bcrypt.hash(
      user.password,
      await bcrypt.genSalt(),
    );
    try {
      await new_user.save();
    } catch (e) {
      if (e.keyValue && e.keyValue.cin == '0') {
        throw new ForbiddenException('There is already an admin');
      } else {
        throw new ConflictException('The mail provided is already used');
      }
    }
    return {
      cin: user.cin,
      email: user.email,
      role: user.role,
    };
  }

  async login(credentials: UserLoginDto) {
    const { email, password } = credentials;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!user.is_active) {
      throw new UnauthorizedException(
        'Your account is not active contact the admin',
      );
    }
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        role: user.role,
        cin: user.cin,
      };
      const jwt = this.jwtService.sign(payload);
      return {
        access_token: jwt,
      };
    } else {
      throw new UnauthorizedException('Invalid password');
    }
  }

  async activate(cin: string) {
    const user = await this.userModel.findOne({ cin });
    user.is_active = true;
    await user.save();
    if (user.role == UserRoleEnum.STUDENT) {
      await this.studentService.activate(cin);
    } else if (user.role == UserRoleEnum.PROFESSOR) {
      await this.professorService.activate(cin);
    }
    return user;
  }

  async deactivate(cin: string) {
    const user = await this.userModel.findOne({ cin });
    user.is_active = false;
    await user.save();
    if (user.role == UserRoleEnum.STUDENT) {
      await this.studentService.activate(cin);
    } else if (user.role == UserRoleEnum.PROFESSOR) {
      await this.professorService.activate(cin);
    }
    return user;
  }
}
