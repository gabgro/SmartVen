import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { ProductService } from './Product.service';

@Controller('produtos')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async criar(
    @Body()
    body: {
      nome: string;
      preco: number;
      estoque: number;
      categoryId: number;
    },
  ) {
    return this.productService.criarProduto(
      body.nome,
      body.preco,
      body.estoque,
      body.categoryId,
    );
  }

  @Get()
  async listar() {
    return this.productService.listarTodos();
  }

  @Get(':id')
  async buscar(@Param('id', ParseIntPipe) id: number) {
    return this.productService.buscarPorId(id);
  }

  @Delete(':id')
  async remover(@Param('id', ParseIntPipe) id: number) {
    return this.productService.desativarProduto(id);
  }
}
