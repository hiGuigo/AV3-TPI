import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import axios from "axios";

import { createPeca } from "../../services/peca.service";

import type { FormData, FormErrors } from "../../types/peca/createPeca";

export function useCadastrarPeca(aeronaveId: string, onSuccess: () => void) {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    tipo: "",
    fornecedor: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) {
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

  function validate() {
    const newErrors: FormErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "O nome é obrigatório.";
    }

    if (!formData.fornecedor.trim()) {
      newErrors.fornecedor = "O fornecedor é obrigatório.";
    }

    if (!formData.tipo) {
      newErrors.tipo = "O tipo é obrigatório.";
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

      await createPeca({
        nome: formData.nome,
        fornecedor: formData.fornecedor,
        tipo: formData.tipo as "NACIONAL" | "IMPORTADA",
        aeronaveId,
      });

      onSuccess();
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.erro ?? "Erro ao cadastrar peça.");
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
    handleSubmit,
  };
}
