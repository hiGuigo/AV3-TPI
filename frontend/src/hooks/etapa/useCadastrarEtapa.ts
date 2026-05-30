import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import axios from "axios";

import { createEtapa } from "../../services/etapa.service";
import { getFuncionarios } from "../../services/funcionario.service";

import type { Funcionario } from "../../types/funcionario/funcionario";
import type { FormData, FormErrors } from "../../types/etapa/createEtapa";

export function useCadastrarEtapa(
  aeronaveId: string,
  onSuccess: () => void,
  isOpen: boolean,
) {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  const [formData, setFormData] = useState<FormData>({
    prazo: "",
    nome: "",
    funcionariosIds: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    async function loadFuncionarios() {
      try {
        const data = await getFuncionarios();
        setFuncionarios(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadFuncionarios();
  }, [isOpen]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function handleFuncionarioToggle(funcionarioId: string) {
    setFormData((prev) => ({
      ...prev,
      funcionariosIds: prev.funcionariosIds.includes(funcionarioId)
        ? prev.funcionariosIds.filter((id) => id !== funcionarioId)
        : [...prev.funcionariosIds, funcionarioId],
    }));
  }

  function validate() {
    const newErrors: FormErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "O nome é obrigatório.";
    }

    if (!formData.prazo) {
      newErrors.prazo = "O prazo é obrigatório.";
    }

    if (formData.funcionariosIds.length === 0) {
      newErrors.funcionariosIds = "Selecione ao menos um funcionário.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) return;

    try {
      setIsSubmitting(true);

      await createEtapa({
        nome: formData.nome,
        prazo: formData.prazo,
        aeronaveId,
        funcionariosIds: formData.funcionariosIds,
      });

      onSuccess();
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.erro ?? "Erro ao cadastrar etapa.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    formData,
    errors,
    isSubmitting,
    funcionarios,
    handleChange,
    handleFuncionarioToggle,
    handleSubmit,
  };
}
