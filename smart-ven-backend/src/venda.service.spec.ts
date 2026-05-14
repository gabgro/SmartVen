import { Test, TestingModule } from '@nestjs/testing';
import { VendaService } from './venda.service';
import { PrismaService } from './prisma.service';

interface UserOutput {
  id: number;
  nome: string;
  email: string;
}

interface AccountOutput {
  id: number;
  userId: number;
  valor: number;
}

describe('VendaService (CRUD e Regras)', () => {
  let service: VendaService;

  const mockPrisma = {
    user: {
      create: jest.fn().mockImplementation((dto: { data: { nome: string; email: string } }): Promise<UserOutput> => {
        return Promise.resolve({ id: 1, ...dto.data });
      }),
      findUnique: jest.fn().mockImplementation((args: { where: { id: number } }): Promise<UserOutput> => {
        return Promise.resolve({ id: args.where.id, nome: 'Danilo', email: 'danilo@ufrn.br' });
      }),
    },
    account: {
      create: jest.fn().mockImplementation((dto: { data: { userId: number; valor: number } }): Promise<AccountOutput> => {
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
    const user = await service.criarUsuario('Danilo', 'danilo@ufrn.br') as UserOutput;
    expect(user).toHaveProperty('id');
    expect(user.nome).toBe('Danilo');
  });

  it('deve permitir criar uma conta vinculada a um usuário existente', async () => {
    const userId = 1;
    const conta = await service.criarConta(userId, 100.0) as AccountOutput;
    expect(conta.userId).toBe(userId);
    expect(conta.valor).toBe(100.0);
  });

  it('deve falhar ao tentar criar uma conta sem um ID de usuário', async () => {
    await expect(service.criarConta(null as unknown as number, 50.0)).rejects.toThrow();
  });
});