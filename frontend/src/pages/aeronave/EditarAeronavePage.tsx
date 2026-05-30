import { Button } from "../../components/ui/Button";
import { FeedbackModal } from "../../components/ui/FeedBackModal";
import { Input } from "../../components/ui/Input";

import { useEditarAeronave } from "../../hooks/aeronave/useEditarAeronave";

export function EditarAeronavePage() {
  const {
    aeronave,
    isLoading,
    isSaving,
    formData,
    handleChange,
    handleSubmit,
    isModalOpen,
    handleCloseModal,
  } = useEditarAeronave();

  if (isLoading || !aeronave) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-slate-500 animate-pulse">Carregando aeronave...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold text-slate-800">Editar Aeronave</h1>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-6 border-b border-slate-200 pb-3">
            <div>
              <p className="font-bold text-slate-800 uppercase">Valor atual</p>
            </div>

            <div>
              <p className="font-bold text-slate-800 uppercase">Novo valor</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 items-center">
            <div className="rounded-xl bg-slate-50 px-4 py-3 text-slate-700 font-medium">
              {aeronave.modelo}
            </div>

            <Input
              type="text"
              value={formData.modelo}
              onChange={(e) => handleChange("modelo", e.target.value)}
              placeholder="Novo modelo"
            />
          </div>

          <div className="grid grid-cols-2 gap-6 items-center">
            <div className="rounded-xl bg-slate-50 px-4 py-3 text-slate-700 font-medium">
              {aeronave.codigo}
            </div>

            <Input
              type="text"
              value={formData.codigo}
              onChange={(e) => handleChange("codigo", e.target.value)}
              placeholder="Novo código"
            />
          </div>

          <div className="grid grid-cols-2 gap-6 items-center">
            <div className="rounded-xl bg-slate-50 px-4 py-3 text-slate-700 font-medium">
              {aeronave.capacidade}
            </div>

            <Input
              type="number"
              value={formData.capacidade || ""}
              onChange={(e) =>
                handleChange("capacidade", Number(e.target.value))
              }
              placeholder="Nova capacidade"
            />
          </div>

          <div className="grid grid-cols-2 gap-6 items-center">
            <div className="rounded-xl bg-slate-50 px-4 py-3 text-slate-700 font-medium">
              {aeronave.alcance}
            </div>

            <Input
              type="number"
              value={formData.alcance || ""}
              onChange={(e) => handleChange("alcance", Number(e.target.value))}
              placeholder="Novo alcance"
            />
          </div>

          <div className="grid grid-cols-2 gap-6 items-center">
            <div className="rounded-xl bg-slate-50 px-4 py-3 text-slate-700 font-medium">
              {aeronave.tipo}
            </div>

            <select
              value={formData.tipo}
              onChange={(e) => handleChange("tipo", e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="COMERCIAL">COMERCIAL</option>

              <option value="MILITAR">MILITAR</option>
            </select>
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
        message="A aeronave foi atualizada com sucesso."
        buttonText="Ver detalhes"
        onClose={handleCloseModal}
      />
    </div>
  );
}
