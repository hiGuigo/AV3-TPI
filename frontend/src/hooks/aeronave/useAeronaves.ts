import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getAeronaves } from "../../services/aeronave.service";

import type { Aeronaves } from "../../types/aeronave/aeronaves";

export function useAeronaves() {
  const navigate = useNavigate();

  const [aeronaves, setAeronaves] = useState<Aeronaves[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchAeronaves() {
      try {
        setIsLoading(true);

        const data = await getAeronaves();

        setAeronaves(data);
      } catch (error) {
        console.error(error);

        setErrorMessage("Erro ao carregar aeronaves.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchAeronaves();
  }, []);

  function handleNavigateToCreate() {
    navigate("/cadastrarAeronave");
  }

  return {
    aeronaves,
    isLoading,
    errorMessage,
    handleNavigateToCreate,
  };
}
