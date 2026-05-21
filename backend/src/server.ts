import Fastify from "fastify";

// import do dotenv para receber a variável "PORT"
import "dotenv/config";

// como as rotas não estão sendo criadas neste arquivo, 
// é preciso importá-las para que o fastify as reconheças
import { usuarioRoutes } from "./routes/usuario.routes";

// a função Fastify é a responsável por criar o servidor
// ela é armazenada em um variável para facilidade
// a variável "fastify" representa o servidor inteiro
const fastify = Fastify();

// rota teste
fastify.get("/teste", async (req, res) => {
    return { message: "Servidor ok!" };
});

// como as rotas não estão sendo criadas neste arquivo, 
// é preciso registrá-las para que o fastify as reconheças
fastify.register(usuarioRoutes);

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
