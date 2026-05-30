import { api } from "../lib/axios";

import type { CreatePecaData } from "../types/peca/createPeca";
import type { Peca } from "../types/peca/peca";

export async function createPeca(data: CreatePecaData) {
  const response = await api.post("/pecas", data);

  return response.data;
}

export async function getPecaById(id: string) {
  const response = await api.get<Peca>(`/pecas/${id}`);

  return response.data;
}

export async function updatePeca(
  id: string,
  data: {
    status?: "EM_TRANSPORTE" | "PRONTA";
    nome?: string;
    fornecedor?: string;
    tipo?: string;
    aeronaveId?: string;
  },
) {
  const response = await api.patch(`/pecas/${id}`, data);

  return response.data;
}
