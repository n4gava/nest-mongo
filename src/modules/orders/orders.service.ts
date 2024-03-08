import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import * as mongoose from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('orders') private orderModel: mongoose.Model<Order>,
  ) {}

  async create(user: Order): Promise<Order> {
    const res = await this.orderModel.create(user);
    return res;
  }

  async findAll(): Promise<Order[]> {
    const users = await this.orderModel.find();
    return users;
  }

  async findById(id: string): Promise<Order> {
    const res = await this.orderModel.findById(id);
    if (!res) throw new NotFoundException('Order not found');
    return res;
  }

  async findOne(id: string): Promise<Order> {
    return await this.orderModel.findOne({ id });
  }

  async updateById(id: string, updateUserDto: UpdateOrderDto) {
    return await this.orderModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Order> {
    return await this.orderModel.findByIdAndDelete(id);
  }
}
