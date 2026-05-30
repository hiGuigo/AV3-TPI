export type TipoPeca = "NACIONAL" | "IMPORTADA";

export type StatusPeca = "EM_PRODUCAO" | "EM_TRANSPORTE" | "PRONTA";

export interface Peca {
  id: string;
  nome: string;
  tipo: TipoPeca;
  fornecedor: string;
  status: StatusPeca;
  aeronaveId: string;
}
