export type EtapaStatus = "PENDENTE" | "ANDAMENTO" | "CONCLUIDA";

export interface FuncionarioEtapa {
  id: string;
  nome: string;
}

export interface Etapa {
  id: string;
  nome: string;
  status: EtapaStatus;

  funcionarios: FuncionarioEtapa[];
}
