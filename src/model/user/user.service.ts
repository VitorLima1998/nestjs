import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    const salt = await bcrypt.genSalt();

    data.password = await bcrypt.hash(data.password, salt);

    return this.prisma.user.create({
      data,
    });
  }

  async readAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async readOne(id: string) {
    await this.existingUser(id);

    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async update(id: string, data: UpdateUserDTO) {
    await this.existingUser(id);

    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    const updateUser = await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
    return updateUser;
  }

  async updatePartial(
    id: string,
    { name, email, password, role }: UpdatePatchUserDTO,
  ) {
    await this.existingUser(id);

    const data: any = {};

    if (name) {
      data.name = name;
    }

    if (email) {
      data.email = email;
    }

    if (password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(password, salt);
    }
    if (role) {
      data.role = role;
    }

    const updatePartialUser = await this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
    return updatePartialUser;
  }

  async delete(id: string) {
    await this.existingUser(id);

    const deleteUser = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return deleteUser;
  }

  async existingUser(id: string) {
    if (
      !(await this.prisma.user.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`User ${id} not found`);
    }
  }
}
