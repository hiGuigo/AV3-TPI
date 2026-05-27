// importação do hook para a utilização da função signOut
import { useAuth } from "../../hooks/useAuth";

// componente de botão genérico
import { Button } from "../ui/Button";

export function Header() {
  // "pegando" a função do hook
  const { signOut } = useAuth();

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      <h2 className="text-2xl font-semibold text-slate-800">
        Sistema Aerocode - Gestão de Produção de Aeronaves
      </h2>

      <Button onClick={signOut} className="bg-red-500 hover:bg-red-600 px-4 py-2">
        Sair
      </Button>
    </header>
  );
}
