export type CreateEtapaBody = {
  prazo: string;
  status: "PENDENTE" | "ANDAMENTO" | "CONCLUIDA";
  aeronaveId: string;
  funcionariosIds: string[];
};