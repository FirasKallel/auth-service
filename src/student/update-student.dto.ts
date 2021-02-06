import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

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
  @IsString()
  @ApiProperty()
  filiere: string;
}
