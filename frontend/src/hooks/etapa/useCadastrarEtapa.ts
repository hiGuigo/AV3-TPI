import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import axios from "axios";

import { createEtapa } from "../../services/etapa.service";

import type { FormData, FormErrors } from "../../types/etapa/createEtapa";

export function useCadastrarEtapa(aeronaveId: string, onSuccess: () => void) {
  const [formData, setFormData] = useState<FormData>({
    prazo: "",
    nome: "",
    funcionariosIds: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  }

  function handleFuncionarioToggle(funcionarioId: string) {
    setFormData((prevState) => ({
      ...prevState,
      funcionariosIds: prevState.funcionariosIds.includes(funcionarioId)
        ? prevState.funcionariosIds.filter((id) => id !== funcionarioId)
        : [...prevState.funcionariosIds, funcionarioId],
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

    if (!validate()) {
      return;
    }

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
    handleChange,
    handleFuncionarioToggle,
    handleSubmit,
  };
}
