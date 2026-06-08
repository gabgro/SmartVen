import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async criarProduto(
    nome: string,
    preco: number,
    estoque: number,
    categoryId: number,
  ) {
    if (preco <= 0) {
      throw new BadRequestException(
        'O preço do produto deve ser maior que zero.',
      );
    }
    if (estoque < 0) {
      throw new BadRequestException('O estoque inicial não pode ser negativo.');
    }

    const categoriaExiste = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!categoriaExiste) {
      throw new NotFoundException('A categoria especificada não existe.');
    }

    return this.prisma.product.create({
      data: { nome, preco, estoque, categoryId, ativo: true },
    });
  }

  async listarTodos() {
    return this.prisma.product.findMany({
      where: { ativo: true },
      include: { category: true },
    });
  }

  async buscarPorId(id: number) {
    const produto = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!produto || !produto.ativo) {
      throw new NotFoundException('Produto não encontrado ou inativo.');
    }
    return produto;
  }

  async desativarProduto(id: number) {
    const produto = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!produto || !produto.ativo) {
      throw new NotFoundException('Produto não encontrado para desativação.');
    }

    return this.prisma.product.update({
      where: { id },
      data: { ativo: false },
    });
  }
}
