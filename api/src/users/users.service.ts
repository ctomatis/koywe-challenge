import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interface/user.interface';
import { SignUpDto } from 'src/auth/dto/signup.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private userModel: Model<IUser>) { }

  async create(signUpDto: SignUpDto): Promise<IUser | null> {
    const user = await new this.userModel(signUpDto);
    return user.save();
  }

  async findOneByEmail(email: string): Promise<IUser | null> {
    return await this.userModel.findOne({ email: email }).exec();
  }
}
