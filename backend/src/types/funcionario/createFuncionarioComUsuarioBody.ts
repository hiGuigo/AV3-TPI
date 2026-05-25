import { Permissao } from "../../../generated/prisma/enums";

export type CreateFuncionarioComUsuarioBody = {
  nome: string;
  telefone?: string;
  endereco?: string;

  username: string;
  senha: string;
  permissao: Permissao;
};