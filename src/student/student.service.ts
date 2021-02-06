import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStudentDto } from './create-student.dto';
import { Model } from 'mongoose';
import { Student } from './student.model';
import { UpdateStudentDto } from './update-student.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel('Student') private studentModel: Model<Student>,
    private authService: AuthService,
  ) {}

  async gets() {
    try {
      return await this.studentModel.find({});
    } catch (error) {
      throw new NotFoundException('No students found.');
    }
  }

  async get(cin: string) {
    const student = await this.findStudent(cin);
    return student;
  }

  async create(createStudentDto: CreateStudentDto) {
    const user = {
      email: createStudentDto.email,
      cin: createStudentDto.cin,
      role: 'student',
      password: createStudentDto.cin,
    };
    await this.authService.create(user);
    const newStudent = new this.studentModel(createStudentDto);
    try {
      const result = await newStudent.save();
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
    return newStudent;
  }

  async put(cin: string, field: any) {
    const student = await this.findStudent(cin);
  }

  async update(StudentDto: UpdateStudentDto, cin) {
    const updatedStudent = await this.findStudent(cin);
    if (StudentDto.email) {
      updatedStudent.email = StudentDto.email;
    }
    if (StudentDto.prenom) {
      updatedStudent.prenom = StudentDto.prenom;
    }
    if (StudentDto.nom) {
      updatedStudent.nom = StudentDto.nom;
    }
    if (StudentDto.filiere) {
      updatedStudent.filiere = StudentDto.filiere;
    }
    updatedStudent.save();
    return updatedStudent;
  }

  async delete(num: string) {
    const deletedStudent = await this.findStudent(num);
    deletedStudent.delete();
    return num;
  }

  private async findStudent(cin: string): Promise<Student> {
    let student;
    try {
      student = await this.studentModel.findOne({ cin }).exec();
      console.log(student);
    } catch (error) {
      throw new NotFoundException('Could not find student.');
    }
    if (!student) {
      throw new NotFoundException('Could not find student.');
    }
    return student;
  }
}
