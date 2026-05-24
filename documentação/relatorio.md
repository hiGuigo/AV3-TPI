# Relatório de Testes Aerocode

## 1. Introdução

Este relatório apresenta testes de desempenho realizados na aplicação, com o objetivo de analisar seu comportamento durante múltiplas requisições simultâneas. Foram coletadas métricas de latência, tempo de resposta e tempo de processamento em cenários com diferentes quantidades de usuários.

A realização desses testes tem como objetivo verificar a estabilidade, o desempenho e a capacidade do sistema de continuar funcionando corretamente sob carga, além de validar a qualidade da aplicação desenvolvida.

```
Latência: tempo até começar a responder.

Tempo de processamento: tempo interno do servidor.

Tempo de resposta: tempo total da requisição.
```

## 2. Metodologia

Para medir o tempo de processamento interno da aplicação, foi utilizado um hook global do Fastify responsável por capturar o início e o fim do ciclo da requisição utilizando a API performance.now() do Node.js. O tempo total foi calculado em milissegundos e registrado durante a execução das rotas da aplicação.

**Hook "onRequest", executado quando a requisição chega no servidor:**
```
fastify.addHook("onRequest", async (req, reply) => {
  req.inicio = performance.now();
});
```

**Hook "onSend", executado um pouco antes do fim da "vida" da requisição:**
```
fastify.addHook("onSend", async (req, reply, payload) => {
  const fim = performance.now();

  const tempo = fim - req.inicio;

  console.log(
    `[${reply.statusCode}] ${req.method} ${req.url} - ${tempo.toFixed(2)} ms`,
  );
});
```

Os testes de desempenho foram realizados utilizando a ferramenta autocannon, executando requisições HTTP simultâneas contra a API Fastify localmente. Foram simulados cenários com 1, 5 e 10 usuários simultâneos durante 10 segundos para cada rota testada. As métricas coletadas foram latência, tempo de resposta e tempo de processamento, todas medidas em milissegundos.

**Exemplo de teste com 5 usuários simultâneos:**
```
npx autocannon -H "Authorization: Bearer TOKEN_JWT" -c 5 -d 10 http://localhost:3000/usuarios
```

Como o sistema conta com a utilização de JWT, para segurança, é necessário informar, além de quantidade de usuários, tempo e requisição, o token obtido no login. Para obter o token mais facilmente, basta utilizar qualquer programa de testes de APIs (Postman, Insomnia...):

```
Método: POST
Rota: /login
Body: {
    "username": "seu_nome_de_usuario",
    "senha": "sua_senha"
}
```

## 3. Resultados

## 4. Análise dos Resultados

## 5. Conclusão