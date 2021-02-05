import { Body, Controller, Get, Param, Post, Query, Put,Delete} from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { get } from 'https';
import { CreateProfessorDto } from './create-professor.dto';
import { ok } from 'assert';
import { ApiTags } from '@nestjs/swagger';

@Controller('professor')
export class ProfessorController {}

@ApiTags('Students')
@Controller('students')
export class StudentController 
{   
    constructor(private professorService: ProfessorService) {}

    @Get()
    async getStudents(){
        return this.professorService.gets();
    }

    @Get(':cin')
    async getStudent(@Param('cin') cin: string){
        return this.professorService.get(cin);
    }    

    @Post()
    async create(@Body() createProfessorDto: ProfessorService) {
        //const newStudent = this.professorService.create(createProfessorDto);
        //return newStudent;
    }

    @Put()
    async put(@Body() professorDto: CreateProfessorDto ) {
        const student = this.professorService.update(professorDto);
        return student;
    }

    @Delete(':cin')
    async deleteStudent(@Param('cin')cin: string){
        this.professorService.delete(cin);
        return cin + " deleted";
    }

}