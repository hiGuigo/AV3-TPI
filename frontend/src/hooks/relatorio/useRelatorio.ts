import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getRelatorioById } from "../../services/relatorio.service";
import type { Relatorio } from "../../types/relatorio/relatorios";

export function useRelatorio() {
  const { id } = useParams();

  const [relatorio, setRelatorio] = useState<Relatorio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    getRelatorioById(id)
      .then((data) => {
        if (!isMounted) return;
        setRelatorio(data);
        setErrorMessage("");
      })
      .catch((error) => {
        console.error(error);
        if (!isMounted) return;
        setErrorMessage("Erro ao carregar relatório.");
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return {
    relatorio,
    isLoading,
    errorMessage,
  };
}
