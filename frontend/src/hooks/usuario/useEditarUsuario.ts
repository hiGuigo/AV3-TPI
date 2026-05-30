import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getUsuarioById } from "../../services/usuario.service";
import { updateUsuario } from "../../services/usuario.service";
import { updateFuncionario } from "../../services/funcionario.service";

import type { Permissao, Usuario } from "../../types/funcionario/funcionario";

type FormData = {
  username: string;
  senha: string;
  permissao: Permissao;

  nome: string;
  telefone: string;
  endereco: string;
};

export function useEditarUsuario() {
  const { id } = useParams();
  
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    username: "",
    senha: "",
    permissao: "OPERADOR",
    nome: "",
    telefone: "",
    endereco: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getUsuarioById(id);

        setUsuario(data);

        setFormData({
          username: data.username,
          senha: "",
          permissao: data.permissao,
          nome: data.funcionario?.nome || "",
          telefone: data.funcionario?.telefone || "",
          endereco: data.funcionario?.endereco || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [id]);

  function handleChange(
    field: keyof FormData,
    value: FormData[keyof FormData],
  ) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!usuario) return;

    try {
      setIsSaving(true);

      await updateUsuario(usuario.id, {
        username: formData.username,
        senha: formData.senha || undefined,
        permissao: formData.permissao,
      });

      if (usuario.funcionario) {
        await updateFuncionario(usuario.funcionario.id, {
          nome: formData.nome,
          telefone: formData.telefone,
          endereco: formData.endereco,
        });
      }

      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    navigate(`/usuarios/${id}`);
  }

  return {
    usuario,
    isLoading,
    isSaving,
    formData,
    handleChange,
    handleSubmit,
    isModalOpen,
    handleCloseModal,
  };
}
