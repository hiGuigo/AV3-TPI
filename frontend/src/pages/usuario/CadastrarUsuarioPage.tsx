import { useNavigate } from "react-router-dom";

import { useCadastrarUsuario } from "../../hooks/usuario/useCadastrarUsuario";

import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { FeedbackModal } from "../../components/ui/FeedBackModal";

export function CadastrarUsuarioPage() {
  const navigate = useNavigate();

  const {
    formData,
    errors,
    isSubmitting,
    isModalOpen,
    handleChange,
    handleSubmit,
    closeModal,
  } = useCadastrarUsuario(() => {
    navigate("/usuarios");
  });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold text-slate-800">
        Cadastrar Funcionário
      </h1>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-slate-700">Nome</label>

            <Input
              name="nome"
              placeholder="Nome completo"
              value={formData.nome}
              onChange={handleChange}
            />

            {errors.nome && <ErrorMessage message={errors.nome} />}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-medium text-slate-700">Telefone</label>

              <Input
                name="telefone"
                placeholder="(11) 99999-9999"
                value={formData.telefone}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-slate-700">Endereço</label>

              <Input
                name="endereco"
                placeholder="Rua Exemplo, 123"
                value={formData.endereco}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-slate-700">Username</label>

            <Input
              name="username"
              placeholder="Usuário para login"
              value={formData.username}
              onChange={handleChange}
            />

            {errors.username && <ErrorMessage message={errors.username} />}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-slate-700">Senha</label>

            <Input
              type="password"
              name="senha"
              placeholder="Senha"
              value={formData.senha}
              onChange={handleChange}
            />

            {errors.senha && <ErrorMessage message={errors.senha} />}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-slate-700">Permissão</label>

            <select
              name="permissao"
              value={formData.permissao}
              onChange={handleChange}
              className="rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            >
              <option value="">Selecione</option>

              <option value="ADMIN">Administrador</option>

              <option value="ENGENHEIRO">Engenheiro</option>

              <option value="OPERADOR">Operador</option>
            </select>

            {errors.permissao && <ErrorMessage message={errors.permissao} />}
          </div>

          <div className="flex items-center justify-end gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600"
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </div>
        </form>
      </div>

      <FeedbackModal
        isOpen={isModalOpen}
        title="Usuário cadastrado!"
        message="O usuário foi cadastrado com sucesso."
        buttonText="Voltar para listagem"
        onClose={closeModal}
      />
    </div>
  );
}
