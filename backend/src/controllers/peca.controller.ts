import { FastifyReply, FastifyRequest } from "fastify";

import { PecaService } from "../services/peca.service";

import { CreatePecaBody } from "../types/peca/createPecaBody";
import { UpdatePecaBody } from "../types/peca/updatePecaBody";

export class PecaController {
  private pecaService = new PecaService();

  async findAll(req: FastifyRequest, res: FastifyReply) {
    try {
      const pecas = await this.pecaService.findAll();

      return res.status(200).send(pecas);
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

  async findUnique(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = req.params as { id: string };

      const peca = await this.pecaService.findUnique(id);

      return res.status(200).send(peca);
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
    req: FastifyRequest<{ Body: CreatePecaBody }>,
    res: FastifyReply,
  ) {
    try {
      const peca = await this.pecaService.create(req.body);

      return res.status(201).send(peca);
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

  async update(
    req: FastifyRequest<{
      Params: { id: string };
      Body: UpdatePecaBody;
    }>,
    res: FastifyReply,
  ) {
    try {
      const peca = await this.pecaService.update(req.user, req.params.id, req.body);

      return res.status(200).send(peca);
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

  async delete(
    req: FastifyRequest<{
      Params: { id: string };
    }>,
    res: FastifyReply,
  ) {
    try {
      const peca = await this.pecaService.delete(req.params.id);

      return res.status(200).send(peca);
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
}
