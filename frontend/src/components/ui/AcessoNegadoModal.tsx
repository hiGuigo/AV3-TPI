import { Button } from "./Button";

export function AcessoNegadoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="flex flex-col gap-3 bg-white p-6 rounded-xl w-[320px]">
        <h2 className="text-lg font-semibold">Acesso negado!</h2>

        <p className="text-sm">
          Achou que ia conseguir acessar página protegida? Achou{" "}
          <strong>ERRADO</strong>.
        </p>

        <p className="text-sm">
          Você não tem permissão para acessar esta página e será redirecionado
          para o início.
        </p>

        <Button onClick={onClose} className="w-full bg-red-600">
          Ok
        </Button>
      </div>
    </div>
  );
}
