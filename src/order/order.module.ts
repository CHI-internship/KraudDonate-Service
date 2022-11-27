import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService, AwsService, AuthHandleService } from 'src/services';
import OrderRepository from 'src/order/repository/order.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [
    OrderService,
    PrismaService,
    JwtService,
    OrderRepository,
    AwsService,
    AuthHandleService
  ],
  imports: [UserModule],
  controllers: [OrderController],
})
export class OrderModule {}
