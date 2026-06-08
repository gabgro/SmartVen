import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProductService } from '../Product/Product.service';
import { AccountService } from '../Account/Account.service';

@Injectable()
export class SaleService {
  constructor(
    private prisma: PrismaService,
    private productService: ProductService,
    private accountService: AccountService,
  ) {}

  async realizarVenda(
    userId: number,
    itens: { productId: number; quantidade: number }[],
  ) {
    let totalVenda = 0;
    const itensValidados: {
      productId: number;
      quantidade: number;
      precoUnitario: number;
    }[] = [];

    for (const item of itens) {
      const produto = await this.productService.buscarPorId(item.productId);

      if (produto.estoque < item.quantidade) {
        throw new BadRequestException(
          `Estoque insuficiente para o produto: ${produto.nome}`,
        );
      }

      totalVenda += produto.preco * item.quantidade;

      itensValidados.push({
        productId: produto.id,
        quantidade: item.quantidade,
        precoUnitario: produto.preco,
      });
    }

    await this.accountService.removerSaldo(userId, totalVenda);

    const novaVenda = await this.prisma.sale.create({
      data: {
        userId,
        total: totalVenda,
        items: {
          create: itensValidados.map((item) => ({
            productId: item.productId,
            quantidade: item.quantidade,
            precoUnitario: item.precoUnitario,
          })),
        },
      },
      include: { items: true },
    });

    for (const item of itensValidados) {
      await this.prisma.product.update({
        where: { id: item.productId },
        data: { estoque: { decrement: item.quantidade } },
      });
    }

    return novaVenda;
  }

  async listarHistorico(userId: number) {
    return this.prisma.sale.findMany({
      where: { userId },
      include: { items: { include: { product: true } } },
    });
  }
}
