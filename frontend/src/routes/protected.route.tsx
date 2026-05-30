import { Outlet } from "react-router-dom";

import { AcessoNegadoModal } from "../components/ui/AcessoNegadoModal";
import { useProtectedRoute } from "../hooks/useProtectedRoute";

type Props = {
  allowedRoles: string[];
};

export function ProtectedRoute({ allowedRoles }: Props) {
  const { showModal, navigate, temPermissao } = useProtectedRoute({
    allowedRoles,
  });

  if (!temPermissao) {
    return (
      <AcessoNegadoModal
        open={showModal}
        onClose={() => {
          navigate("/aeronaves", { replace: true });
        }}
      />
    );
  }

  return <Outlet />;
}
