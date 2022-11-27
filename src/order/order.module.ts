import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService, AwsService, AuthHandleService } from 'src/services';
import { JwtService } from '@nestjs/jwt';
import OrderRepository from 'src/order/repository/order.repository';
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
  controllers: [OrderController],
  exports: [OrderService, OrderRepository],
  imports: [UserModule],
})
export class OrderModule {}
