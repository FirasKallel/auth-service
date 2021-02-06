import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './create-professor.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateProfessorDto } from './update-professor.dto';

@ApiTags('Professors')
@Controller('professors')
export class ProfessorController {
  constructor(private professorService: ProfessorService) {}

  @Get()
  async getProfessors() {
    return this.professorService.gets();
  }

  @Get(':cin')
  async getProfessor(@Param('cin') cin: string) {
    return this.professorService.get(cin);
  }

  @Post()
  async create(@Body() ProfessorDto: CreateProfessorDto) {
    const newProf = this.professorService.create(ProfessorDto);
    return newProf;
  }

  @Put(':cin')
  async put(
    @Param('cin') cin: string,
    @Body() professorDto: UpdateProfessorDto,
  ) {
    const Prof = this.professorService.update(professorDto, cin);
    return Prof;
  }

  @Delete(':cin')
  async deleteProfessor(@Param('cin') cin: string) {
    this.professorService.delete(cin);
    return cin + ' deleted';
  }
}
