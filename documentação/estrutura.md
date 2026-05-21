## Estrutura do Projeto Aerocode

Abaixo está a organização principal do projeto e a responsabilidade de cada diretório/arquivo mais importante.

```
backend/
├── prisma/
├── src/
│   ├── lib/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── repositories/
│
├── .env.sample
└── prisma.config.ts
```

#### `prisma/`
Diretório responsável pelos arquivos relacionados ao Prisma ORM, incluindo o `schema.prisma` e as migrations do banco.

#### `src/`
Diretório principal da aplicação.

#### `src/lib/`
Conexões e configurações compartilhadas, como a instância do Prisma Client.

#### `src/routes/`
Definição das rotas/endpoints da API.

#### `src/controllers/`
Recebem as requisições HTTP, chamam os services e retornam as respostas.

#### `src/services/`
Responsáveis pelas regras de negócio e validações da aplicação.

#### `src/repositories/`
Camada responsável pela comunicação com o banco de dados através do Prisma.

#### `.env.sample`
Arquivo modelo das variáveis de ambiente necessárias para o projeto.

#### `prisma.config.ts`
Configuração da conexão do Prisma com o banco de dados.