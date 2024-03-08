import { User } from 'src/modules/users/entities/user.entity';

export class Order {
  quantity: number;
  user?: User;
}
