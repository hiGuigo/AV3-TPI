// utilizado em "src/controllers/usuario.controller.ts"
export type CreateUsuarioBody = {
  username: string;
  senha: string;
  permissao: "ADMIN" | "ENGENHEIRO" | "OPERADOR";
};