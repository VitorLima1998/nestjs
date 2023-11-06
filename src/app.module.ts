import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './common/model/user/user.module';
import { CategoryModule } from './common/model/category/category.module';
import { ProductModule } from './common/model/product/product.module';
import { PurchaseModule } from './common/model/purchase/purchase.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, CategoryModule, ProductModule, PurchaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
