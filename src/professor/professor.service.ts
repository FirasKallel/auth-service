import {
    Injectable,
    NotFoundException,
    ForbiddenException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { CreateProfessorDto } from './create-professor.dto';
  import { Model } from 'mongoose';
  import { Professor } from './professor.model';
  
  @Injectable()
  export class ProfessorService {
    constructor(@InjectModel('Professor') private professorModel: Model<Professor>) {}
  
    async gets() {
      try {
        return await this.professorModel.find({});
      } catch (error) {
        throw new NotFoundException('No students found.');
      }
    }
  
    async get(cin: string) {
      const student = await this.find(cin);
      return student;
    }
  
    async create(createProfessorDto: CreateProfessorDto) {
      const newProfessor = new this.professorModel(createProfessorDto);
      try {
        const result = await newProfessor.save();
      } catch (error) {
        throw new ForbiddenException('Student already exists.');
      }
      return newProfessor;
    }
  
    async put(cin: string, field: any) {
      const student = await this.find(cin);
    }
  
    async update(ProfDto: CreateProfessorDto) {
      const updatedProf = await this.find(ProfDto.cin);
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
        updatedProf.filiere = ProfDto.departement;
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
  }