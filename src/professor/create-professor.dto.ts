import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  Length,
} from 'class-validator';

export class CreateProfessorDto {
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
  @Length(8)
  cin: string;
  @IsString()
  @ApiProperty()
  departement: string;
}
