import { Order } from 'src/modules/orders/entities/order.entity';

export class User {
  name: string;
  email: string;
  password: string;
  orders?: Array<Order>;
  userAddress?: UserAddress;
}

export class UserAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  user: User;
}
