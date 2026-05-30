// esse é o centro das rotas, o responsável por organizar rotas privadas e públicas

// BrowserRouter permite o roteamento das rotas na url do navegador (/login, /aeronaves, ...)
// Routes -> todas as rotas da aplicação
// Route -> cada rota
import { BrowserRouter, Route, Routes } from "react-router-dom";

// página de login
import { LoginPage } from "../pages/LoginPage";

// páginas de listagem
import { AeronavesPage } from "../pages/aeronave/AeronavesPage";
import { UsuariosPage } from "../pages/usuario/UsuariosPage";
import { RelatoriosPage } from "../pages/relatorio/RelatoriosPages";

// páginas de cadastro
import { CadastrarAeronavePage } from "../pages/aeronave/CadastrarAeronavePage";
import { CadastrarUsuarioPage } from "../pages/usuario/CadastrarUsuarioPage";
import { CadastrarRelatorioPage } from "../pages/relatorio/CadastrarRelatorioPage";

// páginas de detalhes
import { DetalhesAeronavePage } from "../pages/aeronave/DetalhesAeronavePage";
import { DetalhesEtapaPage } from "../pages/etapa/DetalhesEtapaPage";
import { DetalhesPecaPage } from "../pages/peca/DetalhesPecaPage";
import { DetalhesTestePage } from "../pages/teste/DetalhesTestePage";
import { DetalhesRelatorioPage } from "../pages/relatorio/DetalhesRelatorioPage";
import { DetalhesUsuarioPage } from "../pages/usuario/DetalhesUsuarioPage";

// páginas de edição
import { EditarAeronavePage } from "../pages/aeronave/EditarAeronavePage";
import { EditarUsuarioPage } from "../pages/usuario/EditarUsuarioPage";

// tratamento das rotas
import { PrivateRoute } from "./private.route";
import { PublicRoute } from "./public.route";
import { ProtectedRoute } from "./protected.route";

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
            {/* rotas nível admin */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/usuarios" element={<UsuariosPage />} />
              <Route
                path="/aeronaves/cadastrar"
                element={<CadastrarAeronavePage />}
              />
              <Route
                path="/usuarios/cadastrar"
                element={<CadastrarUsuarioPage />}
              />
              <Route path="/usuarios/:id" element={<DetalhesUsuarioPage />} />
              <Route
                path="/aeronaves/editar/:id"
                element={<EditarAeronavePage />}
              />
              <Route
                path="/usuarios/editar/:id"
                element={<EditarUsuarioPage />}
              />
            </Route>
            {/* fim rotas nível admin */}

            {/* rotas nível engenheiro */}
            <Route
              element={
                <ProtectedRoute allowedRoles={["ADMIN", "ENGENHEIRO"]} />
              }
            >
              <Route
                path="/relatorios/cadastrar"
                element={<CadastrarRelatorioPage />}
              />
            </Route>
            {/* fim rotas nível engenheiro */}

            {/* rotas nível operador */}
            <Route
              element={
                <ProtectedRoute
                  allowedRoles={["ADMIN", "ENGENHEIRO", "OPERADOR"]}
                />
              }
            >
              <Route path="/aeronaves" element={<AeronavesPage />} />
              <Route path="/relatorios" element={<RelatoriosPage />} />
              <Route path="/aeronaves/:id" element={<DetalhesAeronavePage />} />
              <Route path="/etapas/:id" element={<DetalhesEtapaPage />} />
              <Route path="/pecas/:id" element={<DetalhesPecaPage />} />
              <Route path="/testes/:id" element={<DetalhesTestePage />} />
              <Route
                path="/relatorios/:id"
                element={<DetalhesRelatorioPage />}
              />
            </Route>
            {/* fim rotas nível operador */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
