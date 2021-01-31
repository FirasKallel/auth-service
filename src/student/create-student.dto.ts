import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEmail, IsBoolean, max, MaxLength, MinLength, Length, IsInt, Min, Max} from 'class-validator';

export class CreateStudentDto {

    @ApiProperty()
    @IsString()
    @Length(7)
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
    @Length(8)
    cin: string;
    @IsString()
    @ApiProperty()
    filiere: string;
}
