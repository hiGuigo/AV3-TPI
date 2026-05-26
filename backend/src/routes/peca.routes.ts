import { FastifyInstance } from "fastify";

import { auth } from "../middlewares/auth";
import { verifyRole } from "../middlewares/verifyRole";

import { PecaController } from "../controllers/peca.controller";

import { CreatePecaBody } from "../types/peca/createPecaBody";
import { UpdatePecaBody } from "../types/peca/updatePecaBody";

const pecaController = new PecaController();

export async function pecaRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/pecas",
    {
      preHandler: [auth],
    },
    pecaController.findAll.bind(pecaController),
  );

  fastify.post<{ Body: CreatePecaBody }>(
    "/pecas",
    {
      preHandler: [auth, verifyRole(["ADMIN", "ENGENHEIRO"])],

      schema: {
        body: {
          type: "object",
          required: ["nome", "tipo", "fornecedor", "aeronaveId"],

          properties: {
            nome: {
              type: "string",
            },

            tipo: {
              type: "string",
              enum: ["NACIONAL", "IMPORTADA"],
            },

            fornecedor: {
              type: "string",
            },

            aeronaveId: {
              type: "string",
            },
          },
        },
      },
    },

    pecaController.create.bind(pecaController),
  );

  fastify.patch<{
    Params: { id: string };
    Body: UpdatePecaBody;
  }>(
    "/pecas/:id",
    {
      preHandler: [auth, verifyRole(["ADMIN", "ENGENHEIRO"])],

      schema: {
        body: {
          type: "object",

          properties: {
            nome: {
              type: "string",
            },

            tipo: {
              type: "string",
              enum: ["NACIONAL", "IMPORTADA"],
            },

            fornecedor: {
              type: "string",
            },

            status: {
              type: "string",
              enum: ["EM_TRANSPORTE", "PRONTA"],
            },
          },
        },
      },
    },

    pecaController.update.bind(pecaController),
  );

  fastify.delete<{
    Params: { id: string };
  }>(
    "/pecas/:id",
    {
      preHandler: [auth, verifyRole(["ADMIN"])],
    },

    pecaController.delete.bind(pecaController),
  );
}
