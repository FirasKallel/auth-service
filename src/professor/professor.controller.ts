import { Body, Controller, Get, Param, Post, Query, Put,Delete} from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { get } from 'https';
import { CreateProfessorDto } from './create-professor.dto';
import { ok } from 'assert';
import { ApiTags } from '@nestjs/swagger';

@Controller('professor')
export class ProfessorController {}

@ApiTags('professor')
@Controller('professor')
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
    async create(@Body() ProfessorDto: CreateProfessorDto) {
        const newProf = this.professorService.create(ProfessorDto);
        return newProf;
    }

    @Put()
    async put(@Body() professorDto: CreateProfessorDto ) {
        const Prof = this.professorService.update(professorDto);
        return Prof;
    }

    @Delete(':cin')
    async deleteStudent(@Param('cin')cin: string){
        this.professorService.delete(cin);
        return cin + " deleted";
    }

}