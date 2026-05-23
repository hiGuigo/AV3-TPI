// utilizado em "src/controllers/usuario.controller.ts"
import { Permissao } from "./permissao";

export interface UpdateUsuarioBody {
  username?: string;
  senha?: string;
  permissao?: Permissao;
}
