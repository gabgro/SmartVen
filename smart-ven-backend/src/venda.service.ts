import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class VendaService {
  constructor(private prisma: PrismaService) {}

  async criarUsuario(nome: string, email: string) {
    return await this.prisma.user.create({
      data: { nome, email },
    });
  }

  async criarConta(userId: number, valorInicial: number) {
    if (!userId) {
      throw new BadRequestException(
        'Uma conta precisa de um usuário vinculado.',
      );
    }

    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    return await this.prisma.account.create({
      data: {
        userId: userId,
        valor: valorInicial,
      },
    });
  }

  async buscarUsuarioCompleto(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: { conta: true },
    });
  }
}
