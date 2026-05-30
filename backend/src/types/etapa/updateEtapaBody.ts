export type UpdateEtapaBody = {
  status?: "ANDAMENTO" | "CONCLUIDA";
  nome: string;
  adicionarFuncionariosIds?: string[];
  removerFuncionariosIds?: string[];
};
