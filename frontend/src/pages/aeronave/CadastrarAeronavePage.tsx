import { useNavigate } from "react-router-dom";

import { useCadastrarAeronave } from "../../hooks/aeronave/useCadastrarAeronave";

import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { FeedbackModal } from "../../components/ui/FeedBackModal";

export function CadastrarAeronavePage() {
  const navigate = useNavigate();

  const {
    formData,
    errors,
    isSubmitting,
    isModalOpen,
    handleChange,
    handleSubmit,
    closeModal,
  } = useCadastrarAeronave(() => {
    navigate("/aeronaves");
  });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold text-slate-800">Cadastrar Aeronave</h1>
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-medium text-slate-700">Código</label>

            <Input
              name="codigo"
              placeholder="Ex: PT-ABC"
              value={formData.codigo}
              onChange={handleChange}
            />

            {errors.codigo && <ErrorMessage message={errors.codigo} />}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-slate-700">Modelo</label>

            <Input
              name="modelo"
              placeholder="Ex: Boeing 737"
              value={formData.modelo}
              onChange={handleChange}
            />

            {errors.modelo && <ErrorMessage message={errors.modelo} />}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-medium text-slate-700">Capacidade</label>

              <Input
                name="capacidade"
                type="number"
                placeholder="Ex: 180"
                value={formData.capacidade}
                onChange={handleChange}
              />

              {errors.capacidade && (
                <ErrorMessage message={errors.capacidade} />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-slate-700">Alcance (km)</label>

              <Input
                name="alcance"
                type="number"
                placeholder="Ex: 6000"
                value={formData.alcance}
                onChange={handleChange}
              />

              {errors.alcance && <ErrorMessage message={errors.alcance} />}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-slate-700">Tipo</label>

            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            >
              <option value="">Selecione</option>

              <option value="COMERCIAL">Comercial</option>

              <option value="MILITAR">Militar</option>
            </select>

            {errors.tipo && <ErrorMessage message={errors.tipo} />}
          </div>

          <div className="flex items-center justify-end gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2"
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </div>
        </form>
      </div>

      <FeedbackModal
        isOpen={isModalOpen}
        title="Aeronave cadastrada!"
        message="A aeronave foi cadastrada com sucesso."
        buttonText="Voltar para listagem"
        onClose={closeModal}
      />
    </div>
  );
}
