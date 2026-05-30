import { useNavigate } from "react-router-dom";

import { Button } from "../../components/ui/Button";

import { ItemList } from "../../components/ui/ItemList";

import { useAeronaves } from "../../hooks/aeronave/useAeronaves";

export function AeronavesPage() {
  const { aeronaves, isLoading } = useAeronaves();

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold text-slate-800">Aeronaves</h1>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <Button
          onClick={() => navigate("/aeronaves/cadastrar")}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2"
        >
          Cadastrar Aeronave
        </Button>

        {isLoading ? (
          <p>Carregando aeronaves...</p>
        ) : (
          <ItemList
            items={aeronaves}
            detailsBaseRoute="/aeronaves"
            editBaseRoute="/aeronaves/editar"
          />
        )}
      </div>
    </div>
  );
}
