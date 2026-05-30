import { api } from "../lib/axios";

import type { CreatePecaData } from "../types/peca/createPeca";

export async function createPeca(data: CreatePecaData) {
  const response = await api.post("/pecas", data);

  return response.data;
}
