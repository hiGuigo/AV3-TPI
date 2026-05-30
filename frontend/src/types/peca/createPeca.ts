export interface CreatePecaData {
  nome: string;
  tipo: "NACIONAL" | "IMPORTADA";
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
