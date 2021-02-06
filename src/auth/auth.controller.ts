import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private userService: AuthService) {}
  @Post()
  login(@Body() userDto: UserLoginDto) {
    return this.userService.login(userDto);
  }
}
