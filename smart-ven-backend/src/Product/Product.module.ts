import { Module } from '@nestjs/common';
import { ProductService } from './Product.service';
import { ProductController } from './Product.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
  exports: [ProductService],
})
export class ProductModule {}
