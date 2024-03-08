import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
  ) {}
  async create(user: User): Promise<User> {
    const res = await this.userModel.create(user);
    return res;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findById(id: string): Promise<User> {
    const res = await this.userModel.findById(id);
    if (!res) throw new NotFoundException('User not found');
    return res;
  }

  async updateById(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
