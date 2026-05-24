// é aqui onde o token de autenticação do usuário será gerado

// importação dos tipos do Fastify
import { FastifyReply, FastifyRequest } from "fastify";

import { AuthService } from "../services/auth.service";

// importação da tipagem do body, necessária para que o "request" esteja de acordo
import { LoginBody } from "../types/auth/loginBody";

export class AuthController {
  // criando uma nova instância do service
  private authService = new AuthService();

  // no método login, são declarados request e response
  // e ambos são tipados (req é tipado de acordo com a interface criada)
  async login(
    req: FastifyRequest<{
      Body: LoginBody;
    }>,
    res: FastifyReply,
  ) {
    // utilização de try catch para tratamento de possíveis erros
    try {
      // coloca na variável "usuario" o que for retornado pelo service
      // se houver sucesso na busca por um usuário existente
      const usuario = await this.authService.login(req.body);

      // essa é a parte mais importante, a geração do token JWT (Jason Web Token)
      // o token criado é uma "junção" daquilo que é informado
      // nesse caso, id, username e permissao
      // por motivos de segurança, a senha não é incluída no token
      const token = await res.jwtSign({
        id: usuario.id,
        username: usuario.username,
        permissao: usuario.permissao,
      });

      // se a verificação de usuário der certo e o token for criado com sucesso,
      // o token é retornado junto com o status "ok"
      return res.status(200).send({
        token,
      });
    } catch (e) {
      // aqui é feita a validação dos erros, garantindo primeiro que o que está
      // sendo retornado de fato é um erro
      if (e instanceof Error) {
        // erro 401 para ocorrências do cliente
        return res.status(401).send({
          erro: e.message,
        });
      }

      // erro 500 para ocorrências inesperadas do lado do servidor  
      return res.status(500).send({
        erro: "Erro interno",
      });
    }
  }
}
