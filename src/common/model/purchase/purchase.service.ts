import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PurchaseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePurchaseDto) {
    return await this.prisma.purchase.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.purchase.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.purchase.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdatePurchaseDto) {
    return await this.prisma.purchase.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    return await this.prisma.purchase.delete({
      where: {
        id,
      },
    });
  }
}
