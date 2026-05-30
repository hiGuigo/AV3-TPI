import { api } from "../lib/axios";

import type { Aeronave } from "../types/aeronave/aeronave";

import type { UpdateAeronaveData } from "../types/aeronave/updateAeronave";
import type { CreateAeronaveData } from "../types/aeronave/createAeronave";

export async function getAeronaves() {
  const response = await api.get<Aeronave[]>("/aeronaves");

  return response.data;
}

export async function getAeronaveById(id: string) {
  const response = await api.get<Aeronave>(`/aeronaves/${id}`);

  return response.data;
}

export async function createAeronave(data: CreateAeronaveData) {
  const response = await api.post<Aeronave>("/aeronaves", data);

  return response.data;
}

export async function updateAeronave(id: string, data: UpdateAeronaveData) {
  const response = await api.patch<Aeronave>(`/aeronaves/${id}`, data);

  return response.data;
}
