// utilizado em "src/controllers/usuario.controller.ts"
import { Permissao } from "./permissao";

export interface CreateUsuarioBody {
  username: string;
  senha: string;
  permissao: Permissao;
}
