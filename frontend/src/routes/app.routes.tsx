// esse é o centro das rotas, o responsável por organizar rotas privadas e públicas

// BrowserRouter permite o roteamento das rotas na url do navegador (/login, /aeronaves, ...)
// Routes -> todas as rotas da aplicação
// Route -> cada rota
import { BrowserRouter, Route, Routes } from "react-router-dom";

// páginas disponibilizadas
import { LoginPage } from "../pages/LoginPage";
import { AeronavePage } from "../pages/AeronavesPage";

// tratamento das rotas
import { PrivateRoute } from "./private.route";
import { PublicRoute } from "./public.route";

// layout estrutural
import { MainLayout } from "../layouts/MainLayout";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* rotas públicas (fora do sistema) */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LoginPage />} />
        </Route>

        {/* rotas privadas (dentro do sistema, depois de fazer login) */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/aeronaves" element={<AeronavePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
