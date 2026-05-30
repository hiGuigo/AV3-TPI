import { useEffect, useState } from "react";

import { getFuncionarios } from "../../services/funcionario.service";

import type { Funcionario } from "../../types/funcionario/funcionario";

export function useFuncionarios() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFuncionarios()
      .then(setFuncionarios)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return {
    funcionarios,
    isLoading,
  };
}
