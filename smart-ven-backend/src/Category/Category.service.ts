import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async criarCategoria(nome: string) {
    const categoriaExiste = await this.prisma.category.findUnique({
      where: { nome },
    });

    if (categoriaExiste) {
      throw new BadRequestException('Esta categoria já está cadastrada.');
    }

    return this.prisma.category.create({
      data: { nome },
    });
  }

  async listarTodas() {
    return this.prisma.category.findMany();
  }

  async buscarPorId(id: number) {
    const categoria = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada.');
    }
    return categoria;
  }
}
