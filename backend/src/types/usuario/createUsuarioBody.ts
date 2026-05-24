// utilizado em "src/controllers/usuario.controller.ts"
import { Permissao } from "../auth/permissao";

export interface CreateUsuarioBody {
  username: string;
  senha: string;
  permissao: Permissao;
}
