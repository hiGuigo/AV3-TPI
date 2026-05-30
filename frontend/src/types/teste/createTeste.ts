export interface CreateTesteData {
  tipo: "ELETRICO" | "HIDRAULICO" | "AERODINAMICO";
  aeronaveId: string;
}

export type FormData = {
  tipo: "";
};

export type FormErrors = {
  tipo?: string;
};
