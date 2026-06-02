import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async criarUsuario(nome: string, email: string) {
    const emailExiste = await this.prisma.user.findUnique({
      where: { email },
    });

    if (emailExiste) {
      throw new BadRequestException('Este e-mail já está cadastrado.');
    }

    return this.prisma.user.create({
      data: { nome, email },
    });
  }

  async listarTodos() {
    return this.prisma.user.findMany();
  }

  async buscarPorId(id: number) {
    const usuario = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return usuario;
  }

  async deletar(id: number) {
    await this.buscarPorId(id);
    return this.prisma.user.delete({
      where: { id },
    });
  }
}