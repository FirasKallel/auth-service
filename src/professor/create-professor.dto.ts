import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length, IsNotEmpty, IsEnum } from 'class-validator';
import { ProfessorDepartmentEnum } from './professor-department.enum';

export class CreateProfessorDto {
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
  @Length(8)
  cin: string;
  @IsNotEmpty()
  @ApiProperty()
  @IsEnum(ProfessorDepartmentEnum)
  departement: ProfessorDepartmentEnum;
}
