import { Button } from "../../components/ui/Button";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { useCadastrarRelatorio } from "../../hooks/relatorio/useCadastrarRelatorio";

export function CadastrarRelatorioPage() {
  const {
    cliente,
    setCliente,
    dataEntrega,
    setDataEntrega,
    texto,
    setTexto,
    isLoading,
    errorMessage,
    handleSubmit,
  } = useCadastrarRelatorio();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-slate-800">Gerar Relatório</h1>

      <div className="rounded-2xl bg-white p-8 shadow-sm flex flex-col gap-4">
        {errorMessage && <ErrorMessage message={errorMessage} />}

        <input
          className="border rounded px-3 py-2"
          placeholder="Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />

        <input
          type="date"
          className="border rounded px-3 py-2"
          value={dataEntrega}
          onChange={(e) => setDataEntrega(e.target.value)}
        />

        <textarea
          className="border rounded px-3 py-2 min-h-35"
          placeholder="Texto do relatório"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />

        <div className="flex justify-end">
          <Button
            className="bg-blue-600"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Gerando..." : "Gerar Relatório"}
          </Button>
        </div>
      </div>
    </div>
  );
}
