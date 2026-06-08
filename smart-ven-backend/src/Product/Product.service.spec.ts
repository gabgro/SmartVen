import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './Product.service';
import { PrismaService } from '../prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
  let service: ProductService;

  const mockPrisma = {
    product: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
    category: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('criarProduto', () => {
    it('deve criar um produto com sucesso', async () => {
      mockPrisma.category.findUnique.mockResolvedValue({
        id: 1,
        nome: 'Bebidas',
      });
      mockPrisma.product.create.mockResolvedValue({
        id: 100,
        nome: 'Coca-Cola',
        preco: 5.5,
        estoque: 10,
        ativo: true,
        categoryId: 1,
      });

      const resultado = await service.criarProduto('Coca-Cola', 5.5, 10, 1);
      expect(resultado).toHaveProperty('id');
      expect(resultado.ativo).toBe(true);
      expect(resultado.preco).toBe(5.5);
    });

    it('deve lançar BadRequestException se o preço for menor ou igual a zero', async () => {
      await expect(
        service.criarProduto('Coca-Cola', -2.0, 10, 1),
      ).rejects.toThrow(BadRequestException);
    });

    it('deve lançar NotFoundException se a categoria informada não existir', async () => {
      mockPrisma.category.findUnique.mockResolvedValue(null);

      await expect(
        service.criarProduto('Coca-Cola', 5.5, 10, 99),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('buscarPorId', () => {
    it('deve lançar NotFoundException se o produto estiver inativo (Soft Delete)', async () => {
      mockPrisma.product.findUnique.mockResolvedValue({
        id: 101,
        nome: 'Guaraná Antigo',
        preco: 4.0,
        estoque: 5,
        ativo: false,
        categoryId: 1,
      });

      await expect(service.buscarPorId(101)).rejects.toThrow(NotFoundException);
    });
  });

  describe('desativarProduto', () => {
    it('deve alterar o status de ativo para false com sucesso', async () => {
      const produtoAtivo = {
        id: 100,
        nome: 'Coca-Cola',
        ativo: true,
        categoryId: 1,
      };
      const produtoDesativado = {
        id: 100,
        nome: 'Coca-Cola',
        ativo: false,
        categoryId: 1,
      };

      mockPrisma.product.findUnique.mockResolvedValue(produtoAtivo);
      mockPrisma.product.update.mockResolvedValue(produtoDesativado);

      const resultado = await service.desativarProduto(100);
      expect(resultado.ativo).toBe(false);
      expect(mockPrisma.product.update).toHaveBeenCalledWith({
        where: { id: 100 },
        data: { ativo: false },
      });
    });

    it('deve lançar NotFoundException se tentar desativar um produto que não existe ou já está inativo', async () => {
      mockPrisma.product.findUnique.mockResolvedValue(null);

      await expect(service.desativarProduto(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
