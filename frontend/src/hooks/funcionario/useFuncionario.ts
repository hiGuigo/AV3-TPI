import { useEffect, useState } from "react";

import { getFuncionarios } from "../../services/funcionario.service";

import type { Funcionarios } from "../../types/funcionario/funcionarios";

export function useFuncionarios() {
  const [funcionarios, setFuncionarios] = useState<Funcionarios[]>([]);

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
