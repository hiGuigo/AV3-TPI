import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type { Aeronave } from "../../types/aeronave/aeronave";

import { getAeronaveById } from "../../services/aeronave.service";

import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

export function useAeronave() {
  const { id } = useParams();
  const navigate = useNavigate();

  const aeronaveId = id as string;

  const [aeronave, setAeronave] = useState<Aeronave | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [isEtapaModalOpen, setIsEtapaModalOpen] = useState(false);
  const [isPecaModalOpen, setIsPecaModalOpen] = useState(false);
  const [isTesteModalOpen, setIsTesteModalOpen] = useState(false);

  const fetchAeronave = async () => {
    if (!aeronaveId) return;

    try {
      setIsLoading(true);

      const data = await getAeronaveById(aeronaveId);
      setAeronave(data);

      setErrorMessage("");
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isActive = true;

    async function load() {
      try {
        const data = await getAeronaveById(aeronaveId);

        if (isActive) {
          setAeronave(data);
        }

        setErrorMessage("");
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error));
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      isActive = false;
    };
  }, [aeronaveId]);

  function goToRelatorio() {
    if (!aeronave) return;

    navigate("/relatorios/cadastrar", {
      state: { aeronaveId: aeronave.id },
    });
  }

  function openEtapaModal() {
    setIsEtapaModalOpen(true);
  }

  function openPecaModal() {
    setIsPecaModalOpen(true);
  }

  function openTesteModal() {
    setIsTesteModalOpen(true);
  }

  async function refresh() {
    await fetchAeronave();
  }

  function handleSuccess(modal: "etapa" | "peca" | "teste") {
    if (modal === "etapa") setIsEtapaModalOpen(false);
    if (modal === "peca") setIsPecaModalOpen(false);
    if (modal === "teste") setIsTesteModalOpen(false);

    refresh();
  }

  return {
    aeronave,
    isLoading,
    errorMessage,
    aeronaveId,

    isEtapaModalOpen,
    isPecaModalOpen,
    isTesteModalOpen,

    openEtapaModal,
    openPecaModal,
    openTesteModal,

    goToRelatorio,
    handleSuccess,
  };
}
