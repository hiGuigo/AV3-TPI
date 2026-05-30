import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAeronaves } from "../../services/aeronave.service";
import type { Aeronave } from "../../types/aeronave/aeronave";

import { useAuth } from "../useAuth";

import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

export function useAeronaves() {
  const navigate = useNavigate();

  const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const { usuario } = useAuth();

  useEffect(() => {
    async function fetchAeronaves() {
      try {
        setIsLoading(true);

        const data = await getAeronaves();
        setAeronaves(data);

        setErrorMessage("");
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    }

    fetchAeronaves();
  }, []);

  function handleNavigateToCreate() {
    navigate("/aeronaves/cadastrar");
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
