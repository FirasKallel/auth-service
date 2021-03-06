import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './model/project.model';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { UsersModule } from '../users/users.module';
import { StudentsModule } from '../students/students.module';
import { ProfessorsModule } from '../professors/professors.module';
import { EnterpriseSchema } from '../enterprises/model/enterprise.model';
import { EnterprisesModule } from "../enterprises/enterprises.module";
import { AcademicYearModule } from "../academic-year/academic-year.module";
import { MailingModule } from "../mailing/mailing.module";
import { SessionsService } from "../sessions/sessions.service";
import { SessionsModule } from "../sessions/sessions.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Project', schema: ProjectSchema },
      { name: 'Enterprise', schema: EnterpriseSchema },
    ]),
    UsersModule,
    StudentsModule,
    ProfessorsModule,
    EnterprisesModule,
    AcademicYearModule,
    MailingModule,
  ],
  exports: [ProjectsService],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
