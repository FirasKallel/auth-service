import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './student.model';
import { StudentService } from './student.service';
import { AuthModule } from '../auth/auth.module';
import { UserSchema } from '../auth/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Student', schema: StudentSchema },
      { name: 'User', schema: UserSchema },
    ]),
    AuthModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
