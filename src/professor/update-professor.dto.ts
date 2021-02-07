import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { ProfessorDepartmentEnum } from './professor-department.enum';

export class UpdateProfessorDto {
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
  @IsEnum(ProfessorDepartmentEnum)
  departement: ProfessorDepartmentEnum;
}
