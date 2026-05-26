export type UpdateEtapaBody = {
  status?: "ANDAMENTO" | "CONCLUIDA";
  adicionarFuncionariosIds?: string[];
  removerFuncionariosIds?: string[];
};
