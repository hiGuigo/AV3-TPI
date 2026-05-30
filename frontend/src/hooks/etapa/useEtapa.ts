import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { getEtapaById, updateEtapa } from "../../services/etapa.service";
import { useFuncionarios } from "../../hooks/funcionario/useFuncionario";

import type { Etapa } from "../../types/etapa/etapa";

export function useEtapa() {
  const { id } = useParams();

  const [etapa, setEtapa] = useState<Etapa | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState("");

  const { funcionarios } = useFuncionarios();

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    getEtapaById(id)
      .then((data) => {
        if (!isMounted) return;

        setEtapa(data);
        setErrorMessage("");
      })
      .catch((error) => {
        console.error(error);

        if (!isMounted) return;

        setErrorMessage("Erro ao carregar etapa.");
      })
      .finally(() => {
        if (!isMounted) return;

        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);
  const isConcluida = etapa?.status === "CONCLUIDA";

  const funcionariosDisponiveis = useMemo(() => {
    if (!etapa) return [];

    return funcionarios.filter(
      (funcionario) => !etapa.funcionarios.some((f) => f.id === funcionario.id),
    );
  }, [funcionarios, etapa]);

  async function refetchEtapa() {
    if (!id) return;

    try {
      const data = await getEtapaById(id);
      setEtapa(data);
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro ao atualizar etapa.");
    }
  }

  async function iniciarEtapa() {
    if (!etapa) return;

    try {
      await updateEtapa(etapa.id, { status: "ANDAMENTO" });
      await refetchEtapa();
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro ao iniciar etapa.");
    }
  }

  async function finalizarEtapa() {
    if (!etapa) return;

    try {
      await updateEtapa(etapa.id, { status: "CONCLUIDA" });
      await refetchEtapa();
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro ao finalizar etapa.");
    }
  }

  async function adicionarFuncionario() {
    if (!etapa || !funcionarioSelecionado) return;

    setErrorMessage("");

    try {
      await updateEtapa(etapa.id, {
        adicionarFuncionariosIds: [funcionarioSelecionado],
      });

      setFuncionarioSelecionado("");
      await refetchEtapa();
    } catch (error) {
      console.error(error);

      setErrorMessage(
        error?.response?.data?.erro ??
          error?.response?.data?.message ??
          "Erro ao adicionar funcionário.",
      );
    }
  }

  async function removerFuncionario(funcionarioId: string) {
    if (!etapa) return false;

    setErrorMessage("");

    if (etapa.funcionarios.length <= 1) {
      setErrorMessage(
        "A etapa deve possuir pelo menos um funcionário associado.",
      );
      return false;
    }

    try {
      await updateEtapa(etapa.id, {
        removerFuncionariosIds: [funcionarioId],
      });

      await refetchEtapa();
      return true;
    } catch (error) {
      console.error(error);

      setErrorMessage(
        error?.response?.data?.erro ??
          error?.response?.data?.message ??
          "Erro ao remover funcionário.",
      );
    }
  }

  return {
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
  };
}
