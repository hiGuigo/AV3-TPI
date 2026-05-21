# Regras de Negócio

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

## Do sistema

Algumas regras gerais que o sistema atende

- Senha no cadastro de usuário criptografada com "bcrypt"
- Usuário (username) existente não pode ser cadastrado novamente
- Identificação de usuários (id) feita com "Identificador Único Universal" (UUID)