import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { ProductNotFoundException } from 'src/common/exceptions/product/product-not-found.exception';
import { ProductExistsException } from 'src/common/exceptions/product/product-name-in-use.exception';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    this.exists(data.name);
    return await this.prisma.product.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new ProductNotFoundException();
    }

    return product;
  }

  async update(id: string, data: UpdateProductDto) {
    return await this.prisma.product.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    return await this.prisma.product.delete({
      where: {
        id,
      },
    });
  }

  async exists(name: string) {
    const existingProduct = await this.prisma.product.findFirst({
      where: { name },
    });

    if (existingProduct) {
      throw new ProductExistsException();
    }
  }
}
