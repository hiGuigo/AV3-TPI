import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getRelatorios } from "../../services/relatorio.service";
import type { Relatorio } from "../../types/relatorio/relatorios";

export function useRelatorios() {
  const navigate = useNavigate();

  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchRelatorios() {
      try {
        setIsLoading(true);

        const data = await getRelatorios();
        setRelatorios(data);
      } catch (error) {
        console.error(error);
        setErrorMessage("Erro ao carregar relatórios.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchRelatorios();
  }, []);

  function handleNavigateToCreate() {
    navigate("/relatorios/novo");
  }

  return {
    relatorios,
    isLoading,
    errorMessage,
    handleNavigateToCreate,
  };
}
