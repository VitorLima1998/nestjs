import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash, compare } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UserExistsException } from 'src/common/exceptions/user/email-in-use.exception';
import { UserNotFoundException } from 'src/common/exceptions/user/user-not-found.exception';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    try {
      const saltrounds = 10;
      const hashPassword = await hash(data.password, saltrounds);

      const lowerEmail = data.email.toLowerCase();

      this.exists(lowerEmail);

      return await this.prisma.user.create({
        data: {
          ...data,
          email: lowerEmail,
          password: hashPassword,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    users.forEach((user) => delete user.password);
    return users;
  }

  async findByEmail(email: string) {
    const lowerEmail = email.toLowerCase();
    const user = await this.prisma.user.findUnique({
      where: {
        email: lowerEmail,
      },
    });

    if (!user) {
      throw new UserNotFoundException();
    }
    delete user.password;
    return user;
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

  async delete(id: string, pwd: DeleteUserDto) {
    await this.validatePwd(id, pwd.currentPwd);
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  private async validatePwd(id: string, currentPwd: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    const isCorrectPwd = await compare(currentPwd, user.password);

    if (!isCorrectPwd) {
      throw new BadRequestException();
    }
  }

  async exists(email: string) {
    if (
      await this.prisma.user.findUnique({
        where: { email },
      })
    ) {
      throw new UserExistsException();
    }
  }
}
