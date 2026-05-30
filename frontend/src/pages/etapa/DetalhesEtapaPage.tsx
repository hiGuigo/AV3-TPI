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
        <h2 className="text-2xl font-semibold">{etapa.nome}</h2>
        <span className="font-semibold">{etapa.status}</span>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        {(usuario?.permissao === "ADMIN" ||
          usuario?.permissao === "ENGENHEIRO") &&
          !isConcluida && (
            <div className="mb-4 flex justify-end gap-2">
              <select
                value={funcionarioSelecionado}
                onChange={(e) => setFuncionarioSelecionado(e.target.value)}
                className="rounded border px-3 py-2"
              >
                <option value="">Selecione um funcionário</option>

                {funcionariosDisponiveis.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.nome}
                  </option>
                ))}
              </select>

              <Button className="bg-blue-600" onClick={adicionarFuncionario}>
                Adicionar Funcionário
              </Button>
            </div>
          )}

        {errorMessage && <ErrorMessage message={errorMessage} />}

        {etapa.funcionarios.map((f) => (
          <div
            key={f.id}
            className="flex justify-between rounded-lg items-center bg-gray-300 p-3 my-2"
          >
            <span>{f.nome}</span>

            {(usuario?.permissao === "ADMIN" ||
              usuario?.permissao === "ENGENHEIRO") &&
              !isConcluida && (
                <Button
                  className="bg-red-600"
                  onClick={() => removerFuncionario(f.id)}
                >
                  Remover
                </Button>
              )}
          </div>
        ))}
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
