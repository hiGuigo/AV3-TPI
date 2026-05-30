import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import { Button } from "../../components/ui/Button";

import { useAeronave } from "../../hooks/aeronave/useAeronave";

import { ListarItensAeronave } from "../../components/ListarItensAeronave";

import type { Etapa, Peca, Teste } from "../../types/aeronave/aeronave";

import { CadastrarEtapaModal } from "../../components/CadastrarEtapaModal";
import { CadastrarPecaModal } from "../../components/CadastrarPecaModal";
import { CadastrarTesteModal } from "../../components/CadastrarTesteModal";
import { useAuth } from "../../hooks/useAuth";

export function DetalhesAeronavePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();

  const { aeronave, isLoading } = useAeronave(id as string);

  const [isEtapaModalOpen, setIsEtapaModalOpen] = useState(false);
  const [isPecaModalOpen, setIsPecaModalOpen] = useState(false);
  const [isTesteModalOpen, setIsTesteModalOpen] = useState(false);

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

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              {aeronave.modelo}
            </h2>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Código: {aeronave.codigo}
            </p>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Capaciadade: {aeronave.capacidade}
            </p>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Alcance: {aeronave.alcance}
            </p>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Tipo: {aeronave.tipo}
            </p>
          </div>
        </div>
      </div>

      {(usuario?.permissao === "ADMIN" ||
        usuario?.permissao === "ENGENHEIRO") && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid w-full gap-3 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
            <Button
              onClick={() =>
                navigate("/relatorios/cadastrar", {
                  state: { aeronaveId: aeronave.id },
                })
              }
              className="bg-blue-600 w-full"
            >
              Gerar relatório
            </Button>

            {usuario?.permissao === "ADMIN" && (
              <Button
                onClick={() => setIsEtapaModalOpen(true)}
                className="bg-blue-600 w-full"
              >
                Adicionar Etapa
              </Button>
            )}

            <Button
              onClick={() => setIsPecaModalOpen(true)}
              className="bg-blue-600 w-full"
            >
              Adicionar Peça
            </Button>

            <Button
              onClick={() => setIsTesteModalOpen(true)}
              className="bg-blue-600 w-full"
            >
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
          emptyMessage="Nenhum teste cadastrado."
          loadingMessage="Carregando testes..."
          renderLabel={(teste) => teste.tipo}
        />
      </div>

      <CadastrarEtapaModal
        isOpen={isEtapaModalOpen}
        aeronaveId={id!}
        onClose={() => setIsEtapaModalOpen(false)}
        onSuccess={() => {
          setIsEtapaModalOpen(false);

          window.location.reload();
        }}
      />

      <CadastrarPecaModal
        isOpen={isPecaModalOpen}
        aeronaveId={id!}
        onClose={() => setIsPecaModalOpen(false)}
        onSuccess={() => {
          setIsPecaModalOpen(false);

          window.location.reload();
        }}
      />

      <CadastrarTesteModal
        isOpen={isTesteModalOpen}
        aeronaveId={id!}
        onClose={() => setIsTesteModalOpen(false)}
        onSuccess={() => {
          setIsTesteModalOpen(false);

          window.location.reload();
        }}
      />
    </div>
  );
}
