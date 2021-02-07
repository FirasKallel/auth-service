import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ProfessorDepartmentEnum } from './professor-department.enum';

export const ProfessorSchema = new mongoose.Schema({
  cin: {
    type: Number,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value,
        );
      },
      message: 'Email Not Valid',
    },
  },

  nom: {
    type: String,
    required: true,
  },

  prenom: {
    type: String,
    required: true,
  },

  departement: {
    type: String,
    enum: ProfessorDepartmentEnum,
    required: true,
  },

  is_active: {
    type: Boolean,
    default: true,
  },
});

export interface Professor extends mongoose.Document {
  cun: number;
  email: string;
  nom: string;
  prenom: string;
  departement: ProfessorDepartmentEnum;
  is_active: boolean;
}
