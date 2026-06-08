import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './User.service';

@Controller('usuarios')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async criar(@Body() body: { nome: string; email: string }) {
    return this.userService.criarUsuario(body.nome, body.email);
  }

  @Get()
  async listar() {
    return this.userService.listarTodos();
  }

  @Get(':id')
  async buscar(@Param('id', ParseIntPipe) id: number) {
    return this.userService.buscarPorId(id);
  }

  @Delete(':id')
  async remover(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deletar(id);
  }
}
