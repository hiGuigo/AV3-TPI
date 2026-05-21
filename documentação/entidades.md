# Banco de Dados Aerocode

## Usuário

- id
- username (único)
- senha
- permissão (`ADMIN`, `ENGENHEIRO` ou `OPERADOR`)
- funcionário associado
- relatórios associados
- data de criação (`createdAt`)

## Funcionário

- id
- nome
- telefone *(opcional)*
- endereço *(opcional)*
- usuário associado *(opcional)*
- etapas associadas

## Aeronave

- id
- código *(único)*
- modelo
- capacidade
- alcance
- tipo (`COMERCIAL` ou `MILITAR`)
- peças associadas
- etapas associadas
- testes associados
- relatórios associados
- data de criação (`createdAt`)

## Etapa

- id
- prazo
- status (`PENDENTE`, `ANDAMENTO` ou `CONCLUIDA`)
- aeronave associada
- funcionários associados

## Peça

- id
- nome
- tipo (`NACIONAL` ou `IMPORTADA`)
- fornecedor
- status (`EM_PRODUCAO`, `EM_TRANSPORTE` ou `PRONTA`)
- aeronave associada

## Teste

- id
- tipo (`ELETRICO`, `HIDRAULICO` ou `AERODINAMICO`)
- resultado (`APROVADO` ou `REPROVADO`)
- aeronave associada

## Relatório

- id
- cliente
- data de entrega
- texto
- aeronave associada
- autor associado (`Usuário`)
- data de criação (`createdAt`)

<br>
<br>
<br>

# Relacionamentos

## Usuário ↔ Funcionário

- Um usuário pode possuir um funcionário associado
- Um funcionário pode possuir um usuário associado
- Relação `1:1`

## Aeronave ↔ Peça

- Uma aeronave pode possuir várias peças
- Uma peça pertence a uma única aeronave
- Relação `1:N`

## Aeronave ↔ Etapa

- Uma aeronave pode possuir várias etapas
- Uma etapa pertence a uma única aeronave
- Relação `1:N`

## Aeronave ↔ Teste

- Uma aeronave pode possuir vários testes
- Um teste pertence a uma única aeronave
- Relação `1:N`

## Aeronave ↔ Relatório

- Uma aeronave pode possuir vários relatórios
- Um relatório pertence a uma única aeronave
- Relação `1:N`

## Etapa ↔ Funcionário

- Uma etapa pode possuir vários funcionários
- Um funcionário pode participar de várias etapas
- Relação `N:N`

## Usuário ↔ Relatório

- Um usuário pode criar vários relatórios
- Um relatório possui um único autor
- Relação `1:N`