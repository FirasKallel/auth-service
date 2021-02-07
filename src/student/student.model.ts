import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { StudentFiliereEnum } from './student-filiere.enum';

export const StudentSchema = new mongoose.Schema({
  cin: {
    type: String,
    unique: true,
    validate: {
      validator: (value) => /^[0-9]{8}$/.test(value),
      message: 'Invalid CIN',
    },
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

  numEtudiant: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^[0-9]{7}$/.test(value),
      message: 'Invalid Student Number',
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

  projectId: String,

  filiere: {
    type: String,
    enum: StudentFiliereEnum,
    required: true,
  },

  is_active: {
    type: Boolean,
    default: true,
  },
});

export interface Student extends mongoose.Document {
  numEtudiant: string;
  cin: string;
  email: string;
  nom: string;
  prenom: string;
  projectId: string;
  filiere: StudentFiliereEnum;
  is_active: boolean;
}
