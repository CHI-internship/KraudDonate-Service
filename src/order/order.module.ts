import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService, AwsService, AuthHandleService } from '../services';
import OrderRepository from '../order/repository/order.repository';
import { UserModule } from '../user/user.module';

@Module({
  providers: [
    OrderService,
    PrismaService,
    JwtService,
    OrderRepository,
    AwsService,
    AuthHandleService,
  ],
  imports: [UserModule],
  controllers: [OrderController],
  exports: [OrderService, OrderRepository],
})
export class OrderModule {}
