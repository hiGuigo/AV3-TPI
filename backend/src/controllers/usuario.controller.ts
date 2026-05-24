// por conta do TypeScript, é preciso informar
// o tipo de "request" e "response", parâmetros da função "create()"
import { FastifyReply, FastifyRequest } from "fastify";

// classe service
import { UsuarioService } from "../services/usuario.service";

// também é importante utilizar a tipagem do request
// assim, é garantido que o que vai ser enviado através do request
// é algo que comprometa a segurança da aplicação
import { CreateUsuarioBody } from "../types/usuario/createUsuarioBody";
import { UpdateUsuarioBody } from "../types/usuario/updateUsuarioBody";

export class UsuarioController {
  // criação de uma nova instância da classe service
  private usuarioService = new UsuarioService();

  // esse método é responsável pela busca de todos os usuários cadastrados
  // ele armazena na variável "usuarios" o resultado da pesquisa retornada pelo service
  // e retorna "usuarios" para a requisição feita em "usuario.routes.ts"
    async findAll(req: FastifyRequest, res: FastifyReply) {
      // a responsabilidade de tratar os erros é executada aqui pelo try catch
      try {
        const usuarios = await this.usuarioService.findAll();
        return res.status(200).send(usuarios);
      } catch (e) {
        // aqui vem o tratamento de erro em si
        // como em JS e TS qualquer coisa pode ser "lançada"
        // o código verifica se o que está acontecendo é realmente um objeto da classe Error
        // isso garante que .message exista
        if (e instanceof Error) {
          // erro 400 para erros causados pelo cliente (tratamento das regras de negócio)
          return res.status(400).send({
            erro: e.message,
          });
        }

        // erro 500 para erros inesperados no servidor (falha no banco, por exemplo)
        return res.status(500).send({
          erro: "Erro interno",
        });
      }
    }

  // aqui é necessário informar o "request" e "response", bem como os seus tipos.
  // "<{Body: CreateUsuarioBody}>" é uma "personalização"
  // já que "FastifyRequest" é um tipo genérico, nessa rota específica,
  // o body segue o tipo CreateUsuarioBody
  async create(
    req: FastifyRequest<{ Body: CreateUsuarioBody }>,
    res: FastifyReply,
  ) {
    // a responsabilidade de tratar os erros é executada aqui pelo try catch
    try {
      // aqui é passado para a instância (usuarioService) o "body" que vem atráves do request
      // o "this" é o responsável por representar a instância atual da classe UsuarioController
      const usuario = await this.usuarioService.create(req.body);

      return res.status(201).send(usuario);
    } catch (e) {
      // aqui vem o tratamento de erro em si
      // como em JS e TS qualquer coisa pode ser "lançada"
      // o código verifica se o que está acontecendo é realmente um objeto da classe Error
      // isso garante que .message exista
      if (e instanceof Error) {
        // erro 400 para erros causados pelo cliente (tratamento das regras de negócio)
        return res.status(400).send({
          erro: e.message,
        });
      }

      // erro 500 para erros inesperados no servidor (falha no banco, por exemplo)
      return res.status(500).send({
        erro: "Erro interno",
      });
    }
  }

  // aqui por conta do fastify pode ficar um pouco confuso
  // "req" precisa primeiro ser tipado com FastifyRequest
  // depois, é preciso definir os parâmetros da rota (o id que será utilizado para buscar o usuário)
  // em seguida, o body da requisição também passa por uma tipagem, garantindo segurança
  // "res" também passa pela tipagem padrão
  async update(
    req: FastifyRequest<{
      Params: { id: string };
      Body: UpdateUsuarioBody;
    }>,
    res: FastifyReply,
  ) {
    // a responsabilidade de tratar os erros é executada aqui pelo try catch
    try {
      // aqui o controller utiliza o id enviado na url (req.params.id),
      // os dados enviados pelo body (req.body)
      // e envia para que o service possa fazer todas as validações
      const usuario = await this.usuarioService.update(req.params.id, req.body);

      // caso a requisição seja feita com sucesso, retorna o status HTTP 200 (ok)
      // e exibe (send()) os dados alterados
      return res.status(200).send(usuario);
    } catch (e) {
      // aqui vem o tratamento de erro em si
      // como em JS e TS qualquer coisa pode ser "lançada"
      // o código verifica se o que está acontecendo é realmente um objeto da classe Error
      // isso garante que .message exista
      if (e instanceof Error) {
        // erro 400 para erros causados pelo cliente (tratamento das regras de negócio)
        return res.status(400).send({
          erro: e.message,
        });
      }

      // erro 500 para erros inesperados no servidor (falha no banco, por exemplo)
      return res.status(500).send({
        erro: "Erro interno",
      });
    }
  }

  // aqui é mais simples, o "req" só recebe o id como parâmetro
  async delete(
    req: FastifyRequest<{
      Params: { id: string };
    }>,
    res: FastifyReply,
  ) {
    // a responsabilidade de tratar os erros é executada aqui pelo try catch
    try {
      // aqui o controller utiliza o id recebido na url
      // e envia para as validações feitas no service
      const usuario = await this.usuarioService.delete(req.params.id);

      // caso o service retorne sucesso, status HTTP = ok (200)
      // e os dados do usuário deletado são exibidos na resposta
      return res.status(200).send(usuario);
    } catch (e) {
      // aqui vem o tratamento de erro em si
      // como em JS e TS qualquer coisa pode ser "lançada"
      // o código verifica se o que está acontecendo é realmente um objeto da classe Error
      // isso garante que .message exista
      if (e instanceof Error) {
        // erro 400 para erros causados pelo cliente (tratamento das regras de negócio)
        return res.status(400).send({
          erro: e.message,
        });
      }

      // erro 500 para erros inesperados no servidor (falha no banco, por exemplo)
      return res.status(500).send({
        erro: "Erro interno",
      });
    }
  }
}
