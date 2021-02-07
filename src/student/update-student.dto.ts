import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';
import { StudentFiliereEnum } from './student-filiere.enum';

export class UpdateStudentDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  nom: string;
  @IsOptional()
  @IsString()
  @ApiProperty()
  prenom: string;
  @IsOptional()
  @ApiProperty()
  @IsEmail()
  email: string;
  @IsOptional()
  @ApiProperty()
  filiere: StudentFiliereEnum;
}
