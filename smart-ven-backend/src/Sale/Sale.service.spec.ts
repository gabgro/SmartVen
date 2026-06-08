import { Test, TestingModule } from '@nestjs/testing';
import { SaleService } from './Sale.service';
import { PrismaService } from '../prisma.service';
import { ProductService } from '../Product/Product.service';
import { AccountService } from '../Account/Account.service';
import { BadRequestException } from '@nestjs/common';

describe('SaleService', () => {
  let service: SaleService;

  const mockPrisma = {
    sale: { create: jest.fn() },
    saleItem: { createMany: jest.fn() },
    product: { update: jest.fn() },
  };

  const mockProductService = {
    buscarPorId: jest.fn(),
  };

  const mockAccountService = {
    buscarPorUserId: jest.fn(),
    removerSaldo: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaleService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: ProductService, useValue: mockProductService },
        { provide: AccountService, useValue: mockAccountService },
      ],
    }).compile();

    service = module.get<SaleService>(SaleService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('realizarVenda', () => {
    it('deve efetuar a venda com sucesso se houver saldo e estoque', async () => {
      const itensDto = [{ productId: 10, quantidade: 2 }];

      mockProductService.buscarPorId.mockResolvedValue({
        id: 10,
        nome: 'Coca',
        preco: 5.0,
        estoque: 5,
        ativo: true,
      });
      mockAccountService.buscarPorUserId.mockResolvedValue({
        id: 1,
        valor: 20.0,
        userId: 1,
      });

      mockPrisma.sale.create.mockResolvedValue({
        id: 100,
        userId: 1,
        total: 10.0,
      });

      const resultado = await service.realizarVenda(1, itensDto);
      expect(resultado.total).toBe(10.0);
      expect(mockAccountService.removerSaldo).toHaveBeenCalledWith(1, 10.0);
    });

    it('deve lançar BadRequestException se o produto não tiver estoque suficiente', async () => {
      const itensDto = [{ productId: 10, quantidade: 5 }];
      mockProductService.buscarPorId.mockResolvedValue({
        id: 10,
        nome: 'Coca',
        preco: 5.0,
        estoque: 2,
        ativo: true,
      });

      await expect(service.realizarVenda(1, itensDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
