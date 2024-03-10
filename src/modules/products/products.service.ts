import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { User } from '../users/entities/user.entity';
import { Order } from '../orders/entities/order.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: mongoose.Model<Product>,
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
    @InjectModel(Order.name) private orderModel: mongoose.Model<Order>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    userId?: string,
  ): Promise<Product> {
    const newProduct = await this.productModel.create(createProductDto);
    await this.userModel.findByIdAndUpdate(userId, {
      $push: { products: newProduct._id },
    });
    return newProduct;
  }

  async findAll(): Promise<Product[]> {
    //console.log("tenantId on findAll", this.tenantContext.tenantId);
    return this.productModel.find().exec();
  }

  async findProductsByUser(userId: string): Promise<Product[]> {
    const user = await this.userModel
      .findById(userId)
      .populate('products', '', this.productModel);
    return user.products as any;
  }

  async findProductsByOrder(orderId: string): Promise<Product[]> {
    const order = await this.orderModel
      .findById(orderId)
      .populate('products', '', this.productModel);
    return order.products as any;
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productModel
      .findByIdAndUpdate(id, updateProductDto, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id);
  }
}
