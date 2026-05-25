import { FastifyReply, FastifyRequest } from "fastify";
import { AeronaveService } from "../services/aeronave.service";
import { CreateAeronaveBody } from "../types/aeronave/createAeronaveBody";
import { UpdateAeronaveBody } from "../types/aeronave/updateAeronaveBody";

export class AeronaveController {
  private aeronaveService = new AeronaveService();

  async findAll(req: FastifyRequest, res: FastifyReply) {
    try {
      const aeronaves = await this.aeronaveService.findAll();
      return res.status(200).send(aeronaves);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).send({ erro: e.message });
      }
      return res.status(500).send({ erro: "Erro interno" });
    }
  }

  async create(
    req: FastifyRequest<{ Body: CreateAeronaveBody }>,
    res: FastifyReply,
  ) {
    try {
      const aeronave = await this.aeronaveService.create(req.body);
      return res.status(201).send(aeronave);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).send({ erro: e.message });
      }
      return res.status(500).send({ erro: "Erro interno" });
    }
  }

  async update(
    req: FastifyRequest<{ Params: { id: string }; Body: UpdateAeronaveBody }>,
    res: FastifyReply,
  ) {
    try {
      const aeronave = await this.aeronaveService.update(
        req.params.id,
        req.body,
      );

      return res.status(200).send(aeronave);
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
      const aeronave = await this.aeronaveService.delete(req.params.id);
      return res.status(200).send(aeronave);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).send({ erro: e.message });
      }
      return res.status(500).send({ erro: "Erro interno" });
    }
  }
}
