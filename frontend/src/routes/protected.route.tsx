import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { AcessoNegadoModal } from "../components/ui/AcessoNegadoModal";

type Props = {
  allowedRoles: string[];
};

export function ProtectedRoute({ allowedRoles }: Props) {
  const { usuario } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  const hasPermission = allowedRoles.includes(usuario.permissao);

  if (!hasPermission) {
    return (
      <>
        <AcessoNegadoModal
          open={showModal || true}
          onClose={() => {
            setShowModal(true);
            navigate("/aeronaves", { replace: true });
          }}
        />
      </>
    );
  }

  return <Outlet />;
}
