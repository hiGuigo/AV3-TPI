import { api } from "../lib/axios";

import type { CreateEtapaData } from "../types/etapa/createEtapa";

export async function createEtapa(data: CreateEtapaData) {
  const response = await api.post("/etapas", data);

  return response.data;
}
