# Estrutura do Projeto Aerocode

## Back-end

Abaixo está a organização principal do projeto e a responsabilidade de cada diretório/arquivo mais importante.

```
backend/
├── prisma/
├── src/
│   ├── @types/
│   ├── controllers/
│   ├── lib/
│   ├── middlewares/
│   ├── plugins/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   └── types/
│
├── server.ts/
├── .env.sample
└── prisma.config.ts
```

#### `prisma/`
Diretório responsável pelos arquivos relacionados ao Prisma ORM, incluindo o `schema.prisma` e as migrations do banco.

#### `src/`
Diretório principal da aplicação.

#### `src/@types/`
Customizações de bibliotecas externas.

#### `src/controllers/`
Recebem as requisições HTTP, chamam os services e retornam as respostas.

#### `src/lib/`
Conexões e configurações compartilhadas, como a instância do Prisma Client.

#### `src/middlewares/`
Middlewares responsáveis por interceptar requisições antes das rotas.

#### `src/plugins/`
Registro e configuração de plugins do Fastify, como JWT.

#### `src/repositories/`
Camada responsável pela comunicação com o banco de dados através do Prisma.

#### `src/routes/`
Definição das rotas/endpoints da API.

#### `src/services/`
Responsáveis pelas regras de negócio e validações da aplicação.

#### `src/types/`
Definições de tipos e interfaces específicas da aplicação.

#### `server.ts`
Arquivo principal responsável por inicializar o servidor Fastify.

#### `.env.sample`
Arquivo modelo das variáveis de ambiente necessárias para o projeto.

#### `prisma.config.ts`
Configuração da conexão do Prisma com o banco de dados.

### A separação de responsabilidades se dá, no código, através do seguinte fluxo:

```
Request
   ↓
Middlewares
   ↓
Schema Validation
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Banco de Dados
```

### Fluxo completo de uma rota protegida

```
Cliente
   ↓
JWT no Authorization Header
   ↓
Middleware auth
   ↓
Middleware verifyRole
   ↓
Schema Validation
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Banco de Dados
   ↓
Response
```