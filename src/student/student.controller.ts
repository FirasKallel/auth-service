import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './create-student.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateStudentDto } from './update-student.dto';

@ApiTags('Students')
@Controller('students')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get()
  async getStudents() {
    return this.studentService.gets();
  }

  @Get(':cin')
  async getStudent(@Param('cin') cin: string) {
    return this.studentService.get(cin);
  }

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    const newStudent = this.studentService.create(createStudentDto);
    return newStudent;
  }

  @Put(':cin')
  put(@Param('cin') cin: string, @Body() studentDto: UpdateStudentDto) {
    const student = this.studentService.update(studentDto, cin);
    return student;
  }

  @Delete(':cin')
  async deleteStudent(@Param('cin') cin: string) {
    this.studentService.delete(cin);
    return cin + ' deleted';
  }
}
