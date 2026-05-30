import { api } from "../lib/axios";

import type { Usuario, Permissao } from "../types/funcionario/funcionario";

import type { CreateUsuarioData } from "../types/usuario/createUsuario";

export async function getUsuarios() {
  const response = await api.get<Usuario[]>("/usuarios");

  return response.data;
}

export async function getUsuarioById(id: string) {
  const response = await api.get<Usuario>(`/usuarios/${id}`);

  return response.data;
}

export async function createUsuario(data: CreateUsuarioData) {
  const response = await api.post("/funcionarios/com-usuario", data);

  return response.data;
}

export async function updateUsuario(
  id: string,
  data: {
    username?: string;
    senha?: string;
    permissao?: Permissao;
  },
) {
  const response = await api.patch(`/usuarios/${id}`, data);
  return response.data;
}
