// esse é o centro das rotas, o responsável por organizar rotas privadas e públicas

// BrowserRouter permite o roteamento das rotas na url do navegador (/login, /aeronaves, ...)
// Routes -> todas as rotas da aplicação
// Route -> cada rota
import { BrowserRouter, Route, Routes } from "react-router-dom";

// página de login
import { LoginPage } from "../pages/LoginPage";

// páginas de listagem
import { AeronavesPage } from "../pages/aeronave/AeronavesPage";

// páginas de cadastro
import { CadastrarAeronavePage } from "../pages/aeronave/CadastrarAeronavePage";

// páginas de detalhes
import { DetalhesAeronavePage } from "../pages/aeronave/DetalhesAeronavePage";

// páginas de edição
import { EditarAeronavePage } from "../pages/aeronave/EditarAeronavePage";

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
          {/* login */}
          <Route path="/" element={<LoginPage />} />
        </Route>

        {/* rotas privadas (dentro do sistema, depois de fazer login) */}
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            {/* listagem */}
            <Route path="/aeronaves" element={<AeronavesPage />} />

            {/* cadastro */}
            <Route
              path="/aeronaves/cadastrar"
              element={<CadastrarAeronavePage />}
            />

            {/* detalhes */}
            <Route path="/aeronaves/:id" element={<DetalhesAeronavePage />} />

            {/* edição */}
            <Route
              path="/aeronaves/editar/:id"
              element={<EditarAeronavePage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
