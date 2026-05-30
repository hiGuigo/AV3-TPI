import { Button } from "../../components/ui/Button";
import { ErrorMessage } from "../../components/ui/ErrorMessage";

import { useEtapa } from "../../hooks/etapa/useEtapa";
import { useAuth } from "../../hooks/useAuth";

export function DetalhesEtapaPage() {
  const {
    etapa,
    isLoading,
    errorMessage,
    funcionarioSelecionado,
    setFuncionarioSelecionado,
    isConcluida,
    funcionariosDisponiveis,
    iniciarEtapa,
    finalizarEtapa,
    adicionarFuncionario,
    removerFuncionario,
  } = useEtapa();

  const { usuario } = useAuth();

  if (isLoading) return <p>Carregando etapa...</p>;

  if (!etapa) {
    return errorMessage ? (
      <ErrorMessage message={errorMessage} />
    ) : (
      <p>Etapa não encontrada.</p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-slate-800">Detalhes da Etapa</h1>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl mb-3">
          <span className="font-bold text-slate-900">Nome: </span>
          <span className="font-medium text-slate-700">{etapa.nome}</span>
        </h2>

        <div className="flex flex-col mt-2">
          <p>
            <span className="text-slate-700 font-bold">Status: </span>
            <span
              className={`font-bold
            ${
              etapa.status === "PENDENTE"
                ? " text-yellow-600"
                : etapa.status === "ANDAMENTO"
                  ? " text-blue-600"
                  : " text-green-600"
            }
          `}
            >
              {etapa.status}
            </span>
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Funcionários
        </h2>

        {(usuario?.permissao === "ADMIN" ||
          usuario?.permissao === "ENGENHEIRO") &&
          !isConcluida && (
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
              <select
                value={funcionarioSelecionado}
                onChange={(e) => setFuncionarioSelecionado(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione um funcionário</option>

                {funcionariosDisponiveis.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.nome}
                  </option>
                ))}
              </select>

              <Button onClick={adicionarFuncionario} className="bg-blue-600">
                Adicionar Funcionário
              </Button>
            </div>
          )}

        {errorMessage && (
          <div className="mb-4">
            <ErrorMessage message={errorMessage} />
          </div>
        )}

        <div className="space-y-3">
          {etapa.funcionarios.map((f) => (
            <div
              key={f.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <span className="font-medium text-slate-800">{f.nome}</span>

              {(usuario?.permissao === "ADMIN" ||
                usuario?.permissao === "ENGENHEIRO") &&
                !isConcluida && (
                  <Button
                    className="bg-red-600 text-sm"
                    onClick={() => removerFuncionario(f.id)}
                  >
                    Remover
                  </Button>
                )}
            </div>
          ))}
        </div>
      </div>

      {(usuario?.permissao === "ADMIN" ||
        usuario?.permissao === "ENGENHEIRO") && (
        <div className="flex justify-end gap-4">
          {etapa.status === "PENDENTE" && (
            <Button onClick={iniciarEtapa} className="bg-blue-600">
              Iniciar
            </Button>
          )}

          {etapa.status === "ANDAMENTO" && (
            <Button onClick={finalizarEtapa} className="bg-blue-600">
              Finalizar
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
