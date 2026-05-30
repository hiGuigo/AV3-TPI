import { Plane, ClipboardList, Users, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/Button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const { usuario } = useAuth();

  function navigateTo(path: string) {
    navigate(path);
    onClose();
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex min-h-full w-64 flex-col border-r border-slate-200 bg-slate-900 p-4 text-white transition-transform duration-300 lg:static lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-2xl font-bold">AeroCode</h1>

          <button onClick={onClose} className="lg:hidden">
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          <Button
            onClick={() => navigateTo("/aeronaves")}
            className="flex items-center gap-3 bg-slate-800"
          >
            <Plane size={20} />
            Aeronaves
          </Button>

          {usuario?.permissao === "ADMIN" && (
            <Button
              onClick={() => navigateTo("/usuarios")}
              className="flex items-center gap-3 bg-slate-800"
            >
              <Users size={20} />
              Usuários
            </Button>
          )}

          {(usuario?.permissao === "ADMIN" ||
            usuario?.permissao === "ENGENHEIRO") && (
            <Button
              onClick={() => navigateTo("/relatorios")}
              className="flex items-center gap-3 bg-slate-800"
            >
              <ClipboardList size={20} />
              Relatórios
            </Button>
          )}
        </nav>
      </aside>
    </>
  );
}
