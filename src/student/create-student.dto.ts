import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Matches } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty()
  @IsString()
  @Matches('^[0-9]{7}$')
  numEtudiant: string;
  @ApiProperty()
  @IsString()
  nom: string;
  @IsString()
  @ApiProperty()
  prenom: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  @Matches('^[0-9]{8}$')
  cin: string;
  @IsString()
  @ApiProperty()
  filiere: string;
}
