import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthService } from './auth.service';
import { AdminCreateDto } from './dto/admin-create.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private userService: AuthService) {}

  @Post()
  login(@Body() userDto: UserLoginDto) {
    return this.userService.login(userDto);
  }

  @Post('admin')
  async create_admin(@Body() adminDto: AdminCreateDto) {
    const admin = {
      ...adminDto,
      role: 'admin',
      cin: '0',
    };
    return await this.userService.create(admin);
  }
}
