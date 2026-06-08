import { Module } from '@nestjs/common';
import { SaleService } from './Sale.service';
import { SaleController } from './Sale.controller';
import { PrismaService } from '../prisma.service';
import { ProductModule } from '../Product/Product.module';
import { AccountModule } from '../Account/Account.module';

@Module({
  imports: [ProductModule, AccountModule],
  controllers: [SaleController],
  providers: [SaleService, PrismaService],
})
export class SaleModule {}
