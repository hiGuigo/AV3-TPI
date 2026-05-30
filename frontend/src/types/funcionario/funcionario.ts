export interface RelatorioResumo {
  id: string;
  cliente: string;
  dataEntrega: string;
}

export interface Funcionario {
  id: string;
  nome: string;
  telefone?: string | null;
  endereco?: string | null;
}

export interface Usuario {
  id: string;
  username: string;
  permissao: "ADMIN" | "ENGENHEIRO" | "FUNCIONARIO";
  createdAt: string;

  funcionario?: Funcionario | null;
  relatorios: RelatorioResumo[];
}
