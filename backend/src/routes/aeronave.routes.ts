import { FastifyInstance } from "fastify";
import { auth } from "../middlewares/auth";
import { verifyRole } from "../middlewares/verifyRole";
import { AeronaveController } from "../controllers/aeronave.controller";

import { CreateAeronaveBody } from "../types/aeronave/createAeronaveBody";
import { UpdateAeronaveBody } from "../types/aeronave/updateAeronaveBody";

const aeronaveController = new AeronaveController();

export async function aeronaveRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/aeronaves",
    { preHandler: [auth] },
    aeronaveController.findAll.bind(aeronaveController),
  );

  fastify.post<{ Body: CreateAeronaveBody }>(
    "/aeronaves",
    {
      preHandler: [auth, verifyRole(["ADMIN"])],
      schema: {
        body: {
          type: "object",
          required: ["codigo", "modelo", "capacidade", "alcance", "tipo"],
          properties: {
            codigo: { type: "string" },
            modelo: { type: "string" },
            capacidade: { type: "number" },
            alcance: { type: "number" },
            tipo: {
              type: "string",
              enum: ["COMERCIAL", "MILITAR"],
            },
          },
        },
      },
    },
    aeronaveController.create.bind(aeronaveController),
  );

  fastify.patch<{
    Params: { id: string };
    Body: UpdateAeronaveBody;
  }>(
    "/aeronaves/:id",
    {
      preHandler: [auth, verifyRole(["ADMIN"])],
    },
    aeronaveController.update.bind(aeronaveController),
  );

  fastify.delete<{ Params: { id: string } }>(
    "/aeronaves/:id",
    {
      preHandler: [auth, verifyRole(["ADMIN"])],
    },
    aeronaveController.delete.bind(aeronaveController),
  );
}
