import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { ErrorMessage } from "./ui/ErrorMessage";

import type { Funcionario } from "../types/funcionario/funcionario";

import { useCadastrarEtapa } from "../hooks/etapa/useCadastrarEtapa";

type Props = {
  isOpen: boolean;
  aeronaveId: string;
  onClose: () => void;
  onSuccess: () => void;
};

export function CadastrarEtapaModal({
  isOpen,
  aeronaveId,
  onClose,
  onSuccess,
}: Props) {
  const {
    formData,
    errors,
    isSubmitting,
    funcionarios,
    handleChange,
    handleFuncionarioToggle,
    handleSubmit,
  } = useCadastrarEtapa(aeronaveId, onSuccess, isOpen);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Adicionar Etapa</h2>

          <div className="flex flex-col gap-2">
            <label>Nome</label>
            <Input name="nome" value={formData.nome} onChange={handleChange} />
            {errors.nome && <ErrorMessage message={errors.nome} />}
          </div>

          <div className="flex flex-col gap-2">
            <label>Prazo</label>
            <Input
              type="date"
              name="prazo"
              value={formData.prazo}
              onChange={handleChange}
            />
            {errors.prazo && <ErrorMessage message={errors.prazo} />}
          </div>

          <div className="flex flex-col gap-2">
            <label>Responsáveis</label>

            <div className="max-h-48 overflow-y-auto border rounded-lg p-3">
              {funcionarios.map((funcionario: Funcionario) => (
                <label
                  key={funcionario.id}
                  className="flex items-center gap-2 py-1"
                >
                  <input
                    type="checkbox"
                    checked={formData.funcionariosIds.includes(funcionario.id)}
                    onChange={() => handleFuncionarioToggle(funcionario.id)}
                  />
                  <span>{funcionario.nome}</span>
                </label>
              ))}
            </div>

            {errors.funcionariosIds && (
              <ErrorMessage message={errors.funcionariosIds} />
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600"
            >
              {isSubmitting ? "Salvando..." : "Cadastrar"}
            </Button>

            <Button type="button" onClick={onClose} className="bg-red-600">
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
