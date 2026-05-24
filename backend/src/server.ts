import Fastify from "fastify";

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

// o hook onSend é executado um pouco antes da resposta ser enviada ao client
// quando ele é chamado, a rota já foi executada, o controller já terminou de fazer o que tinha que fazer
// e o status HTTP já existe, a requisição só não terminou ainda, mas tá praticamente lá
fastify.addHook("onSend", async (req, reply, payload) => {
  // depois de tudo ter sido feito, é salvo o instante final da requisição
  const fim = performance.now();

  // cálculo do tempo que a requisição levou (em ms)
  const tempo = fim - req.inicio;

  console.log(
    `[${reply.statusCode}] ${req.method} ${req.url} - ${tempo.toFixed(2)} ms`,
  );
});

// registrando o jason web token
// ele deve vir antes das rotas porque adiciona funcionalidades
// ao módulo que as rotas irão precisar utilizar
await fastify.register(jwt);

// como as rotas não estão sendo criadas neste arquivo,
// é preciso registrá-las para que o fastify as reconheças
await fastify.register(authRoutes);
await fastify.register(usuarioRoutes);

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
