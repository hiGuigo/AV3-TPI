export type Permissao = "ADMIN" | "ENGENHEIRO" | "OPERADOR";

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
  permissao: Permissao;
  createdAt: string;

  funcionario?: Funcionario | null;
  relatorios: RelatorioResumo[];
}
