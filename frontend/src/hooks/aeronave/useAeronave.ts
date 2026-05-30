import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type { Aeronave } from "../../types/aeronave/aeronave";

import { getAeronaveById } from "../../services/aeronave.service";

export function useAeronave() {
  const { id } = useParams();
  const navigate = useNavigate();

  const aeronaveId = id as string;

  const [aeronave, setAeronave] = useState<Aeronave | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isEtapaModalOpen, setIsEtapaModalOpen] = useState(false);
  const [isPecaModalOpen, setIsPecaModalOpen] = useState(false);
  const [isTesteModalOpen, setIsTesteModalOpen] = useState(false);

  const fetchAeronave = async () => {
    if (!aeronaveId) return;

    try {
      setIsLoading(true);

      const data = await getAeronaveById(aeronaveId);
      setAeronave(data);
    } catch (error) {
      console.error(error);
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
      } catch (error) {
        console.error(error);
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
