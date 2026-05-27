import { Plane, ClipboardList, Users } from "lucide-react";

// para o usuário logado
import { useAuth } from "../../hooks/useAuth";

export function Sidebar() {
  // "pegando" o usuário logado no hook
  const { usuario } = useAuth();

  // aqui os itens terão uma lógica simples para verificar a permissão do usuário
  // caso a permissão do usuário seja X, somente as páginas Y serão exibidas
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-slate-900 p-4 text-white">
      <h1 className="mb-10 text-2xl font-bold">AeroCode</h1>

      <nav className="flex flex-col gap-2">
        {usuario?.permissao === "ADMIN" && (
          <button className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-slate-800">
            <Plane size={20} />
            Aeronaves
          </button>
        )}

        {usuario?.permissao === "ADMIN" && (
          <button className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-slate-800">
            <ClipboardList size={20} />
            Relatórios
          </button>
        )}

        {usuario?.permissao === "ADMIN" && (
          <button className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-slate-800">
            <Users size={20} />
            Usuários
          </button>
        )}
      </nav>
    </aside>
  );
}
