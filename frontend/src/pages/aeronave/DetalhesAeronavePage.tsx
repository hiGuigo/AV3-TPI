import { Button } from "../../components/ui/Button";
import { ErrorMessage } from "../../components/ui/ErrorMessage";

import { ListarItensAeronave } from "../../components/ListarItensAeronave";

import type { Etapa, Peca, Teste } from "../../types/aeronave/aeronave";

import { CadastrarEtapaModal } from "../../components/CadastrarEtapaModal";
import { CadastrarPecaModal } from "../../components/CadastrarPecaModal";
import { CadastrarTesteModal } from "../../components/CadastrarTesteModal";

import { useAeronave } from "../../hooks/aeronave/useAeronave";
import { useAuth } from "../../hooks/useAuth";

export function DetalhesAeronavePage() {
  const { usuario } = useAuth();

  const {
    aeronave,
    isLoading,
    aeronaveId,
    errorMessage,

    isEtapaModalOpen,
    isPecaModalOpen,
    isTesteModalOpen,

    openEtapaModal,
    openPecaModal,
    openTesteModal,

    goToRelatorio,
    handleSuccess,
  } = useAeronave();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="animate-pulse text-slate-500">Carregando aeronave...</p>
      </div>
    );
  }

  if (!aeronave) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="font-medium text-red-600">Aeronave não encontrada.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
        Detalhes Aeronave
      </h1>

      {errorMessage && <ErrorMessage message={errorMessage} />}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-2xl mb-3">
          <span className="font-bold text-slate-900">Modelo: </span>
          <span className="font-medium text-slate-700">{aeronave.modelo}</span>
        </h2>

        <div className="space-y-2 text-slate-700">
          <p>
            <span className="font-medium text-slate-500">Código:</span>{" "}
            <span className="text-slate-800">{aeronave.codigo}</span>
          </p>
          <p>
            <span className="font-medium text-slate-500">Capacidade:</span>{" "}
            <span className="text-slate-800">{aeronave.capacidade}</span>
          </p>
          <p>
            <span className="font-medium text-slate-500">Alcance:</span>{" "}
            <span className="text-slate-800">{aeronave.alcance}</span>
          </p>
          <p>
            <span className="font-medium text-slate-500">Tipo:</span>{" "}
            <span className="text-slate-800">{aeronave.tipo}</span>
          </p>
        </div>
      </div>

      {(usuario?.permissao === "ADMIN" ||
        usuario?.permissao === "ENGENHEIRO") && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
            <Button onClick={goToRelatorio} className="bg-blue-600 w-full">
              Gerar relatório
            </Button>

            {usuario?.permissao === "ADMIN" && (
              <Button onClick={openEtapaModal} className="bg-blue-600 w-full">
                Adicionar Etapa
              </Button>
            )}

            <Button onClick={openPecaModal} className="bg-blue-600 w-full">
              Adicionar Peça
            </Button>

            <Button onClick={openTesteModal} className="bg-blue-600 w-full">
              Adicionar Teste
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ListarItensAeronave<Etapa>
          aeronaveId={aeronave.id}
          resource="etapas"
          title="Etapas"
          emptyMessage="Nenhuma etapa cadastrada."
          loadingMessage="Carregando etapas..."
          renderLabel={(etapa) => etapa.nome}
        />

        <ListarItensAeronave<Peca>
          aeronaveId={aeronave.id}
          resource="pecas"
          title="Peças"
          emptyMessage="Nenhuma peça cadastrada."
          loadingMessage="Carregando peças..."
          renderLabel={(peca) => peca.nome}
        />

        <ListarItensAeronave<Teste>
          aeronaveId={aeronave.id}
          resource="testes"
          title="Testes"
          emptyMessage="Nenhum teste cadastrada."
          loadingMessage="Carregando testes..."
          renderLabel={(teste) => teste.tipo}
        />
      </div>

      <CadastrarEtapaModal
        isOpen={isEtapaModalOpen}
        aeronaveId={aeronaveId}
        onClose={() => handleSuccess("etapa")}
        onSuccess={() => handleSuccess("etapa")}
      />

      <CadastrarPecaModal
        isOpen={isPecaModalOpen}
        aeronaveId={aeronaveId}
        onClose={() => handleSuccess("peca")}
        onSuccess={() => handleSuccess("peca")}
      />

      <CadastrarTesteModal
        isOpen={isTesteModalOpen}
        aeronaveId={aeronaveId}
        onClose={() => handleSuccess("teste")}
        onSuccess={() => handleSuccess("teste")}
      />
    </div>
  );
}
