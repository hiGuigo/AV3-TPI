import { Button } from "../../components/ui/Button";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { ItemList } from "../../components/ui/ItemList";

import { useAeronaves } from "../../hooks/aeronave/useAeronaves";

export function AeronavesPage() {
  const { aeronaves, usuario, isLoading, navigate, errorMessage } =
    useAeronaves();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold text-slate-800">Aeronaves</h1>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        {errorMessage && <ErrorMessage message={errorMessage} />}

        {usuario?.permissao === "ADMIN" && (
          <Button
            onClick={() => navigate("/aeronaves/cadastrar")}
            className="bg-blue-600"
          >
            Cadastrar Aeronave
          </Button>
        )}

        {isLoading ? (
          <p>Carregando aeronaves...</p>
        ) : (
          <ItemList
            items={aeronaves}
            detailsBaseRoute="/aeronaves"
            editBaseRoute="/aeronaves/editar"
            showEdit={true}
          />
        )}
      </div>
    </div>
  );
}
