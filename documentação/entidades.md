# Entidades

## Aeronave

- id
- código
- modelo
- capacidade
- alcance
- tipo (`COMERCIAL` ou `MILITAR`)
- peças associadas
- etapas associadas
- testes associados

## Etapa

- id
- prazo
- status (`PENDENTE`, `ANDAMENTO` ou `CONCLUIDA`)
- funcionários associados

## Funcionário

- id
- nome
- telefone
- endereço
- usuário
- senha
- nível de permissão (`ADMIN`, `ENGENHEIRO` ou `OPERADOR`)

## Peça

- id
- nome
- tipo (`NACIONAL` ou `IMPORTADA`)
- fornecedor
- status (`EM_PRODUCAO`, `EM_TRANSPORTE` ou `PRONTA`)

## Teste

- id
- tipo (`ELETRICO`, `HIDRAULICO` ou `AERODINAMICO`)
- resultado (`APROVADO` ou `REPROVADO`)

## Relatório

- id
- código da aeronave
- cliente
- data de entrega
- texto
