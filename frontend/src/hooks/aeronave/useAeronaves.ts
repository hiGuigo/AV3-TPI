import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getAeronaves } from "../../services/aeronave.service";

import type { Aeronave } from "../../types/aeronave/aeronave";
import { useAuth } from "../useAuth";

export function useAeronaves() {
  const navigate = useNavigate();

  const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);

  const { usuario } = useAuth();

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
    usuario,
    isLoading,
    errorMessage,
    handleNavigateToCreate,
    navigate,
  };
}
