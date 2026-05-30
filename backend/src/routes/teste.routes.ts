import { FastifyInstance } from "fastify";

import { auth } from "../middlewares/auth";
import { verifyRole } from "../middlewares/verifyRole";

import { TesteController } from "../controllers/teste.controller";

import { CreateTesteBody } from "../types/teste/createTesteBody";
import { UpdateTesteBody } from "../types/teste/updateTesteBody";

const testeController = new TesteController();

export async function testeRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/testes",
    {
      preHandler: [auth],
    },
    testeController.findAll.bind(testeController),
  );

  fastify.get<{ Params: { id: string } }>(
    "/testes/:id",
    {
      preHandler: [auth],
    },
    testeController.findUnique.bind(testeController),
  );

  fastify.post<{ Body: CreateTesteBody }>(
    "/testes",
    {
      preHandler: [auth, verifyRole(["ADMIN", "ENGENHEIRO"])],

      schema: {
        body: {
          type: "object",

          required: ["tipo", "aeronaveId"],

          properties: {
            tipo: {
              type: "string",
              enum: ["ELETRICO", "HIDRAULICO", "AERODINAMICO"],
            },

            aeronaveId: {
              type: "string",
            },
          },
        },
      },
    },

    testeController.create.bind(testeController),
  );

  fastify.patch<{
    Params: { id: string };
    Body: UpdateTesteBody;
  }>(
    "/testes/:id",
    {
      preHandler: [auth, verifyRole(["ADMIN", "ENGENHEIRO"])],

      schema: {
        params: {
          type: "object",
          required: ["id"],
          properties: {
            id: {
              type: "string",
            },
          },
        },
        body: {
          type: "object",
          properties: {
            tipo: {
              type: "string",
              enum: ["ELETRICO", "HIDRAULICO", "AERODINAMICO"],
            },
            resultado: {
              type: "string",
              enum: ["APROVADO", "REPROVADO"],
            },
          },
        },
      },
    },

    testeController.update.bind(testeController),
  );

  fastify.delete<{
    Params: { id: string };
  }>(
    "/testes/:id",
    {
      preHandler: [auth, verifyRole(["ADMIN"])],
      schema: {
        params: {
          type: "object",
          required: ["id"],
          properties: {
            id: {
              type: "string",
            },
          },
        },
      },
    },

    testeController.delete.bind(testeController),
  );
}
