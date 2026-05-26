# Regras de Negócio Aerocode

## **Regras gerais que o sistema atende**

**1. Senha no cadastro de usuário criptografada com "bcrypt"**

```ts
const senhaHash = await bcrypt.hash(data.senha, 10);

return this.usuarioRepository.create({
  ...data,
  senha: senhaHash,
});
```

- Evita que senhas sejam armazenadas em texto puro no banco de dados
- Aumenta a segurança caso ocorra vazamento de dados
- Dificulta ataques de engenharia reversa utilizando hash com salt

**2. Usuário (username) existente não pode ser cadastrado novamente**

```ts
const usuarioExiste = await this.usuarioRepository.findByUsername(
  data.username,
);

if (usuarioExiste) {
  throw new Error("Usuário já existe");
}
```

- Garante unicidade dos usuários no sistema
- Evita conflitos durante o processo de login
- Impede duplicidade de informações no banco de dados

**3. Identificação de usuários (id) feita com "Identificador Único Universal" (UUID)**

```prisma
model Usuario {
  id        String    @id @default(uuid())
  username  String    @unique
  senha     String
  permissao Permissao

  funcionario Funcionario?
  relatorios  Relatorio[]

  createdAt DateTime @default(now())

  @@map("usuarios")
}
```

- Garante identificadores únicos para cada usuário
- Evita conflitos de IDs em diferentes ambientes ou servidores
- Dificulta previsões sequenciais de identificadores por questões de segurança

**4. Utilização de JWT (Jason Web Token) para autenticação stateless**

```ts
// configuração do payload + user (fastify-jwt.d.ts)
interface FastifyJWT {
  payload: {
    id: string;
    username: string;
    permissao: string;
  };

  user: {
    id: string;
    username: string;
    permissao: string;
  };
}

// autenticação (authController.ts)
const usuario = await this.authService.login(req.body);

const token = await res.jwtSign({
  id: usuario.id,
  username: usuario.username,
  permissao: usuario.permissao,
});

return res.status(200).send({
  token,
});
```

- Permite autenticação sem necessidade de armazenar sessão no servidor
- Facilita escalabilidade da aplicação
- Possibilita validação rápida e segura do usuário autenticado
- Mantém informações do usuário protegidas através de assinatura digital do token

**5. O sistema atende a estrutura "Role-Based Access Controll (RBAC)" para controle de permissões**

```ts
// exemplo de uma rota onde só usuários com permissão "ADMIN" podem acessar
fastify.post<{
    Body: CreateUsuarioBody;
}>(
    "/usuarios",
    {
    // preHandler responsável pela autenticação e RBCA
    preHandler: [auth, verifyRole(["ADMIN"])],
    schema: {
    body: {
        type: "object",
        required: ["username", "senha", "permissao"],
        properties: {
        username: { type: "string" },
        senha: { type: "string" },
        permissao: {
            type: "string",
            enum: permissoes,
        },
        },
    },
    },
},
```

- Garante que cada usuário acesse apenas funcionalidades permitidas
- Facilita gerenciamento de permissões por cargos ou níveis de acesso
- Melhora a segurança da aplicação
- Centraliza regras de autorização de forma organizada e escalável

**6.  não podem ser criados com um usuário já em uso**

```ts
const usuarioExiste = await prisma.usuario.findUnique({
  where: { username: data.username },
});

if (usuarioExiste) {
  throw new Error("Usuário já existe");
}
```

- Garante que cada usuário esteja associado a apenas um funcionário, evitando inconsistências no banco de dados
- Impede conflitos de autenticação, permissões e identificação de funcionários dentro do sistema
- Cada usuário possui um relacionamento único, tornando mais simples identificar responsabilidades e ações realizadas

**7. Aeronaves não podem ser criadas com código já existente**

```ts
const existe = await this.aeronaveRepository.findByCodigo(data.codigo);

if (existe) {
  throw new Error("Código da aeronave já existe");
}
```

- Evita ambiguidades durante consultas, manutenção e gerenciamento operacional
- Impede que duas aeronaves sejam confundidas em processos internos ou relatórios

**8. Regras de transição de status das etapas**

```ts
private validarTransicaoStatus(
    atual: "PENDENTE" | "ANDAMENTO" | "CONCLUIDA",
    novo: "PENDENTE" | "ANDAMENTO" | "CONCLUIDA",
  ) {
    if (atual === "PENDENTE" && novo === "CONCLUIDA") {
      throw new Error("Não é possível concluir uma etapa pendente");
    }

    if (atual === "ANDAMENTO" && novo === "PENDENTE") {
      throw new Error("Não é possível voltar uma etapa para pendente");
    }

    if (atual === "CONCLUIDA") {
      throw new Error("Etapa concluída não pode ser alterada");
    }
  }
```

- Obriga que as etapas sigam uma ordem lógica: pendente → em andamento → concluída
- Impede retrocessos ou modificações em etapas já concluídas, preservando o histórico do processo
- Garante que relatórios e métricas reflitam corretamente o estado real das operações

**9. Funcionários só podem ser adicionados enquanto a etapa não estiver concluída**

```ts
const alterandoFuncionarios =
  data.adicionarFuncionariosIds?.length || data.removerFuncionariosIds?.length;

if (etapa.status === "CONCLUIDA" && alterandoFuncionarios) {
  throw new Error("Não é possível alterar funcionários de uma etapa concluída");
}
```

- Impede alterações posteriores em registros já finalizados
- Garante que apenas os funcionários realmente envolvidos durante a execução da etapa sejam registrados
- Facilita validações futuras e análise de responsabilidade das atividades executadas

## **Permissões de Usuários**

### Operador

Permissões disponíveis para usuários operadores:

- visualizar aeronaves
- visualizar detalhes de uma aeronave
- visualizar etapas, peças e testes de uma aeronave
- visualizar relatórios
- visualizar detalhes de um relatório

### Engenheiro

O engenheiro possui todas as permissões do operador e também pode:

- gerar relatórios de produção
- adicionar peças em aeronaves
- adicionar testes em aeronaves
- adicionar funcionários em etapas
- iniciar etapas
- finalizar etapas
- alterar status de peças
- alterar status de testes

### Administrador

O administrador possui todas as permissões do engenheiro e também pode:

- cadastrar aeronaves
- editar aeronaves
- cadastrar peças
- visualizar usuários
- visualizar detalhes de usuários
- cadastrar usuários
- editar usuários
- adicionar etapas

```

```
