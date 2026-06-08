import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoryService } from './Category.service';

@Controller('categorias')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async criar(@Body() body: { nome: string }) {
    return this.categoryService.criarCategoria(body.nome);
  }

  @Get()
  async listar() {
    return this.categoryService.listarTodas();
  }

  @Get(':id')
  async buscar(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.buscarPorId(id);
  }
}
