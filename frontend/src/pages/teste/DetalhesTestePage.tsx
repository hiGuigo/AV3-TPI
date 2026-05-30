import { Button } from "../../components/ui/Button";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { useTeste } from "../../hooks/teste/useTeste";
import { useAuth } from "../../hooks/useAuth";

export function DetalhesTestePage() {
  const {
    teste,
    isLoading,
    errorMessage,
    isFinalizado,
    aprovarTeste,
    reprovarTeste,
  } = useTeste();

  const { usuario } = useAuth();

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
        <h2 className="text-2xl">
          <span className="font-bold text-slate-900">Tipo: </span>
          <span className="font-medium text-slate-700">{teste.tipo}</span>
        </h2>

        <div className="flex flex-col mt-2">
          <p>
            <span className="text-slate-700 font-bold">Resultado: </span>
            <span
              className={`font-bold
            ${
              teste.resultado === "PENDENTE"
                ? " text-yellow-600"
                : teste.resultado === "REPROVADO"
                  ? " text-red-600"
                  : " text-green-600"
            }
          `}
            >
              {teste.resultado}
            </span>
          </p>

          <p>
            <strong className="text-slate-600">Data:</strong>{" "}
            <span className="text-slate-800">
              {new Date(teste.createdAt).toLocaleDateString("pt-BR")}
            </span>
          </p>
        </div>
      </div>

      {(usuario?.permissao === "ADMIN" ||
        usuario?.permissao === "ENGENHEIRO") &&
        !isFinalizado && (
          <div className="flex justify-end gap-3">
            <Button className="bg-blue-600" onClick={aprovarTeste}>
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
