import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User, UserAddress } from './entities/user.entity';
import { Order } from '../orders/entities/order.entity';
import { UserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    @InjectModel('orders') private orderModel: mongoose.Model<Order>,
  ) {}
  async create({ userAddress, ...createUserDto }: UserDto): Promise<User> {
    if (userAddress) {
      // const newAddress = new this.userAddressModel(userAddress);
      // const saveAddress = await newAddress.save();
      // const newUser = new this.userModel({
      //   ...createUserDto,
      //   userAddress: saveAddress._id,
      // });
      // return newUser.save();
    }
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
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
