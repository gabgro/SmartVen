import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './User.service';
import { PrismaService } from '../prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;

  const mockPrisma = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('criarUsuario', () => {
    it('deve criar um usuário com sucesso se o email for único', async () => {
      const dto = { nome: 'Danilo', email: 'danilo@ufrn.br' };
      
      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.user.create.mockResolvedValue({ id: 1, ...dto });

      const resultado = await service.criarUsuario(dto.nome, dto.email);
      expect(resultado).toHaveProperty('id');
      expect(resultado.email).toBe(dto.email);
    });

    it('deve lançar BadRequestException se o email já estiver cadastrado', async () => {
      const dto = { nome: 'Danilo', email: 'danilo@ufrn.br' };
      
      mockPrisma.user.findUnique.mockResolvedValue({ id: 1, ...dto });

      await expect(service.criarUsuario(dto.nome, dto.email)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('buscarPorId', () => {
    it('deve retornar um usuário se ele existir', async () => {
      const usuarioEsperado = { id: 1, nome: 'Danilo', email: 'danilo@ufrn.br' };
      mockPrisma.user.findUnique.mockResolvedValue(usuarioEsperado);

      const resultado = await service.buscarPorId(1);
      expect(resultado).toEqual(usuarioEsperado);
    });

    it('deve lançar NotFoundException se o usuário não existir', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(service.buscarPorId(99)).rejects.toThrow(NotFoundException);
    });
  });
});