import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SaleService } from './Sale.service';

@Controller('vendas')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post(':userId')
  async comprar(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: { items: { productId: number; quantidade: number }[] },
  ) {
    return this.saleService.realizarVenda(userId, body.items);
  }

  @Get('usuario/:userId')
  async historico(@Param('userId', ParseIntPipe) userId: number) {
    return this.saleService.listarHistorico(userId);
  }
}
