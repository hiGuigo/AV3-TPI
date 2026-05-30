import { api } from "../lib/axios";

import type { Funcionario } from "../types/funcionario/funcionario";

export async function getFuncionarios() {
  const response = await api.get<Funcionario[]>("/funcionarios");

  return response.data;
}

export async function updateFuncionario(
  id: string,
  data: {
    nome?: string;
    telefone?: string;
    endereco?: string;
  },
) {
  const response = await api.patch(`/funcionarios/${id}`, data);
  return response.data;
}
