// por conta do TypeScript, é preciso informar
// o tipo de "request" e "response", parâmetros da função "create()"
import { FastifyReply, FastifyRequest } from "fastify";

// classe service
import { UsuarioService } from "../services/usuario.service";

// também é importante utilizar a tipagem do request
// assim, é garantido que o que vai ser enviado através do request
// é algo que comprometa a segurança da aplicação
import { CreateUsuarioBody } from "../types/createUsuarioBody";

export class UsuarioController {
  // criação de uma nova instância da classe service
  private usuarioService = new UsuarioService();

  // aqui é necessário informar o "request" e "response", bem como os seus tipos.
  // "<{Body: CreateUsuarioBody}>" é uma "personalização"
  // já que "FastifyRequest" é um tipo genérico, nessa rota específica,
  // o body segue o tipo CreateUsuarioBody
  async create(
    req: FastifyRequest<{ Body: CreateUsuarioBody }>,
    res: FastifyReply,
  ) {
    try {
      // aqui é passado para a instância (usuarioService) o "body" que vem atráves do request
      // o "this" é o responsável por representar a instância atual da classe UsuarioController
      const usuario = await this.usuarioService.create(req.body);

      return res.status(201).send(usuario);
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

  async findAll(req: FastifyRequest, res: FastifyReply) {
    try {
      const usuarios = await this.usuarioService.findAll();
      return res.status(200).send(usuarios);
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
