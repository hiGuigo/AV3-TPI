import { useMemo } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "./useAuth";

type Props = {
  allowedRoles: string[];
};

export function useProtectedRoute({ allowedRoles }: Props) {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const temPermissao = useMemo(() => {
    return !!usuario && allowedRoles.includes(usuario.permissao);
  }, [usuario, allowedRoles]);

  const showModal = !!usuario && !temPermissao;

  return {
    usuario,
    temPermissao,
    showModal,
    navigate,
  };
}
