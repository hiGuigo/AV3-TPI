import axios from "axios";

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.erro || "Erro inesperado.";
  }

  return "Erro inesperado.";
}
