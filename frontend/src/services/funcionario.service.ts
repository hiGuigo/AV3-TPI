import { api } from "../lib/axios";

import type { Funcionarios } from "../types/funcionario/funcionarios";

export async function getFuncionarios() {
  const response = await api.get<Funcionarios[]>("/funcionarios");

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
