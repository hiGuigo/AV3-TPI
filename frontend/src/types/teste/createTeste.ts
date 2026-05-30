import type { TipoTeste } from "./teste";

export interface CreateTesteData {
  tipo: TipoTeste;
  aeronaveId: string;
}

export type FormData = {
  tipo: "";
};

export type FormErrors = {
  tipo?: string;
};
