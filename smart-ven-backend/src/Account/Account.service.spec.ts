import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './Account.service';
import { PrismaService } from '../prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AccountService', () => {
  let service: AccountService;

  const mockPrisma = {
    account: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('criarConta', () => {
    it('deve criar uma conta com sucesso se o usuário existir e não tiver conta', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 1, nome: 'Danilo' });
      mockPrisma.account.findUnique.mockResolvedValue(null);
      mockPrisma.account.create.mockResolvedValue({ id: 10, valor: 0.0, userId: 1 });

      const resultado = await service.criarConta(1);
      expect(resultado).toHaveProperty('id');
      expect(resultado.userId).toBe(1);
    });

    it('deve lançar NotFoundException se o usuário dono da conta não existir', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(service.criarConta(99)).rejects.toThrow(NotFoundException);
    });

    it('deve lançar BadRequestException se o usuário já possuir uma conta activa', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 1, nome: 'Danilo' });
      mockPrisma.account.findUnique.mockResolvedValue({ id: 10, valor: 50.0, userId: 1 });

      await expect(service.criarConta(1)).rejects.toThrow(BadRequestException);
    });
  });

  describe('adicionarSaldo', () => {
    it('deve somar valor ao saldo atual com sucesso', async () => {
      mockPrisma.account.findUnique.mockResolvedValue({ id: 10, valor: 100.0, userId: 1 });
      mockPrisma.account.update.mockResolvedValue({ id: 10, valor: 150.0, userId: 1 });

      const resultado = await service.adicionarSaldo(1, 50.0);
      expect(resultado.valor).toBe(150.0);
    });
  });

  describe('removerSaldo', () => {
    it('deve subtrair o valor do saldo com sucesso se houver saldo suficiente', async () => {
      mockPrisma.account.findUnique.mockResolvedValue({ id: 10, valor: 100.0, userId: 1 });
      mockPrisma.account.update.mockResolvedValue({ id: 10, valor: 60.0, userId: 1 });

      const resultado = await service.removerSaldo(1, 40.0);
      expect(resultado.valor).toBe(60.0);
    });

    it('deve lançar BadRequestException se o saldo for insuficiente', async () => {
      mockPrisma.account.findUnique.mockResolvedValue({ id: 10, valor: 30.0, userId: 1 });

      await expect(service.removerSaldo(1, 50.0)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('deve lançar BadRequestException se o valor a ser removido for menor ou igual a zero', async () => {
      await expect(service.removerSaldo(1, -10.0)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});