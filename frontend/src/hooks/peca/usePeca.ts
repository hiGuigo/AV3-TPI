import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";

import { getPecaById, updatePeca } from "../../services/peca.service";

import type { Peca, StatusPeca } from "../../types/peca/peca";

const proximoStatus: Record<StatusPeca, StatusPeca | null> = {
  EM_PRODUCAO: "EM_TRANSPORTE",
  EM_TRANSPORTE: "PRONTA",
  PRONTA: null,
};

export function usePeca() {
  const { id } = useParams();

  const [peca, setPeca] = useState<Peca | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    let active = true;

    async function load() {
      try {
        setIsLoading(true);

        const data = await getPecaById(id);

        if (!active) return;

        setPeca(data);
        setErrorMessage("");
      } catch (error) {
        console.error(error);

        if (!active) return;

        setErrorMessage("Erro ao carregar peça.");
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [id]);

  const isFinal = useMemo(() => {
    return peca?.status === "PRONTA";
  }, [peca]);

  async function avancarStatus() {
    if (!peca) return;

    const nextStatus = proximoStatus[peca.status as StatusPeca];

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
    isFinal,
  };
}
