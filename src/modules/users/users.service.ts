import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User, UserAddress } from './entities/user.entity';
import { Order } from '../orders/entities/order.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    @InjectModel(UserAddress.name)
    private userAddressModel: mongoose.Model<UserAddress>,
    @InjectModel(Order.name) private orderModel: mongoose.Model<Order>,
  ) {}

  async create(user: User): Promise<User> {
    if (user.userAddress) {
      const newUserAddress = await this.userAddressModel.create(
        user.userAddress,
      );
      user.userAddress = newUserAddress._id;
    }
    const newUser = await this.userModel.create(user);
    return newUser;
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

  async findOneByOrder(id: string): Promise<User> {
    const res = (await this.userModel.findOne({ id })).populate(
      'orders',
      '',
      this.orderModel,
    );
    return res;
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async updateById(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
