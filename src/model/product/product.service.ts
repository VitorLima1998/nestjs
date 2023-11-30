import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { ProductExistsException } from 'src/common/exceptions/product/product-name-in-use.exception';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    const { categoryId, ...data } = createProductDto;

    await this.exists(data.name);

    const existingCategory = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!existingCategory) {
      throw new NotFoundException(`Category ${categoryId} not found.`);
    }

    try {
      const product = await this.prisma.product.create({
        data: {
          ...data,
          categoryId,
        },
      });

      return product;
    } catch (error) {
      console.error(error);
      throw new Error('Error create product.');
    }
  }

  async findOne(id: string) {
    return await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll() {
    const products = await this.prisma.product.findMany({
      include: {
        category: true,
      },
    });
    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        const images = await this.prisma.image.findMany({
          where: { productId: product.id },
        });
        return { ...product, images };
      }),
    );

    return productsWithImages;
  }

  async update(id: string, data: UpdateProductDto) {
    return await this.prisma.product.update({
      data,
      where: { id },
    });
  }

  async delete(id: string) {
    await this.prisma.image.deleteMany({
      where: {
        productId: id,
      },
    });
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
