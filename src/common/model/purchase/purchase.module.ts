import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService],
  imports: [PrismaModule],
})
export class PurchaseModule {}
