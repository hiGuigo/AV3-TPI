import { FastifyReply, FastifyRequest } from "fastify";
import { EtapaService } from "../services/etapa.service";
import { UpdateEtapaBody } from "../types/etapa/updateEtapaBody";
import { CreateEtapaBody } from "../types/etapa/createEtapaBody";

export class EtapaController {
  private etapaService = new EtapaService();

  async findAll(req: FastifyRequest, res: FastifyReply) {
    try {
      const etapas = await this.etapaService.findAll();
      return res.status(200).send(etapas);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).send({ erro: e.message });
      }
      return res.status(500).send({ erro: "Erro interno" });
    }
  }

  async findUnique(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = req.params as { id: string };

      const etapa = await this.etapaService.findUnique(id);

      return res.status(200).send(etapa);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).send({
          erro: e.message,
        });
      }

      return res.status(500).send({
        erro: "Erro interno",
      });
    }
  }

  async create(
    req: FastifyRequest<{ Body: CreateEtapaBody }>,
    res: FastifyReply,
  ) {
    try {
      const etapa = await this.etapaService.create(req.body);
      return res.status(201).send(etapa);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).send({ erro: e.message });
      }
      return res.status(500).send({ erro: "Erro interno" });
    }
  }

  async update(
    req: FastifyRequest<{
      Params: { id: string };
      Body: UpdateEtapaBody;
    }>,
    res: FastifyReply,
  ) {
    try {
      const etapa = await this.etapaService.update(
        req.user,
        req.params.id,
        req.body,
      );

      return res.status(200).send(etapa);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).send({ erro: e.message });
      }
      return res.status(500).send({ erro: "Erro interno" });
    }
  }

  async delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply,
  ) {
    try {
      const etapa = await this.etapaService.delete(req.params.id);
      return res.status(200).send(etapa);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).send({ erro: e.message });
      }

      return res.status(500).send({ erro: "Erro interno" });
    }
  }
}
