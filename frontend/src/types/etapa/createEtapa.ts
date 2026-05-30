export interface CreateEtapaData {
  prazo: string;
  nome: string;
  aeronaveId: string;
  funcionariosIds: string[];
}

export type FormData = {
  prazo: string;
  nome: string;
  funcionariosIds: string[];
};

export type FormErrors = {
  prazo?: string;
  nome?: string;
  funcionariosIds?: string;
};
