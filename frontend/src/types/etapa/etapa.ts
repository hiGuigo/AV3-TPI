export interface FuncionarioEtapa {
  id: string;
  nome: string;
}

export interface Etapa {
  id: string;
  nome: string;
  status: "PENDENTE" | "ANDAMENTO" | "CONCLUIDA";

  funcionarios: FuncionarioEtapa[];
}