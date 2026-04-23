# 🚀 SmartVen - Backend

Este é o motor de controle do SmartVen, desenvolvido com **NestJS**, **Prisma** e **MySQL**.

## 🛠️ Tecnologias
- NestJS (Framework)
- Prisma (ORM)
- MySQL (Banco de dados via Docker)
- Jest (Testes Unitários)

## 🏗️ Como Executar o Projeto

### 1. Pré-requisitos
- Node.js (v18+)
- Docker Desktop (Rodando)

### 2. Configuração do Banco de Dados
Suba o container do MySQL:
```bash
docker run --name smartven-db -e MYSQL_ROOT_PASSWORD=sua_senha -e MYSQL_DATABASE=smartven -p 3306:3306 -d mysql:latest
```
### 3. Configuração de Ambiente
Crie um arquivo .env na raiz e adicione a URL:
```bash
DATABASE_URL="mysql://root:sua_senha@localhost:3306/smartven"
DATABASE_HOST="localhost"
DATABASE_PORT=3306
DATABASE_USER="root"
DATABASE_PASSWORD="sua_senha"
DATABASE_NAME="smartven"
```
### 4. Instalação e Migrations
```bash
npm install
npx prisma generate
npx prisma migrate dev
```
### 🧪 Testes
Para validar as regras de negócio (Saldo e CRUD):

```bash
npm run test
```