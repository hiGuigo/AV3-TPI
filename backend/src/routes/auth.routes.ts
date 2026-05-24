// rota reponsável por chamar o controller, que por sua vez criará o token de autenticação

import { FastifyInstance } from "fastify";

import { AuthController } from "../controllers/auth.controller";

const authController = new AuthController();

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post(
    // declaração da rota
    "/login",
    // configuração da requisição com schema
    {
      schema: {
        // definindo as configurações do body
        body: {
          // garantindo que ele é do tipo objeto
          type: "object",
          // que os campos username e senha são obrigatórios
          required: ["username", "senha"],
          // garantindo os tipos de username e senha
          properties: {
            username: {
              type: "string",
            },

            senha: {
              type: "string",
            },
          },
        },
      },
    },

    // caso as validações dentro do schema estejam de acordo, o handler do controller é chamado
    authController.login.bind(authController),
  );
}
