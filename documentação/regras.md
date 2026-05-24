# Regras de Negócio Aerocode

## Operador

Permissões disponíveis para usuários operadores:

- visualizar aeronaves
- visualizar detalhes de uma aeronave
- visualizar etapas, peças e testes de uma aeronave
- visualizar relatórios
- visualizar detalhes de um relatório

## Engenheiro

O engenheiro possui todas as permissões do operador e também pode:

- gerar relatórios de produção
- adicionar peças em aeronaves
- adicionar testes em aeronaves
- adicionar funcionários em etapas
- iniciar etapas
- finalizar etapas
- alterar status de peças
- alterar status de testes

## Administrador

O administrador possui todas as permissões do engenheiro e também pode:

- cadastrar aeronaves
- editar aeronaves
- cadastrar peças
- visualizar usuários
- visualizar detalhes de usuários
- cadastrar usuários
- editar usuários
- adicionar etapas

## Algumas regras gerais que o sistema atende

**Senha no cadastro de usuário criptografada com "bcrypt"**

- Evita que senhas sejam armazenadas em texto puro no banco de dados
- Aumenta a segurança caso ocorra vazamento de dados
- Dificulta ataques de engenharia reversa utilizando hash com salt

**Usuário (username) existente não pode ser cadastrado novamente**

- Garante unicidade dos usuários no sistema
- Evita conflitos durante o processo de login
- Impede duplicidade de informações no banco de dados

**Identificação de usuários (id) feita com "Identificador Único Universal" (UUID)**

- Garante identificadores únicos para cada usuário
- Evita conflitos de IDs em diferentes ambientes ou servidores
- Dificulta previsões sequenciais de identificadores por questões de segurança

**Utilização de JWT (Jason Web Token) para autenticação stateless**

- Permite autenticação sem necessidade de armazenar sessão no servidor
- Facilita escalabilidade da aplicação
- Possibilita validação rápida e segura do usuário autenticado
- Mantém informações do usuário protegidas através de assinatura digital do token

**O sistema atende a estrutura "Role-Based Access Controll (RBAC)" para controle de permissões**

- Garante que cada usuário acesse apenas funcionalidades permitidas
- Facilita gerenciamento de permissões por cargos ou níveis de acesso
- Melhora a segurança da aplicação
- Centraliza regras de autorização de forma organizada e escalável
