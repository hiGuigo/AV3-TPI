import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";

import axios from "axios";

import { createUsuario } from "../../services/usuario.service";

import type { Permissao } from "../../types/permissao";

import type { FormData, FormErrors } from "../../types/usuario/createUsuario";

export function useCadastrarUsuario(onSuccess: () => void) {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    telefone: "",
    endereco: "",

    username: "",
    senha: "",
    permissao: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

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

    if (!formData.username.trim()) {
      newErrors.username = "O usuário é obrigatório.";
    }

    if (!formData.senha.trim()) {
      newErrors.senha = "A senha é obrigatória.";
    }

    if (!formData.permissao) {
      newErrors.permissao = "A permissão é obrigatória.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setIsSubmitting(true);

      await createUsuario({
        nome: formData.nome,
        telefone: formData.telefone || undefined,
        endereco: formData.endereco || undefined,

        username: formData.username,
        senha: formData.senha,
        permissao: formData.permissao as Permissao,
      });

      setIsModalOpen(true);
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.erro;

        setErrors((prevState) => ({
          ...prevState,
          username: message || "Erro ao cadastrar usuário.",
        }));
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
