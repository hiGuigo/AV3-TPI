import type { TipoPeca } from "./peca";

export interface CreatePecaData {
  nome: string;
  tipo: TipoPeca;
  fornecedor: string;
  aeronaveId: string;
}

export type FormData = {
  nome: string;
  tipo: "";
  fornecedor: string;
};

export type FormErrors = {
  nome?: string;
  tipo?: string;
  fornecedor?: string;
};
