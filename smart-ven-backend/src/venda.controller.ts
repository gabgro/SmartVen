import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { VendaService } from './venda.service';

@Controller('venda')
export class VendaController {
  constructor(private readonly vendaService: VendaService) {}

  @Post('usuario')
  criarUsuario(@Body() data: { nome: string; email: string }) {
    return this.vendaService.criarUsuario(data.nome, data.email);
  }

  @Post('conta')
  criarConta(@Body() data: { userId: number; valorInicial: number }) {
    return this.vendaService.criarConta(data.userId, data.valorInicial);
  }

  @Get('usuario/:id')
  buscarUsuario(@Param('id') id: string) {
    return this.vendaService.buscarUsuarioCompleto(Number(id));
  }
}
