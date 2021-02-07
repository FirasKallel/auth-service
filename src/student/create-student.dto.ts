import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Matches, IsNotEmpty } from 'class-validator';
import { StudentFiliereEnum } from './student-filiere.enum';

export class CreateStudentDto {
  @ApiProperty()
  @IsString()
  @Matches('^[0-9]{7}$')
  numEtudiant: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nom: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  prenom: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches('^[0-9]{8}$')
  cin: string;
  @IsNotEmpty()
  @ApiProperty()
  filiere: StudentFiliereEnum;
}
