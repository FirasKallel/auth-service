import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { PassportJwtStrategy } from './strategy/passport-jwt.strategy';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: {
        expiresIn: 60 * 60 * 24, //One day
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PassportJwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
