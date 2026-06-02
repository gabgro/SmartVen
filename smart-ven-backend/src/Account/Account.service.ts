import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async criarConta(userId: number) {
    const usuarioExiste = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!usuarioExiste) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const contaExiste = await this.prisma.account.findUnique({
      where: { userId },
    });
    if (contaExiste) {
      throw new BadRequestException('Este usuário já possui uma conta vinculada.');
    }

    return this.prisma.account.create({
      data: { userId, valor: 0.0 },
    });
  }

  async buscarPorUserId(userId: number) {
    const conta = await this.prisma.account.findUnique({
      where: { userId },
    });
    if (!conta) {
      throw new NotFoundException('Conta não encontrada para este usuário.');
    }
    return conta;
  }

  async adicionarSaldo(userId: number, quantia: number) {
    if (quantia <= 0) {
      throw new BadRequestException('O valor a ser adicionado deve ser maior que zero.');
    }
    const conta = await this.buscarPorUserId(userId);

    return this.prisma.account.update({
      where: { userId },
      data: { valor: conta.valor + quantia },
    });
  }

  async removerSaldo(userId: number, quantia: number) {
    if (quantia <= 0) {
      throw new BadRequestException('O valor a ser removido deve ser maior que zero.');
    }

    const conta = await this.buscarPorUserId(userId);
    
    if (conta.valor < quantia) {
      throw new BadRequestException('Saldo insuficiente para realizar esta operação.');
    }

    return this.prisma.account.update({
      where: { userId },
      data: { valor: conta.valor - quantia },
    });
  }
}