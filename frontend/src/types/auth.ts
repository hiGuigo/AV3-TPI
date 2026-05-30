// essas interfaces serão reponsáveis pelo molde de ambos request e response
// exatamente como os dados de login devem ser enviados e recebidos, respectivamente
// elas serão utilizadas em auth.service.ts

import type { Permissao } from "./funcionario/funcionario";

// interface para os dados do usuário
export interface Usuario {
  id: string;
  username: string;
  permissao: Permissao;
}

// aqui é garantido que só seja aceito no request os parâmetros "username" e "senha"
// qualquer outro tipo de dado que não for string também não é aceito
export interface LoginRequest {
  username: string;
  senha: string;
}

// aqui garante que o token recebido na autenticação seja apenas no formato string
export interface LoginResponse {
  token: string;
  usuario: Usuario;
}
