import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateCatDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  name: string;
  @ApiProperty()
  age: number;
  @ApiProperty()
  breed: string;
}
