import Fastify from "fastify";
import cors from "@fastify/cors";

// importação do módulo perf_hooks para medição das métricas
import { performance } from "perf_hooks";

// import do dotenv para receber a variável "PORT"
import "dotenv/config";

// importanto o jason web token antes das rotas (importante)
import jwt from "./plugins/jwt";

// como as rotas não estão sendo criadas neste arquivo,
// é preciso importá-las para que o fastify as reconheças
import { authRoutes } from "./routes/auth.routes";
import { usuarioRoutes } from "./routes/usuario.routes";
import { funcionarioRoutes } from "./routes/funcionario.routes";
import { aeronaveRoutes } from "./routes/aeronave.routes";
import { etapaRoutes } from "./routes/etapa.routes";
import { pecaRoutes } from "./routes/peca.routes";
import { testeRoutes } from "./routes/teste.routes";

// a função Fastify é a responsável por criar o servidor
// ela é armazenada em um variável para facilidade
// a variável "fastify" representa o servidor inteiro
const fastify = Fastify();

// os seguintes hooks são responsáveis por medir quanto tempo cada requisição leva para ser processada
// o hook onRequest é executado pelo fastify assim que a requisição chega no servidor
// ele acontece antes de tudo (rotas, validação, autenticação...), é literalmente o começo da requisição
fastify.addHook("onRequest", async (req, reply) => {
  // aqui é salvo o instante exato em que a requisição começou
  req.inicio = performance.now();
});

// o hook onResponse é executado quando a requisição já terminou
// ele será utilizado principalmente para medir o tempo de resposta
let totalTempo = 0;
let totalRequisicoes = 0;

fastify.addHook("onResponse", async (req, reply) => {
  // é salvo o instânte final da requisição
  const fim = performance.now();

  // calculado o tempo da resposta (em ms)
  const tempo = fim - req.inicio;

  // para calcular o tempo médio da resposta são somados tempo e requisições feitas
  totalTempo += tempo;
  totalRequisicoes++;

  console.log(
    `[${reply.statusCode}] ${req.method} ${req.url} - ${tempo.toFixed(2)} ms`,
  );

  // calculando o tempo médio das requisições
  console.log(
    `Tempo médio de resposta da requisição: ${(totalTempo / totalRequisicoes).toFixed(2)} ms`,
  );
});

fastify.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});

// registrando o jason web token
// ele deve vir antes das rotas porque adiciona funcionalidades
// ao módulo que as rotas irão precisar utilizar
await fastify.register(jwt);

// como as rotas não estão sendo criadas neste arquivo,
// é preciso registrá-las para que o fastify as reconheças
await fastify.register(authRoutes);
await fastify.register(usuarioRoutes);
await fastify.register(funcionarioRoutes);
await fastify.register(aeronaveRoutes);
await fastify.register(etapaRoutes);
await fastify.register(pecaRoutes);
await fastify.register(testeRoutes);

// a inicialização do servidor demorar um pouco, por isso a função é asíncrona
// definir "host: 0.0.0.0" permite que o servidor aceite conexões externas
const start = async () => {
  try {
    const endereco = await fastify.listen({
      port: process.env.PORT ? Number(process.env.PORT) : 3000,
      host: "0.0.0.0",
    });

    console.log(`Servidor rodando em ${endereco}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
