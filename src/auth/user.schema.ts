import * as mongoose from 'mongoose';
import { UserRoleEnum } from './user-role.enum';

export const UserSchema = new mongoose.Schema({
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

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: UserRoleEnum,
    required: true,
  },

  cin: {
    type: String,
    unique: true,
    required: true,
  },

  is_active: {
    type: Boolean,
    default: true,
  },
});

export interface User extends mongoose.Document {
  email: string;
  password: string;
  role: UserRoleEnum;
  cin: string;
  is_active: boolean;
}
