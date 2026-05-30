import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { createRelatorio } from "../../services/relatorio.service";

export function useCadastrarRelatorio() {
  const navigate = useNavigate();

  const [cliente, setCliente] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [texto, setTexto] = useState("");
  const location = useLocation();

  const aeronaveId = (location.state)?.aeronaveId;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit() {
    if (!cliente || !dataEntrega || !texto) {
      setErrorMessage("Preencha todos os campos.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      await createRelatorio({
        cliente,
        dataEntrega,
        texto,
        aeronaveId,
      });

      navigate("/relatorios");
    } catch (error) {
      console.error(error);

      setErrorMessage(
        error?.response?.data?.message ?? "Erro ao gerar relatório.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return {
    cliente,
    setCliente,
    dataEntrega,
    setDataEntrega,
    texto,
    setTexto,
    isLoading,
    errorMessage,
    handleSubmit,
  };
}
