import { useNavigate } from "react-router-dom";

import { useListarItensAeronave } from "../hooks/aeronave/useListarItensAeronave";

import { Button } from "./ui/Button";

type BaseItem = {
  id: string;
};

type Props<T extends BaseItem> = {
  aeronaveId: string;
  resource: "etapas" | "pecas" | "testes";
  title: string;
  emptyMessage: string;
  loadingMessage: string;
  renderLabel: (item: T) => string;
};

export function ListarItensAeronave<T extends BaseItem>({
  aeronaveId,
  resource,
  title,
  emptyMessage,
  loadingMessage,
  renderLabel,
}: Props<T>) {
  const navigate = useNavigate();

  const { data, isLoading } = useListarItensAeronave<T>(aeronaveId, resource);

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
        <p className="animate-pulse text-slate-500">{loadingMessage}</p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
        <p className="text-slate-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      <h2 className="mb-4 text-lg font-bold text-slate-800 sm:text-xl">
        {title}
      </h2>

      <div className="flex flex-col gap-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 rounded-xl bg-slate-100 p-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="wrap-break-words font-medium text-slate-700">
              {renderLabel(item)}
            </p>

            <Button
              onClick={() => navigate(`/${resource}/${item.id}`)}
              className="bg-blue-600"
            >
              Detalhes
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
