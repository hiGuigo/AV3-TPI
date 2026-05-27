// aqui é onde a exibição das telas é controlada, se logou com sucesso -> vai para página principal

// outlet para renderizar a rota e navigate para, bom, navegação
import { Navigate, Outlet } from "react-router-dom";

// hook useAuth para ter acesso ao token
import { useAuth } from "../hooks/useAuth";

export function PublicRoute() {
  // "pegando" o token
  const { token } = useAuth();

  // se não houver um token, exibe a página filha, que nesse caso só pode ser uma: a página de login
  // se houver de fato um token, manda para a tela de aeronaves
  return !token ? <Outlet /> : <Navigate to="/aeronaves" replace />;
}
