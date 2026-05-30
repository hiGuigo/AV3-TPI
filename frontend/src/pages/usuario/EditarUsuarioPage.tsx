import { Button } from "../../components/ui/Button";
import { FeedbackModal } from "../../components/ui/FeedBackModal";
import { Input } from "../../components/ui/Input";

import { useEditarUsuario } from "../../hooks/usuario/useEditarUsuario";

export function EditarUsuarioPage() {
  const {
    usuario,
    isSelfEdit,
    isLoading,
    isSaving,
    formData,
    handleChange,
    handleSubmit,
    isModalOpen,
    handleCloseModal,
  } = useEditarUsuario();

  if (isLoading || !usuario) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-slate-500 animate-pulse">Carregando usuário...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold text-slate-800">Editar Usuário</h1>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-6 items-center">
            <div className="rounded-xl bg-slate-50 px-4 py-3">
              {usuario.username}
            </div>

            <Input
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
              placeholder="Novo username"
            />
          </div>

          <div className="grid grid-cols-2 gap-6 items-center">
            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <p className="text-sm text-gray-500">
                Senha omitida por motivos de segurança.
              </p>
            </div>

            <Input
              type="password"
              value={formData.senha}
              onChange={(e) => handleChange("senha", e.target.value)}
              placeholder="Nova senha"
            />
          </div>

          <div className="grid grid-cols-2 gap-6 items-center">
            <div className="rounded-xl bg-slate-50 px-4 py-3">
              {usuario.permissao}
            </div>

            {isSelfEdit ? (
              <p className="text-sm text-gray-500">
                Você não pode alterar a própria função.
              </p>
            ) : (
              <select
                value={formData.permissao}
                onChange={(e) => handleChange("permissao", e.target.value)}
                className="rounded-xl border px-4 py-3"
              >
                <option value="ADMIN">ADMIN</option>
                <option value="ENGENHEIRO">ENGENHEIRO</option>
                <option value="OPERADOR">OPERADOR</option>
              </select>
            )}
          </div>

          <div className="border-t pt-4 mt-2">
            <h2 className="font-bold text-slate-700 mb-2">Funcionário</h2>

            <div className="grid grid-cols-2 gap-6 items-center">
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                {usuario.funcionario?.nome || "-"}
              </div>

              <Input
                value={formData.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                placeholder="Nome"
              />
            </div>

            <div className="grid grid-cols-2 gap-6 items-center mt-2">
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                {usuario.funcionario?.telefone || "-"}
              </div>

              <Input
                value={formData.telefone}
                onChange={(e) => handleChange("telefone", e.target.value)}
                placeholder="Telefone"
              />
            </div>

            <div className="grid grid-cols-2 gap-6 items-center mt-2">
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                {usuario.funcionario?.endereco || "-"}
              </div>

              <Input
                value={formData.endereco}
                onChange={(e) => handleChange("endereco", e.target.value)}
                placeholder="Endereço"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isSaving} className="bg-blue-600">
              {isSaving ? "Salvando..." : "Salvar alterações"}
            </Button>
          </div>
        </form>
      </div>

      <FeedbackModal
        isOpen={isModalOpen}
        title="Sucesso"
        message="Usuário atualizado com sucesso."
        buttonText="Voltar"
        onClose={handleCloseModal}
      />
    </div>
  );
}
