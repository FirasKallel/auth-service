import {
  Injectable,
  NotFoundException,
  ForbiddenException, Inject, forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProfessorDto } from './create-professor.dto';
import { Model } from 'mongoose';
import { Professor } from './professor.model';
import { UpdateProfessorDto } from './update-professor.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectModel('Professor') private professorModel: Model<Professor>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async gets() {
    try {
      return await this.professorModel.find({});
    } catch (error) {
      throw new NotFoundException('No professors found.');
    }
  }

  async get(cin: string) {
    const professor = await this.find(cin);
    return professor;
  }

  async create(createProfessorDto: CreateProfessorDto) {
    const user = {
      email: createProfessorDto.email,
      cin: createProfessorDto.cin,
      role: 'student',
      password: createProfessorDto.cin,
    };
    await this.authService.create(user);
    const newProfessor = new this.professorModel(createProfessorDto);
    try {
      const result = await newProfessor.save();
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
    return newProfessor;
  }

  async put(cin: string, field: any) {
    const student = await this.find(cin);
  }

  async update(ProfDto: UpdateProfessorDto, cin) {
    const updatedProf = await this.find(cin);
    if (ProfDto.email) {
      updatedProf.email = ProfDto.email;
    }
    if (ProfDto.prenom) {
      updatedProf.prenom = ProfDto.prenom;
    }
    if (ProfDto.nom) {
      updatedProf.nom = ProfDto.nom;
    }
    if (ProfDto.departement) {
      updatedProf.departement = ProfDto.departement;
    }
    updatedProf.save();
    return updatedProf;
  }

  async delete(num: string) {
    const deletedProf = await this.find(num);
    deletedProf.delete();
    return num;
  }

  private async find(cin: string): Promise<Professor> {
    let professor;
    try {
      professor = await this.professorModel.findOne({ cin }).exec();
      console.log(professor);
    } catch (error) {
      throw new NotFoundException('Could not find Professor.');
    }
    if (!professor) {
      throw new NotFoundException('Could not find Professor.');
    }
    return professor;
  }

  async activate(cin: string) {
    const professor = await this.professorModel.findOne({ cin });
    professor.is_active = true;
    await professor.save();
    return professor;
  }

  async deactivate(cin: string) {
    const professor = await this.professorModel.findOne({ cin });
    professor.is_active = false;
    await professor.save();
    return professor;
  }
}
