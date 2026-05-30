import { api } from "../lib/axios";

import type { Usuarios } from "../types/usuario/usuarios";

import type { CreateUsuarioData } from "../types/usuario/createUsuario";

export async function createUsuario(data: CreateUsuarioData) {
  const response = await api.post("/funcionarios/com-usuario", data);

  return response.data;
}

export async function getUsuarios() {
  const response = await api.get<Usuarios[]>("/funcionarios");

  return response.data;
}
