import { Button } from "./ui/Button";
import { ErrorMessage } from "./ui/ErrorMessage";

import { useCadastrarTeste } from "../hooks/teste/useCadastrarTeste";

type Props = {
  isOpen: boolean;
  aeronaveId: string;
  onClose: () => void;
  onSuccess: () => void;
};

export function CadastrarTesteModal({
  isOpen,
  aeronaveId,
  onClose,
  onSuccess,
}: Props) {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useCadastrarTeste(aeronaveId, onSuccess);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Adicionar Teste</h2>

          <div className="flex flex-col gap-2">
            <label>Tipo</label>

            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            >
              <option value="">Selecione</option>

              <option value="ELETRICO">Elétrico</option>

              <option value="HIDRAULICO">Hidráulico</option>

              <option value="AERODINAMICO">Aerodinâmico</option>
            </select>

            {errors.tipo && <ErrorMessage message={errors.tipo} />}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 px-4 py-2"
            >
              {isSubmitting ? "Salvando..." : "Cadastrar"}
            </Button>

            <Button
              type="button"
              onClick={onClose}
              className="bg-red-600 px-4 py-2"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
