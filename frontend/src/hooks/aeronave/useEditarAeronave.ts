import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAeronave } from "./useAeronave";

import { updateAeronave } from "../../services/aeronave.service";

import type { UpdateAeronaveData } from "../../types/aeronave/updateAeronave";

type TipoAeronave = "COMERCIAL" | "MILITAR";

export function useEditarAeronave() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { aeronave, isLoading } = useAeronave();

  const [isSaving, setIsSaving] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState<UpdateAeronaveData>({
    modelo: "",
    codigo: "",
    capacidade: 0,
    alcance: 0,
    tipo: "COMERCIAL",
  });

  function handleChange(
    field: keyof UpdateAeronaveData,
    value: string | number,
  ) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    if (!aeronave) {
      return;
    }

    const data: UpdateAeronaveData = {};

    if (formData.modelo && formData.modelo !== aeronave.modelo) {
      data.modelo = formData.modelo;
    }

    if (formData.codigo && formData.codigo !== aeronave.codigo) {
      data.codigo = formData.codigo;
    }

    if (formData.capacidade && formData.capacidade !== aeronave.capacidade) {
      data.capacidade = formData.capacidade;
    }

    if (formData.alcance && formData.alcance !== aeronave.alcance) {
      data.alcance = formData.alcance;
    }

    if (formData.tipo && formData.tipo !== aeronave.tipo) {
      data.tipo = formData.tipo as TipoAeronave;
    }

    try {
      setIsSaving(true);

      await updateAeronave(id, data);

      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false);

    navigate(`/aeronaves/${id}`);
  }

  return {
    aeronave,

    isLoading,
    isSaving,

    formData,
    handleChange,

    handleSubmit,

    isModalOpen,
    handleCloseModal,
  };
}
