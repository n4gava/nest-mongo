import { Types } from 'mongoose';
import { Order } from 'src/modules/orders/entities/order.entity';
import { Product } from 'src/modules/products/entities/product.entity';

export class User {
  name: string;
  email: string;
  password: string;
  orders?: Array<Order>;
  userAddress?: UserAddress | Types.ObjectId;
  products?: Array<Product> | Types.ObjectId;
}

export class UserAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  user: User;
}
