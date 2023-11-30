import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
// import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class ImageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateImageDto[]): Promise<any> {
    const images = data.map((imageUrl) => ({
      fileName: 'defaultFileName',
      contentLength: 0,
      contentType: 'image/jpeg',
      ...imageUrl,
    }));
    return this.prisma.image.createMany({
      data: images,
    });
  }

  async findAll() {
    return await this.prisma.image.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.image.findUnique({
      where: {
        id,
      },
    });
  }

  // async update(id: string, data: UpdateImageDto) {}

  remove(id: string) {
    return `This action removes a #${id} image`;
  }
}
