export interface CreateAeronaveData {
  codigo: string;
  modelo: string;
  capacidade: number;
  alcance: number;
  tipo: "COMERCIAL" | "MILITAR";
}

export type FormData = {
  codigo: string;
  modelo: string;
  capacidade: string;
  alcance: string;
  tipo: "";
};

export type FormErrors = {
  codigo?: string;
  modelo?: string;
  capacidade?: string;
  alcance?: string;
  tipo?: string;
};