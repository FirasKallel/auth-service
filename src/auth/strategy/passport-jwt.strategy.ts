import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user.schema';
import { UnauthorizedException } from '@nestjs/common';

dotenv.config();

export class PassportJwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel('User') private userModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(payload) {
    const user = await this.userModel.findOne({ email: payload.email });
    if (user) {
      delete user.password;
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
