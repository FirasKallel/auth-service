import { Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfessorSchema } from './professor.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Professor', schema: ProfessorSchema }]),
  ],
  providers: [ProfessorService],
  controllers: [ProfessorController],
})
export class ProfessorModule {}
