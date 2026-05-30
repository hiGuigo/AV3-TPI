import { Button } from "../../components/ui/Button";
import { ErrorMessage } from "../../components/ui/ErrorMessage";

import { usePeca } from "../../hooks/peca/usePeca";
import { useAuth } from "../../hooks/useAuth";

export function DetalhesPecaPage() {
  const { peca, isLoading, errorMessage, avancarStatus, isFinal } = usePeca();

  const { usuario } = useAuth();

  if (isLoading) return <p>Carregando peça...</p>;

  if (!peca) {
    return errorMessage ? (
      <ErrorMessage message={errorMessage} />
    ) : (
      <p>Peça não encontrada.</p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-slate-800">Detalhes da Peça</h1>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl mb-3">
          <span className="font-bold text-slate-900">Nome: </span>
          <span className="font-medium text-slate-700">{peca.nome}</span>
        </h2>

        <p>
          <span className="text-slate-700 font-bold">Status: </span>
          <span
            className={`font-bold
            ${
              peca.status === "EM_PRODUCAO"
                ? " text-yellow-600"
                : peca.status === "EM_TRANSPORTE"
                  ? " text-blue-600"
                  : " text-green-600"
            }
          `}
          >
            {peca.status}
          </span>
        </p>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm space-y-2">
        <p>
          <strong className="text-slate-600">Tipo:</strong>{" "}
          <span className="text-slate-800">{peca.tipo}</span>
        </p>

        <p>
          <strong className="text-slate-600">Fornecedor:</strong>{" "}
          <span className="text-slate-800">{peca.fornecedor}</span>
        </p>
      </div>

      {(usuario?.permissao === "ADMIN" ||
        usuario?.permissao === "ENGENHEIRO") &&
        !isFinal && (
          <div className="flex justify-end">
            <Button className="bg-blue-600" onClick={avancarStatus}>
              Avançar status
            </Button>
          </div>
        )}
    </div>
  );
}
