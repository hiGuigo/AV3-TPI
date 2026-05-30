// esse é o layout base da aplicação: menu lateral + header + conteúdo dinâmico

// o responsável pelo conteúdo dinâmico é o outlet
// ele é um placeholder onde o router vai renderizar a rota filha ativa
// em app.routes.tsx é definido <Route element={<MainLayout />}></Route>
// e dentro disso, as rotas filhas

import { Outlet } from "react-router-dom";
import { useState } from "react";

// componentes estruturais
import { Sidebar } from "../components/layouts/Sidebar";
import { Header } from "../components/layouts/Header";

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="h-[calc(100vh-80px)] overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
