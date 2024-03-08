import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, UserSchemafactory } from './schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: UserSchemafactory }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
