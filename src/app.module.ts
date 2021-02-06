import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { CatexampleModule } from './catexample/catexample.module';
import { StudentModule } from './student/student.module';
import { ProfessorModule } from './professor/professor.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_SERVER +
        '://' +
        process.env.MONGODB_USER +
        ':' +
        process.env.MONGODB_PASSWORD +
        '@localhost:' +
        process.env.MONGODB_PORT,
    ),
    CatexampleModule,
    StudentModule,
    ProfessorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
