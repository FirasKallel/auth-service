import {
  ConflictException,
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

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
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
      throw new ConflictException('The mail provided is already used');
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
}
