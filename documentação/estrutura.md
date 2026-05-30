# Estrutura do Projeto Aerocode

## **Back-end**

Abaixo está a organização principal do back-end e a responsabilidade de cada diretório/arquivo mais importante.

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

## **Front-end**

Abaixo está a organização principal do front-end e a responsabilidade de cada diretório mais importante.

```
frontend/
└── src/
    ├── components/
    ├── contexts/
    ├── hooks/
    ├── layouts/
    ├── pages/
    ├── providers/
    ├── routes/
    ├── services/
    └── types/
```

---

#### `src/components/`

Responsável por componentes reutilizáveis da aplicação.

#### `src/contexts/`

Contém os contextos globais da aplicação (React Context API).

#### `src/hooks/`

Hooks customizados para encapsular lógica reutilizável.

#### `src/layouts/`

Layouts principais da aplicação, responsáveis por estruturar páginas inteiras.

#### `src/pages/`

Contém as páginas da aplicação (rotas principais).

#### `src/providers/`

Responsável por agrupar e fornecer os providers globais da aplicação.

### `src/routes/`

Gerenciamento de rotas da aplicação.

#### `src/services/`

Camada responsável pela comunicação com a API backend.

#### `src/types/`

Definições globais de TypeScript.

### Fluxo de uma requisição autenticada

```
Página (Page)
   ↓
Hook (useAuth)
   ↓
Service (API call)
   ↓
Context (Auth state / token)
   ↓
Backend API
   ↓
Response
   ↓
Atualização de estado/UI
```

### Fluxo de renderização com layout protegido

```
Route
   ↓
PrivateRoute (validação de auth)
   ↓
Layout (MainLayout)
   ↓
Page
   ↓
Components (UI / Forms)
```
