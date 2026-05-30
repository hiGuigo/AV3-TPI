import { FastifyInstance } from "fastify";
import { auth } from "../middlewares/auth";
import { verifyRole } from "../middlewares/verifyRole";
import { EtapaController } from "../controllers/etapa.controller";
import { CreateEtapaBody } from "../types/etapa/createEtapaBody";
import { UpdateEtapaBody } from "../types/etapa/updateEtapaBody";

const etapaController = new EtapaController();

export async function etapaRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/etapas",
    { preHandler: [auth] },
    etapaController.findAll.bind(etapaController),
  );

  fastify.post<{ Body: CreateEtapaBody }>(
    "/etapas",
    {
      preHandler: [auth, verifyRole(["ADMIN"])],
      schema: {
        body: {
          type: "object",
          required: ["prazo", "nome", "aeronaveId", "funcionariosIds"],
          properties: {
            prazo: { type: "string" },
            nome: { type: "string" },
            aeronaveId: { type: "string" },
            funcionariosIds: {
              type: "array",
              items: { type: "string" },
            },
          },
        },
      },
    },
    etapaController.create.bind(etapaController),
  );

  fastify.patch<{
    Params: { id: string };
    Body: UpdateEtapaBody;
  }>(
    "/etapas/:id",
    {
      preHandler: [auth, verifyRole(["ADMIN", "ENGENHEIRO"])],
      schema: {
        body: {
          type: "object",
          properties: {
            nome: { type: "string" },
            status: {
              type: "string",
              enum: ["ANDAMENTO", "CONCLUIDA"],
            },
            adicionarFuncionariosIds: {
              type: "array",
              items: { type: "string" },
            },
            removerFuncionariosIds: {
              type: "array",
              items: { type: "string" },
            },
          },
        },
      },
    },
    etapaController.update.bind(etapaController),
  );

  fastify.delete<{ Params: { id: string } }>(
    "/etapas/:id",
    {
      preHandler: [auth, verifyRole(["ADMIN"])],
    },
    etapaController.delete.bind(etapaController),
  );
}
