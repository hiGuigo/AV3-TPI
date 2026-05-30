import { api } from "../lib/axios";

import type { CreateRelatorioData } from "../types/relatorio/createRelatorio";

import type { Relatorio } from "../types/relatorio/relatorios";

export async function getRelatorios() {
  const response = await api.get<Relatorio[]>("/relatorios");

  return response.data;
}

export async function getRelatorioById(id: string) {
  const response = await api.get<Relatorio>(`/relatorios/${id}`);
  return response.data;
}

export async function createRelatorio(data: CreateRelatorioData) {
  const response = await api.post("/relatorios", data);

  return response.data;
}
