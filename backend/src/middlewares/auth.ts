// middleware responsável pela autenticação
// é aqui que é feita a proteção para que os usuários sem permissão
// não acessem funções do sistema que não lhes dizem respeito

import { FastifyReply, FastifyRequest } from "fastify";

export async function auth(req: FastifyRequest, res: FastifyReply) {
  try {
    // essa é a parte mais importante, a verificação de fato
    // o método jwtVerify() procura o token no header da requisição (Authorization: Bearer TOKEN)
    // valida a assinatura (configurada em jwt.ts)
    // verifica se ela ainda não expirou
    // decodifica o payload (definido em fastify-jwt.d.ts)
    // e popula o req.user (também tipado em fastify-jwt.d.ts)
    await req.jwtVerify();
  } catch {
    return res.status(401).send({
      erro: "Não autorizado",
    });
  }
}
