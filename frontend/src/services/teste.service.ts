import { api } from "../lib/axios";

import type { CreateTesteData } from "../types/teste/createTeste";

export async function createTeste(data: CreateTesteData) {
  const response = await api.post("/testes", data);

  return response.data;
}
