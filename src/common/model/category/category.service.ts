import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/database/prisma.service';
import { CategoryExistsException } from 'src/common/exceptions/category/category-name-in-use.exception';
import { CategoryNotFoundException } from 'src/common/exceptions/category/category-not-found.exception';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    this.exists(data.name);
    return this.prisma.category.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new CategoryNotFoundException();
    }

    return category;
  }

  async update(id: string, data: UpdateCategoryDto) {
    return await this.prisma.category.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    return await this.prisma.category.delete({
      where: {
        id,
      },
    });
  }

  async exists(name: string) {
    const existingProduct = await this.prisma.category.findFirst({
      where: { name },
    });

    if (existingProduct) {
      throw new CategoryExistsException();
    }
  }
}
