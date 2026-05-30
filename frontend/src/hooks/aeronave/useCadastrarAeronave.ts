import { useState } from "react";
import type { ChangeEvent } from "react";

import { createAeronave } from "../../services/aeronave.service";
import type { FormData, FormErrors } from "../../types/aeronave/createAeronave";
import axios from "axios";

export function useCadastrarAeronave(onSuccess: () => void) {
  const [formData, setFormData] = useState<FormData>({
    codigo: "",
    modelo: "",
    capacidade: "",
    alcance: "",
    tipo: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleChange(
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) {
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

  function validate() {
    const newErrors: FormErrors = {};

    if (!formData.codigo.trim()) newErrors.codigo = "O código é obrigatório.";
    if (!formData.modelo.trim()) newErrors.modelo = "O modelo é obrigatório.";
    if (!formData.capacidade)
      newErrors.capacidade = "A capacidade é obrigatória.";
    if (!formData.alcance) newErrors.alcance = "O alcance é obrigatório.";
    if (!formData.tipo) newErrors.tipo = "O tipo é obrigatório.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) return;

    try {
      setIsSubmitting(true);

      await createAeronave({
        codigo: formData.codigo,
        modelo: formData.modelo,
        capacidade: Number(formData.capacidade),
        alcance: Number(formData.alcance),
        tipo: formData.tipo as "COMERCIAL" | "MILITAR",
      });

      setIsModalOpen(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.erro;

        setErrors({
          codigo: message || "Erro ao cadastrar aeronave.",
        });
      } else {
        setErrors({
          codigo: "Erro inesperado.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function closeModal() {
    setIsModalOpen(false);
    onSuccess();
  }

  return {
    formData,
    errors,
    isSubmitting,
    isModalOpen,
    handleChange,
    handleSubmit,
    closeModal,
  };
}
