import { Order } from 'src/modules/orders/entities/order.entity';

export class User {
  name: string;
  email: string;
  password: string;
  orders?: Array<Order>;
}
