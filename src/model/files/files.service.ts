import { Injectable } from '@nestjs/common';
import { File } from './entities/file.entity';
import { Request } from 'express';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class FilesService {
  constructor(private readonly prisma: PrismaService) {}

  async saveData(file: Express.Multer.File, req: Request) {
    const fileUploaded = new File();
    fileUploaded.fileName = file.filename;
    fileUploaded.contentLength = file.size;
    fileUploaded.contentType = file.mimetype;
    fileUploaded.url = `${req.protocol}://${req.get('host')}/upload/files/${
      fileUploaded.fileName
    }`;

    return await this.prisma.image.create({
      data: fileUploaded,
    });
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
