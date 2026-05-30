import { Menu } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

import { Button } from "../ui/Button";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { signOut } = useAuth();

  return (
    <header className="flex h-auto min-h-20 items-center justify-between border-b border-slate-200 bg-white px-4 py-4 lg:px-8">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden">
          <Menu size={28} />
        </button>

        <h2 className="text-lg font-semibold text-slate-800 sm:text-xl lg:text-2xl">
          Sistema Aerocode
        </h2>
      </div>

      <Button
        onClick={signOut}
        className="bg-red-500"
      >
        Sair
      </Button>
    </header>
  );
}
