import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { AccountService } from './Account.service';

@Controller('contas')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post(':userId')
  async criar(@Param('userId', ParseIntPipe) userId: number) {
    return this.accountService.criarConta(userId);
  }

  @Get('usuario/:userId')
  async buscarPorUsuario(@Param('userId', ParseIntPipe) userId: number) {
    return this.accountService.buscarPorUserId(userId);
  }

  @Patch('usuario/:userId/adicionar')
  async depositar(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: { valor: number },
  ) {
    return this.accountService.adicionarSaldo(userId, body.valor);
  }

  @Patch('usuario/:userId/remover')
  async debitar(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: { valor: number },
  ) {
    return this.accountService.removerSaldo(userId, body.valor);
  }
}
