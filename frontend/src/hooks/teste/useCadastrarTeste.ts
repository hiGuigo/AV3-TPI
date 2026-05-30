import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import axios from "axios";

import { createTeste } from "../../services/teste.service";

import type { FormData, FormErrors } from "../../types/teste/createTeste";

export function useCadastrarTeste(aeronaveId: string, onSuccess: () => void) {
  const [formData, setFormData] = useState<FormData>({
    tipo: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
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

      await createTeste({
        tipo: formData.tipo as "ELETRICO" | "HIDRAULICO" | "AERODINAMICO",
        aeronaveId,
      });

      onSuccess();
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.erro ?? "Erro ao cadastrar teste.");
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
