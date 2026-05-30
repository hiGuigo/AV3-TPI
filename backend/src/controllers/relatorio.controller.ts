import { FastifyReply, FastifyRequest } from "fastify";

import { RelatorioService } from "../services/relatorio.service";

import { CreateRelatorioBody } from "../types/relatorio/createRelatorioBody";
import { UpdateRelatorioBody } from "../types/relatorio/updateRelatorioBody";

export class RelatorioController {
  private relatorioService = new RelatorioService();

  async findAll(req: FastifyRequest, res: FastifyReply) {
    try {
      const relatorios = await this.relatorioService.findAll();

      return res.status(200).send(relatorios);
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

      const relatorio = await this.relatorioService.findUnique(id);

      return res.status(200).send(relatorio);
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
    req: FastifyRequest<{
      Body: CreateRelatorioBody;
    }>,
    res: FastifyReply,
  ) {
    try {
      const relatorio = await this.relatorioService.create({
        ...req.body,
        autorId: req.user.id,
      });

      return res.status(201).send(relatorio);
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
      Body: UpdateRelatorioBody;
    }>,
    res: FastifyReply,
  ) {
    try {
      const relatorio = await this.relatorioService.update(
        req.params.id,
        req.body,
      );

      return res.status(200).send(relatorio);
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
      const relatorio = await this.relatorioService.delete(req.params.id);

      return res.status(200).send(relatorio);
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
