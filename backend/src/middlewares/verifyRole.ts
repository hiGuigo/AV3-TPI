// middleware responsável pelo Role-Based Access Controll (RBAC)

import { FastifyReply, FastifyRequest } from "fastify";

import { Permissao } from "../types/auth/permissao";

// o método verifyRole() recebe como parâmetro uma lista de permissões
// estabelecidas em permissoes.ts 
export function verifyRole(permissoes: Permissao[]) {
  // o middleware de fato se dá aqui:
  return async (req: FastifyRequest, res: FastifyReply) => {
    // faz a verificação de permissão do usuário com base na lista de permissões da rota
    // se a permissão do usuário estiver contida na lista recebida = ok
    if (!permissoes.includes(req.user.permissao as Permissao)) {
      return res.status(403).send({
        erro: "Sem permissão",
      });
    }
  };
}
