import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../../common/database/prisma.service';
import { OrderNotFoundException } from '../../common/exceptions/order/order-not-found.exception';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateOrderDto) {
    return await this.prisma.order.create({
      data: {
        ...data,
      },
    });
  }

  async findAll() {
    return await this.prisma.order.findMany();
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      throw new OrderNotFoundException();
    }

    return order;
  }

  async update(id: string, data: UpdateOrderDto) {
    const order = await this.prisma.order.update({
      data,
      where: {
        id,
      },
    });
    if (!order) {
      throw new OrderNotFoundException();
    }

    return order;
  }

  async remove(id: string) {
    return await this.prisma.order.delete({
      where: {
        id,
      },
    });
  }
}
