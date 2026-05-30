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
        <h2 className="text-2xl font-semibold">{peca.nome}</h2>

        <p>
          <strong>Status:</strong> {peca.status}
        </p>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <p>
          <strong>Tipo:</strong> {peca.tipo}
        </p>
        <p>
          <strong>Fornecedor:</strong> {peca.fornecedor}
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
