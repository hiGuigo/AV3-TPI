// esse é o layout base da aplicação: menu lateral + header + conteúdo dinâmico

// o responsável pelo conteúdo dinâmico é o outlet
// ele é um placeholder onde o router vai renderizar a rota filha ativa
// em app.routes.tsx é definido <Route element={<MainLayout />}></Route>
// e dentro disso, as rotas filhas

import { Outlet } from "react-router-dom";

// componentes estruturais
import { Sidebar } from "../components/layouts/Sidebar";
import { Header } from "../components/layouts/Header";

export function MainLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
