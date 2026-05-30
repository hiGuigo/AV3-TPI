import { api } from "../lib/axios";


import type { Etapa, EtapaStatus } from "../types/etapa/etapa";

import type { CreateEtapaData } from "../types/etapa/createEtapa";

export async function getEtapaById(id: string) {
  const response = await api.get<Etapa>(`/etapas/${id}`);

  return response.data;
}

export async function createEtapa(data: CreateEtapaData) {
  const response = await api.post("/etapas", data);

  return response.data;
}

export async function updateEtapa(
  id: string,
  data: {
    nome?: string;

    status?: EtapaStatus;

    adicionarFuncionariosIds?: string[];

    removerFuncionariosIds?: string[];
  },
) {
  const response = await api.patch(`/etapas/${id}`, data);

  return response.data;
}
