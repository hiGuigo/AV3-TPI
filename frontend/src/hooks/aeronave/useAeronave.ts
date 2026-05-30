import { useEffect, useState } from "react";

import { getAeronaveById } from "../../services/aeronave.service";

import type { Aeronave } from "../../types/aeronave/aeronave";

export function useAeronave(id: string) {
  const [aeronave, setAeronave] = useState<Aeronave | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAeronave() {
      try {
        const data = await getAeronaveById(id);

        setAeronave(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAeronave();
  }, [id]);

  return {
    aeronave,
    isLoading,
  };
}
