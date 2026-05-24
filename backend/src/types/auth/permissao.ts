// utilizado em diversos arquivos para garantir a aplicação corretao do RBAC
export const permissoes = [
  "ADMIN",
  "ENGENHEIRO",
  "OPERADOR",
] as const;

export type Permissao = (typeof permissoes)[number];