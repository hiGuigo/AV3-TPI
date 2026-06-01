# Regras de Negócio Aerocode

## **Características do sistema**

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

<img src="./regras/2. usuario existente.gif"/>

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

<img src="./regras/4. token.gif"/>

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
```

```ts
// criação do token (authController.ts)
const usuario = await this.authService.login(req.body);

const token = await res.jwtSign({
  id: usuario.id,
  username: usuario.username,
  permissao: usuario.permissao,
});

return res.status(200).send({
  token,
  usuario: {
    id: usuario.id,
    username: usuario.username,
    permissao: usuario.permissao,
  },
});
```

- Permite autenticação sem necessidade de armazenar sessão no servidor
- Facilita escalabilidade da aplicação
- Possibilita validação rápida e segura do usuário autenticado
- Mantém informações do usuário protegidas através de assinatura digital do token

**5. O sistema utiliza RBAC (Role-Based Access Control)**

```ts
// exemplo de uma rota onde só usuários com permissão "ADMIN" podem acessar
fastify.post<{
    Body: CreateUsuarioBody;
}>(
    "/usuarios",
    {
    // preHandler responsável pela autenticação e RBAC
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

**6. Funcionários não podem ser vinculados a um usuário em uso**

Obs.: Por mais que o back-end permita o cadastro de funcionários e usuários separadamente, o sistema utiliza outra forma de cadastrar um usuário através do site, onde um funcionário já é cadastrado com um usuário novo através do método "createWithUser()", que se baseia nos mesmos princípios do "create()", mas utiliza o método transaction() para cadastrar ambos funcionário e usuário associados.

```ts
const usuarioEmUso = await this.funcionarioRepository.findIdUsuarioEmUso(
  data.usuarioId,
);

if (usuarioEmUso) {
  throw new Error("Este usuário já está vinculado a outro funcionário");
}
```

- Garante que cada usuário esteja associado a apenas um funcionário, evitando inconsistências no banco de dados
- Impede conflitos de autenticação, permissões e identificação de funcionários dentro do sistema
- Cada usuário possui um relacionamento único, tornando mais simples identificar responsabilidades e ações realizadas

**7. Funcionários só podem ser vinculados a usuários existentes**

Obs.: Por mais que o back-end permita o cadastro de funcionários e usuários separadamente, o sistema utiliza outra forma de cadastrar um usuário através do site, onde um funcionário já é cadastrado com um usuário novo através do método "createWithUser()", que se baseia nos mesmos princípios do "create()", mas utiliza o método transaction() para cadastrar ambos funcionário e usuário associados.

```ts
const usuarioExiste = await prisma.usuario.findUnique({
  where: { id: data.usuarioId },
});

if (!usuarioExiste) {
  throw new Error("Usuário não existe");
}
```

- Impede vínculos inválidos no banco de dados
- Evita referências quebradas entre entidades
- Garante integridade relacional da aplicação

**8. Aeronaves não podem ser criadas com código já existente**

<img src="./regras/8. cadastrar aeronave existente.gif"/>

```ts
const existe = await this.aeronaveRepository.findByCodigo(data.codigo);

if (existe) {
  throw new Error("Código da aeronave já existe");
}
```

- Evita ambiguidades durante consultas, manutenção e gerenciamento operacional
- Impede que duas aeronaves sejam confundidas em processos internos ou relatórios

**9. Regras de transição de status das etapas**

<img src="./regras/9. fluxo etapa.gif"/>

```ts
// *o sistema não permite que no update, sejam feitas alterações em "status" que não "ANDAMENTO" ou "CONCLUIDA"
private validarTransicaoPeca(
  atual: "EM_PRODUCAO" | "EM_TRANSPORTE" | "PRONTA",
  novo: "EM_TRANSPORTE" | "PRONTA",
) {
  if (atual === "EM_PRODUCAO" && novo !== "EM_TRANSPORTE") {
    throw new Error("Uma peça em produção só pode ir para transporte");
  }

  if (atual === "EM_TRANSPORTE" && novo !== "PRONTA") {
    throw new Error("Uma peça em transporte só pode ser finalizada");
  }

  if (atual === "PRONTA") {
    throw new Error("Peça pronta não pode ser alterada");
  }
}
```

- Obriga que as etapas sigam uma ordem lógica: pendente → em andamento → concluída
- Impede retrocessos ou modificações em etapas já concluídas, preservando o histórico do processo
- Garante que relatórios e métricas reflitam corretamente o estado real das operações

**10. Regras de transição de status das peças**

<img src="./regras/10. fluxo peca.gif"/>

```ts
// *o sistema não permite que no update, sejam feitas alterações em "status" que não "EM_TRANSPORTE" ou "PRONTA"
private validarTransicaoPeca(
  atual: "EM_PRODUCAO" | "EM_TRANSPORTE" | "PRONTA",
  novo: "EM_TRANSPORTE" | "PRONTA",
) {
  if (atual === "EM_PRODUCAO" && novo !== "EM_TRANSPORTE") {
    throw new Error(
      "Uma peça em produção só pode ir para transporte",
    );
  }

  if (atual === "EM_TRANSPORTE" && novo !== "PRONTA") {
    throw new Error(
      "Uma peça em transporte só pode ser finalizada",
    );
  }

  if (atual === "PRONTA") {
    throw new Error("Peça pronta não pode ser alterada");
  }
}
```

- Obriga que as peças sigam uma ordem lógica: em produção → em transporte → pronta
- Impede retrocessos ou modificações em peças já prontas, preservando o histórico do processo
- Garante que relatórios e métricas reflitam corretamente o estado real das operações

**11. Regras de transição de status dos testes**

<img src="./regras/11. fluxo teste.gif"/>

```ts
// *o sistema não permite que no update, sejam feitas alterações em "status" que não "APROVADO" ou "REPROVADO"
private validarTransicaoTeste(
    atual: "PENDENTE" | "APROVADO" | "REPROVADO",
    novo: "PENDENTE" | "APROVADO" | "REPROVADO",
  ) {
    if (atual !== "PENDENTE") {
      throw new Error("Teste já avaliado não pode ser alterado");
    }
  }
```

- Obriga que os testes sigam uma ordem lógica: pendente → aprovado ou reprovado
- Garante a integridade e confiabilidade dos resultados dos testes
- Evita inconsistências na geração de relatórios e análises finais

**12. Funcionários só podem ser alterados enquanto a etapa não estiver concluída**

<img src="./regras/12. etapa concluida.gif"/>

```ts
const alterandoFuncionarios =
  (data.adicionarFuncionariosIds?.length || 0) > 0 ||
  (data.removerFuncionariosIds?.length || 0) > 0;

if (etapa.status === "CONCLUIDA" && alterandoFuncionarios) {
  throw new Error("Não é possível alterar funcionários de uma etapa concluída");
}
```

- Impede alterações posteriores em registros já finalizados
- Garante que apenas os funcionários realmente envolvidos durante a execução da etapa sejam registrados
- Facilita validações futuras e análise de responsabilidade das atividades executadas

**13. Etapas concluídas devem possuir pelo menos um funcionário**

<img src="./regras/13. ultimo funcionario.gif"/>

```ts
if (data.status === "CONCLUIDA" && totalFinalFuncionarios <= 0) {
  throw new Error("Etapa concluída deve possuir pelo menos um funcionário");
}
```

- Garante que etapas concluídas possuam responsáveis registrados
- Evita etapas finalizadas sem execução atribuída
- Mantém coerência operacional e auditoria do processo

**14. O sistema impede remover todos os funcionários de uma etapa**

Obs.: A funcionalidade de remover múltiplos funcionários será implementada futuramente no front-end do projeto.

```ts
if (funcionariosAtuaisIds.length > 0 && totalFinalFuncionarios <= 0) {
  throw new Error("Não é possível remover todos os funcionários de uma etapa");
}
```

- Garante que etapas sempre mantenham responsáveis associados
- Evita inconsistências operacionais
- Impede etapas órfãs sem responsáveis definidos

**15. Testes avaliados não podem ser deletados**

Obs.: A funcionalidade de exclusão de testes não foi incorporada ao front-end. Essa decisão foi tomada visando garantir a integridade dos registros. No entanto, a funcionalidade existe e pode ser utilizada para atender às regras de negócio se assim for necessário.

```ts
if (teste.resultado === "APROVADO" || teste.resultado === "REPROVADO") {
  throw new Error("Não é possível deletar um teste já avaliado");
}
```

- Preserva histórico de testes realizados
- Impede perda de dados importantes para auditoria
- Garante confiabilidade de relatórios e análises

**16. Usuários administradores não podem deletar a si próprios**

Obs.: Também por razões de integridade, foi optado não implementar a exclusão direta dos usuários no front-end. No entanto, a funcionalidade está disponível para ser utilizada, caso assim seja necessário.

```ts
if (usuario.id === id) {
  throw new Error("Você não pode deletar a si próprio");
}
```

- Evita perda acidental de acesso administrativo
- Garante continuidade de gerenciamento do sistema

**17. O sistema deve possuir pelo menos um administrador**

Obs.: Complemento da regra 16. Assim como explicado na regra anterior, foi optado não incluir a funcionalidade de exclusão ao front-end.

```ts
const usuarios = await this.usuarioRepository.findMany();
const totalAdmins = usuarios.filter((u) => u.permissao === "ADMIN").length;

if (usuarioExiste.permissao === "ADMIN" && totalAdmins === 1) {
  throw new Error("O sistema deve possuir pelo menos um administrador");
}
```

- Impede que o sistema fique sem administradores
- Garante manutenção contínua do ambiente
- Evita bloqueio administrativo da aplicação

**18. Engenheiros possuem restrições de edição em testes**

Obs.: No front-end, esse aviso de restrição não chega a ser evidenciado, uma vez que a funcionalidade de edição de testes não foi inclusa na plataforma online.

```ts
if (usuario.permissao === "ENGENHEIRO") {
  const camposProibidos = ["tipo"];

  const engenheiroCampoProibido = camposProibidos.some(
    (campo) => data[campo as keyof typeof data] !== undefined,
  );

  if (engenheiroCampoProibido) {
    throw new Error("Engenheiros podem alterar apenas o resultado do teste");
  }
}
```

- Garante integridade estrutural dos testes cadastrados
- Evita mudanças indevidas após criação do teste

## **Permissões de Usuários**

### Operador

Permissões disponíveis para usuários operadores:

- visualizar aeronaves
- visualizar detalhes de uma aeronave
- visualizar detalhes de etapas, peças e testes de uma aeronave
- visualizar relatórios
- visualizar detalhes de um relatório

### Engenheiro

O engenheiro possui todas as permissões do operador e também pode:

- gerar relatórios de produção
- adicionar peças em aeronaves
- alterar apenas o status de peças
- adicionar testes em aeronaves
- alterar apenas o status de testes
- adicionar funcionários em etapas
- remover funcionários em etapas
- iniciar etapas
- finalizar etapas

### Administrador

O administrador possui todas as permissões do engenheiro e também pode:

- cadastrar aeronaves
- editar aeronaves
- excluir aeronaves
- cadastrar usuários
- editar usuários
- visualizar usuários
- excluir usuários (implementado apenas no back-end)
- cadastrar funcionários
- editar funcionários
- visualizar funcionários
- excluir funcionários (implementado apenas no back-end)
- cadastrar diretamente um funcionário com usuário
- adicionar etapas
- editar etapas (implementado apenas no back-end)
- excluir etapas (implementado apenas no back-end)
- editar peças (implementado apenas no back-end)
- excluir peças (implementado apenas no back-end)
- excluir testes (implementado apenas no back-end)
