import { Button } from "../../components/ui/Button";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { useTeste } from "../../hooks/teste/useTeste";

export function DetalhesTestePage() {
  const {
    teste,
    isLoading,
    errorMessage,
    isFinalizado,
    aprovarTeste,
    reprovarTeste,
  } = useTeste();

  if (isLoading) return <p>Carregando teste...</p>;

  if (!teste) {
    return errorMessage ? (
      <ErrorMessage message={errorMessage} />
    ) : (
      <p>Teste não encontrado.</p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-slate-800">Detalhes do Teste</h1>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold">{teste.tipo}</h2>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-2 text-slate-700">
          <p>
            <strong>Resultado:</strong> {teste.resultado}
          </p>
          <p>
            <strong>Data:</strong>{" "}
            {new Date(teste.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {!isFinalizado && (
        <div className="flex justify-end gap-3">
          <Button className="bg-green-600" onClick={aprovarTeste}>
            Aprovar
          </Button>

          <Button className="bg-red-600" onClick={reprovarTeste}>
            Reprovar
          </Button>
        </div>
      )}
    </div>
  );
}
