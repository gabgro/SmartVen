import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

async function main() {
  const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST || 'db',
    port: Number(process.env.DATABASE_PORT) || 3306,
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: process.env.DATABASE_NAME || 'smartven',
    connectionLimit: 1,
    allowPublicKeyRetrieval: true,
  });

  const prisma = new PrismaClient({ adapter });

  console.log('🌱 Iniciando o povoamento do banco de dados...');

  const user1 = await prisma.user.create({
    data: {
      nome: 'Danilo Aciole',
      email: 'danilo@email.com',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      nome: 'Gabriel Guedes',
      email: 'gabriel@email.com',
    },
  });

  await prisma.account.create({
    data: {
      userId: user1.id,
      valor: 150.00,
    },
  });

  await prisma.account.create({
    data: {
      userId: user2.id,
      valor: 50.00,
    },
  });

  const catBebidas = await prisma.category.create({
    data: { nome: 'Bebidas' },
  });

  const catSalgados = await prisma.category.create({
    data: { nome: 'Salgados' },
  });

  await prisma.product.createMany({
    data: [
      { nome: 'Coca-Cola Lata', preco: 5.50, estoque: 20, categoryId: catBebidas.id },
      { nome: 'Guaraná Antarctica', preco: 5.00, estoque: 15, categoryId: catBebidas.id },
      { nome: 'Coxinha de Frango', preco: 6.00, estoque: 10, categoryId: catSalgados.id },
      { nome: 'Pastel de Carne', preco: 6.50, estoque: 8, categoryId: catSalgados.id },
    ],
  });

  const produtos = await prisma.product.createMany({
    data: [
      { nome: 'Coca-Cola Lata', preco: 5.50, estoque: 20, categoryId: catBebidas.id },
      { nome: 'Guaraná Antarctica', preco: 5.00, estoque: 15, categoryId: catBebidas.id },
      { nome: 'Coxinha de Frango', preco: 6.00, estoque: 10, categoryId: catSalgados.id },
      { nome: 'Pastel de Carne', preco: 6.50, estoque: 8, categoryId: catSalgados.id },
    ],
  });

  const dbProdutos = await prisma.product.findMany();
  const coca = dbProdutos.find(p => p.nome === 'Coca-Cola Lata')!;
  const guarana = dbProdutos.find(p => p.nome === 'Guaraná Antarctica')!;
  const coxinha = dbProdutos.find(p => p.nome === 'Coxinha de Frango')!;

  console.log('🛒 Registrando vendas de teste...');

  await prisma.sale.create({
    data: {
      userId: user1.id,
      total: 11.50,
      items: {
        create: [
          { productId: coca.id, quantidade: 1, precoUnitario: coca.preco },
          { productId: coxinha.id, quantidade: 1, precoUnitario: coxinha.preco }
        ]
      }
    }
  });

  await prisma.account.update({
    where: { userId: user1.id },
    data: { valor: { decrement: 11.50 } }
  });
  await prisma.product.update({ where: { id: coca.id }, data: { estoque: { decrement: 1 } } });
  await prisma.product.update({ where: { id: coxinha.id }, data: { estoque: { decrement: 1 } } });

  await prisma.sale.create({
    data: {
      userId: user2.id,
      total: 10.00,
      items: {
        create: [
          { productId: guarana.id, quantidade: 2, precoUnitario: guarana.preco }
        ]
      }
    }
  });

  await prisma.account.update({
    where: { userId: user2.id },
    data: { valor: { decrement: 10.00 } }
  });
  await prisma.product.update({ where: { id: guarana.id }, data: { estoque: { decrement: 2 } } });

  console.log('✅ Banco de dados povoado com sucesso!');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error('❌ Erro ao executar o seed:', e);
  process.exit(1);
});