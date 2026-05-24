// utilizado em "src/controllers/usuario.controller.ts"
import { Permissao } from "../auth/permissao";

export interface UpdateUsuarioBody {
  username?: string;
  senha?: string;
  permissao?: Permissao;
}
