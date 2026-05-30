import { api } from "../lib/axios";

import type { Teste, ResultadoTeste } from "../types/teste/teste";

import type { CreateTesteData } from "../types/teste/createTeste";

export async function getTesteById(id: string) {
  const response = await api.get<Teste>(`/testes/${id}`);

  return response.data;
}

export async function createTeste(data: CreateTesteData) {
  const response = await api.post("/testes", data);

  return response.data;
}

export async function updateTeste(
  id: string,
  data: {
    resultado?: ResultadoTeste;
  },
) {
  const response = await api.patch(`/testes/${id}`, data);
  return response.data;
}
