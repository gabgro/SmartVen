import { Test, TestingModule } from '@nestjs/testing';
import { VendaService } from './venda.service';
import { PrismaService } from './prisma.service';

describe('VendaService (CRUD e Regras)', () => {
  let service: VendaService;
  const mockPrisma = {
    user: {
      create: jest.fn().mockImplementation((dto) => 
        Promise.resolve({ id: 1, ...dto.data })
      ),
      findUnique: jest.fn().mockImplementation((args) => 
        Promise.resolve({ id: args.where.id, nome: 'Danilo' })
      ),
    },
    account: {
      create: jest.fn().mockImplementation((dto) => {
        if (!dto.data.userId) {
          return Promise.reject(new Error('Conta precisa de um usuário'));
        }
        return Promise.resolve({ id: 10, ...dto.data });
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VendaService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<VendaService>(VendaService);
  });

  it('deve permitir criar um usuário sem conta', async () => {
    const user = await service.criarUsuario('Danilo', 'danilo@ufrn.br');
    expect(user).toHaveProperty('id');
    expect(user.nome).toBe('Danilo');
  });

  it('deve permitir criar uma conta vinculada a um usuário existente', async () => {
    const userId = 1;
    const conta = await service.criarConta(userId, 100.0);
    expect(conta.userId).toBe(userId);
    expect(conta.valor).toBe(100.0);
  });

  it('deve falhar ao tentar criar uma conta sem um ID de usuário', async () => {
    await expect(service.criarConta(null as any, 50.0)).rejects.toThrow();
  });
});