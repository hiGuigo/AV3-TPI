// navigate = navegação; outlet = renderizar rotas filhas
import { Navigate, Outlet } from "react-router-dom";

// hook para ter acesso ao token
import { useAuth } from "../hooks/useAuth";

export function PrivateRoute() {
  // "pegando" o token
  const { token } = useAuth();

  // se houver token, manda para a primeira rota filha
  // se não, manda de volta para o login
  return token ? <Outlet /> : <Navigate to="/" replace />;
}
