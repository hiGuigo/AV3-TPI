import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPecaById, updatePeca } from "../../services/peca.service";
import type { Peca } from "../../types/peca/peca";

export function usePeca() {
  const { id } = useParams();

  const [peca, setPeca] = useState<Peca | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    getPecaById(id)
      .then((data) => {
        if (!isMounted) return;
        setPeca(data);
        setErrorMessage("");
      })
      .catch((error) => {
        console.error(error);
        if (!isMounted) return;
        setErrorMessage("Erro ao carregar peça.");
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  async function avancarStatus() {
    if (!peca) return;

    let nextStatus: "EM_TRANSPORTE" | "PRONTA" | null = null;

    if (peca.status === "EM_PRODUCAO") {
      nextStatus = "EM_TRANSPORTE";
    }

    if (peca.status === "EM_TRANSPORTE") {
      nextStatus = "PRONTA";
    }

    if (!nextStatus) return;

    try {
      await updatePeca(peca.id, {
        status: nextStatus,
      });

      const updated = await getPecaById(peca.id);
      setPeca(updated);
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro ao atualizar status da peça.");
    }
  }

  return {
    peca,
    isLoading,
    errorMessage,
    avancarStatus,
  };
}
