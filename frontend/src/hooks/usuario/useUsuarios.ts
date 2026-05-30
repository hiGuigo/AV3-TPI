import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getUsuarios } from "../../services/usuario.service";

import type { Usuarios } from "../../types/usuario/usuarios";

export function useUsuarios() {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState<Usuarios[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        setIsLoading(true);

        const data = await getUsuarios();

        setUsuarios(data);
      } catch (error) {
        console.error(error);

        setErrorMessage("Erro ao carregar usuários.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsuarios();
  }, []);

  function handleNavigateToCreate() {
    navigate("/usuarios/cadastrar");
  }

  return {
    usuarios,
    isLoading,
    errorMessage,
    handleNavigateToCreate,
  };
}
