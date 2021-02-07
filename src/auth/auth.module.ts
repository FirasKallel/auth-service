import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { PassportJwtStrategy } from './strategy/passport-jwt.strategy';
import { StudentModule } from '../student/student.module';
import { ProfessorModule } from '../professor/professor.module';
import { StudentSchema } from '../student/student.model';
import { ProfessorSchema } from '../professor/professor.model';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Student', schema: StudentSchema },
      { name: 'Professor', schema: ProfessorSchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: {
        expiresIn: 60 * 60 * 24, //One day
      },
    }),
    forwardRef(() => StudentModule),
    forwardRef(() => ProfessorModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, PassportJwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
