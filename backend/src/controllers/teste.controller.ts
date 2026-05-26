import { FastifyReply, FastifyRequest } from "fastify";

import { TesteService } from "../services/teste.service";

import { CreateTesteBody } from "../types/teste/createTesteBody";
import { UpdateTesteBody } from "../types/teste/updateTesteBody";

export class TesteController {
  private testeService = new TesteService();

  async findAll(req: FastifyRequest, res: FastifyReply) {
    try {
      const testes = await this.testeService.findAll();

      return res.status(200).send(testes);
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
    req: FastifyRequest<{ Body: CreateTesteBody }>,
    res: FastifyReply,
  ) {
    try {
      const teste = await this.testeService.create(req.body);

      return res.status(201).send(teste);
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
      Body: UpdateTesteBody;
    }>,
    res: FastifyReply,
  ) {
    try {
      const teste = await this.testeService.update(req.user, req.params.id, req.body);

      return res.status(200).send(teste);
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
      const teste = await this.testeService.delete(req.params.id);

      return res.status(200).send(teste);
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
