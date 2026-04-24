import { Module } from '@nestjs/common';
import { VendaController } from './venda.controller';
import { VendaService } from './venda.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [VendaController],
  providers: [VendaService, PrismaService],
})
export class AppModule {}
