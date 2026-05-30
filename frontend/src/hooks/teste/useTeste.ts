import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getTesteById, updateTeste } from "../../services/teste.service";
import type { Teste } from "../../types/teste/teste";

export function useTeste() {
  const { id } = useParams();

  const [teste, setTeste] = useState<Teste | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    getTesteById(id)
      .then((data) => {
        if (!isMounted) return;
        setTeste(data);
        setErrorMessage("");
      })
      .catch(() => {
        if (!isMounted) return;
        setErrorMessage("Erro ao carregar teste.");
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const isFinalizado =
    teste?.resultado === "APROVADO" || teste?.resultado === "REPROVADO";

  async function aprovarTeste() {
    if (!teste) return;

    try {
      await updateTeste(teste.id, { resultado: "APROVADO" });

      const updated = await getTesteById(teste.id);
      setTeste(updated);
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro ao aprovar teste.");
    }
  }

  async function reprovarTeste() {
    if (!teste) return;

    try {
      await updateTeste(teste.id, { resultado: "REPROVADO" });

      const updated = await getTesteById(teste.id);
      setTeste(updated);
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro ao reprovar teste.");
    }
  }

  return {
    teste,
    isLoading,
    errorMessage,
    isFinalizado,
    aprovarTeste,
    reprovarTeste,
  };
}
