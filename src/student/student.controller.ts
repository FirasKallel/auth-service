import { Body, Controller, Get, Param, Post, Query, Put,Delete} from '@nestjs/common';
import { StudentService } from './student.service';
import { get } from 'https';
import { CreateStudentDto } from './create-student.dto';
import { ok } from 'assert';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Students')
@Controller('students')
export class StudentController 
{   
    constructor(private studentService: StudentService) {}

    @Get()
    async getStudents(){
        return this.studentService.gets();
    }

    @Get(':cin')
    async getStudent(@Param('cin') cin: string){
        return this.studentService.get(cin);
    }    

    @Post()
    create(@Body() createStudentDto: CreateStudentDto) {
        const newStudent = this.studentService.create(createStudentDto);
        return newStudent;
    }

    @Put()
    put(@Body() studentDto: CreateStudentDto ) {
        const student = this.studentService.update(studentDto);
        return student;
    }

    @Delete(':cin')
    async deleteStudent(@Param('cin')cin: string){
        this.studentService.delete(cin);
        return cin + " deleted";
    }

}
