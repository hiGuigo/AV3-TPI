import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import axios from "axios";

type ResourceKey = "etapas" | "pecas" | "testes";

type BaseItem = {
  id: string;
};

type AeronaveResponse<T> = {
  [K in ResourceKey]: T[];
};

export function useListarItensAeronave<T extends BaseItem>(
  aeronaveId: string,
  resource: ResourceKey,
) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await api.get<AeronaveResponse<T>>(
          `/aeronaves/${aeronaveId}`,
        );

        setData(response.data[resource]);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(
            error.response?.data?.erro || "Erro ao carregar dados.",
          );
        } else {
          setErrorMessage("Erro inesperado.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (aeronaveId) load();
  }, [aeronaveId, resource]);

  return { data, isLoading, errorMessage };
}
