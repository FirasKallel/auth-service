import { UserRoleEnum } from '../user-role.enum';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  cin: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: UserRoleEnum;
}
