import { FastifyReply, FastifyRequest } from "fastify";
import { FuncionarioService } from "../services/funcionario.service";
import { CreateFuncionarioBody } from "../types/funcionario/createFuncionarioBody";
import { UpdateFuncionarioBody } from "../types/funcionario/updateFuncionarioBody";
import { CreateFuncionarioComUsuarioBody } from "../types/funcionario/createFuncionarioComUsuarioBody";

export class FuncionarioController {
  private funcionarioService = new FuncionarioService();

  async findAll(req: FastifyRequest, res: FastifyReply) {
    try {
      const funcionarios = await this.funcionarioService.findAll();
      return res.status(200).send(funcionarios);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).send({ erro: e.message });
      }
      return res.status(500).send({ erro: "Erro interno" });
    }
  }

  async create(
    req: FastifyRequest<{ Body: CreateFuncionarioBody }>,
    res: FastifyReply,
  ) {
    try {
      const funcionario = await this.funcionarioService.create(req.body);
      return res.status(201).send(funcionario);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).send({ erro: e.message });
      }
      return res.status(500).send({ erro: "Erro interno" });
    }
  }

  async createWithUser(
    req: FastifyRequest<{ Body: CreateFuncionarioComUsuarioBody }>,
    res: FastifyReply,
  ) {
    try {
      const funcionario = await this.funcionarioService.createWithUser(
        req.body,
      );

      return res.status(201).send(funcionario);
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
      Body: UpdateFuncionarioBody;
    }>,
    res: FastifyReply,
  ) {
    try {
      const funcionario = await this.funcionarioService.update(
        req.params.id,
        req.body,
      );
      return res.status(200).send(funcionario);
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
      const funcionario = await this.funcionarioService.delete(req.params.id);
      return res.status(200).send(funcionario);
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).send({ erro: e.message });
      }
      return res.status(500).send({ erro: "Erro interno" });
    }
  }
}
