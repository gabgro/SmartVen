import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './Category.service';
import { PrismaService } from '../prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('CategoryService', () => {
  let service: CategoryService;

  const mockPrisma = {
    category: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('criarCategoria', () => {
    it('deve criar uma categoria com sucesso', async () => {
      mockPrisma.category.findUnique.mockResolvedValue(null);
      mockPrisma.category.create.mockResolvedValue({ id: 1, nome: 'Bebidas' });

      const resultado = await service.criarCategoria('Bebidas');
      expect(resultado).toHaveProperty('id');
      expect(resultado.nome).toBe('Bebidas');
    });

    it('deve lançar BadRequestException se a categoria já existir', async () => {
      mockPrisma.category.findUnique.mockResolvedValue({
        id: 1,
        nome: 'Bebidas',
      });

      await expect(service.criarCategoria('Bebidas')).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
