import { FastifyInstance } from "fastify";
import { auth } from "../middlewares/auth";
import { verifyRole } from "../middlewares/verifyRole";

import { FuncionarioController } from "../controllers/funcionario.controller";

import { CreateFuncionarioBody } from "../types/funcionario/createFuncionarioBody";
import { UpdateFuncionarioBody } from "../types/funcionario/updateFuncionarioBody";
import { CreateFuncionarioComUsuarioBody } from "../types/funcionario/createFuncionarioComUsuarioBody";

const funcionarioController = new FuncionarioController();

export async function funcionarioRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/funcionarios",
    { preHandler: [auth, verifyRole(["ADMIN"])] },
    funcionarioController.findAll.bind(funcionarioController),
  );

  fastify.post<{ Body: CreateFuncionarioBody }>(
    "/funcionarios",
    {
      preHandler: [auth, verifyRole(["ADMIN"])],
      schema: {
        body: {
          type: "object",
          required: ["nome"],
          properties: {
            nome: { type: "string" },
            telefone: { type: "string" },
            endereco: { type: "string" },
            usuarioId: { type: "string" },
          },
        },
      },
    },
    funcionarioController.create.bind(funcionarioController),
  );

  fastify.post<{ Body: CreateFuncionarioComUsuarioBody }>(
    "/funcionarios/com-usuario",
    {
      preHandler: [auth, verifyRole(["ADMIN"])],
      schema: {
        body: {
          type: "object",
          required: ["nome", "username", "senha", "permissao"],
          properties: {
            nome: { type: "string" },
            telefone: { type: "string" },
            endereco: { type: "string" },

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
    funcionarioController.createWithUser.bind(funcionarioController),
  );

  fastify.patch<{
    Params: { id: string };
    Body: UpdateFuncionarioBody;
  }>(
    "/funcionarios/:id",
    {
      preHandler: [auth, verifyRole(["ADMIN"])],
    },
    funcionarioController.update.bind(funcionarioController),
  );

  fastify.delete<{ Params: { id: string } }>(
    "/funcionarios/:id",
    {
      preHandler: [auth, verifyRole(["ADMIN"])],
    },
    funcionarioController.delete.bind(funcionarioController),
  );
}
