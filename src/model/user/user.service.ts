import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const saltrounds = 10;
    const hashPassword = await hash(data.password, saltrounds);

    const lowerEmail = data.email.toLowerCase();

    return await this.prisma.user.create({
      data: {
        ...data,
        email: lowerEmail,
        password: hashPassword,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdateUserDto) {
    return await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }
}
