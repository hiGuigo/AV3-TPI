import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

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

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);

        const response = await api.get<AeronaveResponse<T>>(
          `/aeronaves/${aeronaveId}`,
        );

        setData(response.data[resource]);
      } finally {
        setIsLoading(false);
      }
    }

    if (aeronaveId) load();
  }, [aeronaveId, resource]);

  return { data, isLoading };
}
