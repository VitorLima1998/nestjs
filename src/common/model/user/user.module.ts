import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserModule],
  imports: [PrismaModule],
})
export class UserModule {}
