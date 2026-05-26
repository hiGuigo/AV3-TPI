import { FastifyInstance } from "fastify";

import { auth } from "../middlewares/auth";
import { verifyRole } from "../middlewares/verifyRole";

import { RelatorioController } from "../controllers/relatorio.controller";

import { CreateRelatorioBody } from "../types/relatorio/createRelatorioBody";
import { UpdateRelatorioBody } from "../types/relatorio/updateRelatorioBody";

const relatorioController = new RelatorioController();

export async function relatorioRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/relatorios",
    {
      preHandler: [auth],
    },

    relatorioController.findAll.bind(relatorioController),
  );

  fastify.post<{
    Body: CreateRelatorioBody;
  }>(
    "/relatorios",
    {
      preHandler: [auth, verifyRole(["ADMIN", "ENGENHEIRO"])],

      schema: {
        body: {
          type: "object",

          required: ["cliente", "dataEntrega", "texto", "aeronaveId"],

          properties: {
            cliente: {
              type: "string",
            },

            dataEntrega: {
              type: "string",
            },

            texto: {
              type: "string",
            },

            aeronaveId: {
              type: "string",
            },
          },
        },
      },
    },

    relatorioController.create.bind(relatorioController),
  );

  fastify.patch<{
    Params: { id: string };
    Body: UpdateRelatorioBody;
  }>(
    "/relatorios/:id",
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
            cliente: {
              type: "string",
            },

            dataEntrega: {
              type: "string",
            },

            texto: {
              type: "string",
            },
          },
        },
      },
    },

    relatorioController.update.bind(relatorioController),
  );

  fastify.delete<{
    Params: { id: string };
  }>(
    "/relatorios/:id",
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

    relatorioController.delete.bind(relatorioController),
  );
}
