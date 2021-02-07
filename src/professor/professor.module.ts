import { forwardRef, Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfessorSchema } from './professor.model';
import { UserSchema } from '../auth/user.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Professor', schema: ProfessorSchema },
      { name: 'User', schema: UserSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  providers: [ProfessorService],
  controllers: [ProfessorController],
  exports: [ProfessorService],
})
export class ProfessorModule {}
