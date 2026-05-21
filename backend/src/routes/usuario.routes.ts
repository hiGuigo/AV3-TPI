// "const fastify = Fastify()" é a instância
// "FastifyInstance" é o tipo dela
// para que o TypeScript "entenda" que a instância possui os métodos
// "get()", "post()", "put()", "delete()", "register()", "listen()", ...
// é preciso informar o tipo da instância com o import
import { FastifyInstance } from "fastify";

// classe controller
import { UsuarioController } from "../controllers/usuario.controller";

// criação de uma nova instância da classe controller
const usuarioController = new UsuarioController();

// por conta da tipagem do TypeScript, além de ser necessário informar a instância (fastify),
// é necessário também informar o tipo dela (FastifyInstance)
// essa função é chamada através do método "register()", em "server.ts"
// o "register()" é responsável por "enviar" a instância para a função "usuarioRoutes()"
// assim, ela "entende" que existe uma instância no contexto da aplicação
export async function usuarioRoutes(fastify: FastifyInstance) {
  // aqui é definida a rota,
  // a validação dos campos (aceitam somente o que é passado no schema)
  // e um "bind()" para que o contexto (controller) do método de requisição
  // seja mantido quando o método for executado pelo Fastify
  fastify.post(
    "/usuarios",
    {
      schema: {
        body: {
          type: "object",
          required: ["username", "senha", "permissao"],
          properties: {
            username: { type: "string" },
            senha: { type: "string" },
            permissao: {
              type: "string",
              enum: ["ADMIN", "ENGENHEIRO", "OPERADOR"],
            },
          },
        },
      },
    },
    // basicamente: “execute o método create,
    // mas sempre considerando que this é o usuarioController”
    usuarioController.create.bind(usuarioController),
  );

  fastify.get("/usuarios", usuarioController.findAll.bind(usuarioController));
}
