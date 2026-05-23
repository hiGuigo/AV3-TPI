// utilizado em praticamente todo o fluxo de arquivos:
// routes -> controller -> services -> repository
export const permissoes = [
  "ADMIN",
  "ENGENHEIRO",
  "OPERADOR",
] as const;

export type Permissao = (typeof permissoes)[number];