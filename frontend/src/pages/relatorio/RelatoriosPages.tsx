import { ItemList } from "../../components/ui/ItemList";
import { useRelatorios } from "../../hooks/relatorio/useRelatorios";

export function RelatoriosPage() {
  const { relatorios, isLoading } = useRelatorios();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold text-slate-800">Relatórios</h1>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        {isLoading ? (
          <p>Carregando relatórios...</p>
        ) : (
          <ItemList
            items={relatorios}
            detailsBaseRoute="/relatorios"
            showEdit={false}
          />
        )}
      </div>
    </div>
  );
}