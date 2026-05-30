import { api } from "../lib/axios";

import type { Peca, StatusPeca } from "../types/peca/peca";

import type { CreatePecaData } from "../types/peca/createPeca";

export async function getPecaById(id: string) {
  const response = await api.get<Peca>(`/pecas/${id}`);

  return response.data;
}

export async function createPeca(data: CreatePecaData) {
  const response = await api.post("/pecas", data);

  return response.data;
}

export async function updatePeca(
  id: string,
  data: {
    status?: StatusPeca;
    nome?: string;
    fornecedor?: string;
    tipo?: string;
    aeronaveId?: string;
  },
) {
  const response = await api.patch(`/pecas/${id}`, data);

  return response.data;
}
