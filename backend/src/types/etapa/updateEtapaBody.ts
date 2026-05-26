export type UpdateEtapaBody = {
  status?: "PENDENTE" | "ANDAMENTO" | "CONCLUIDA";
  adicionarFuncionariosIds?: string[];
  removerFuncionariosIds?: string[];
};
