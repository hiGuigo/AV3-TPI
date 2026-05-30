import { api } from "../lib/axios";

import type { CreateTesteData } from "../types/teste/createTeste";
import type { Teste } from "../types/teste/teste";

export async function createTeste(data: CreateTesteData) {
  const response = await api.post("/testes", data);

  return response.data;
}

export async function getTesteById(id: string) {
  const response = await api.get<Teste>(`/testes/${id}`);

  return response.data;
}

export async function updateTeste(
  id: string,
  data: {
    resultado?: "APROVADO" | "REPROVADO";
  },
) {
  const response = await api.patch(`/testes/${id}`, data);
  return response.data;
}
