import { Types } from 'mongoose';
import { Order } from 'src/modules/orders/entities/order.entity';

export class Product {
  name: string;
  price: number;
  description: string;
  orders?: Order[] | Types.ObjectId;
}
