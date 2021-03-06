import * as mongoose from 'mongoose';
import { Student } from '../../students/model/student.model';
import { Professor } from '../../professors/model/professor.model';
import { Enterprise } from '../../enterprises/model/enterprise.model';
import { AcademicYear } from "../../academic-year/model/academic-year.model";
import { Session } from "../../sessions/model/session.model";

export const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor',
    required: true,
  },
  validity: {
    type: Boolean,
    required: true,
  },
  acceptedBySupervisor: {
    type: Boolean,
    required: true,
  },
  state: {
    type: String,
    enum: ['NONE', 'PENDING', 'CONFIRMED'],
    required: true,
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
  },
  level: {
    type: String,
    enum: ['CYCLE', 'MASTER', 'LICENCE'],
    required: true,
  },
  academicYear: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AcademicYear',
    required: true,
  },
  enterprise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enterprise',
    required: true,
  },
  enterpriseSupervisor: {
    type: String,
    required: true,
  },
});

export interface Project extends mongoose.Document {
  title: string;
  description: string;
  tags: string[];
  student: Student;
  supervisor: Professor;
  acceptedBySupervisor: boolean;
  validity: boolean;
  level: string;
  state: string;
  session: Session;
  academicYear: AcademicYear;
  enterprise: Enterprise;
  enterpriseSupervisor: string;
}
