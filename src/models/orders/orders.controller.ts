import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() data: CreateOrderDto) {
    try {
      return this.ordersService.create(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get()
  findAll() {
    try {
      return this.ordersService.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.ordersService.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateOrderDto) {
    try {
      return this.ordersService.update(id, data);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.ordersService.remove(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
