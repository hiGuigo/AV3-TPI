import { Button } from "../../components/ui/Button";
import { ItemList } from "../../components/ui/ItemList";

import { useUsuarios } from "../../hooks/usuario/useUsuarios";

export function UsuariosPage() {
  const { usuarios, isLoading, errorMessage, handleNavigateToCreate } =
    useUsuarios();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold text-slate-800">Usuários</h1>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <Button
          onClick={handleNavigateToCreate}
          className="bg-blue-600"
        >
          Cadastrar Usuário
        </Button>

        {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}

        {isLoading ? (
          <p>Carregando usuários...</p>
        ) : (
          <ItemList
            items={usuarios}
            detailsBaseRoute="/usuarios"
            editBaseRoute="/usuarios/editar"
            showEdit={true}
          />
        )}
      </div>
    </div>
  );
}
