import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getUsuarioById } from "../../services/usuario.service";
import type { Usuario } from "../../types/funcionario/funcionario";

export function useUsuario() {
  const { id } = useParams();

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    let mounted = true;

    getUsuarioById(id)
      .then((data) => {
        if (!mounted) return;
        setUsuario(data);
      })
      .catch((error) => {
        console.log(error)
        if (!mounted) return;
        setErrorMessage("Erro ao carregar usuário.");
      })
      .finally(() => {
        if (!mounted) return;
        setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  return {
    usuario,
    isLoading,
    errorMessage,
  };
}
