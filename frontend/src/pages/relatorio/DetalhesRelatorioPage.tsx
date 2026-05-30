import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { useRelatorio } from "../../hooks/relatorio/useRelatorio";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pt-BR");
}

function Section({ title, children }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">
        {title}
      </h2>
      <div className="text-slate-700">{children}</div>
    </div>
  );
}

export function DetalhesRelatorioPage() {
  const { relatorio, isLoading, errorMessage } = useRelatorio();

  if (isLoading) return <p>Carregando relatório...</p>;

  if (!relatorio) {
    return errorMessage ? (
      <ErrorMessage message={errorMessage} />
    ) : (
      <p>Relatório não encontrado.</p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-slate-800">Relatório Técnico</h1>

      <Section title="Resumo do Relatório">
        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong>Cliente:</strong> {relatorio.cliente}
          </p>
          <p>
            <strong>Entrega:</strong> {formatDate(relatorio.dataEntrega)}
          </p>
          <p>
            <strong>Autor:</strong> {relatorio.autor.username}
          </p>
          <p>
            <strong>Criado em:</strong> {formatDate(relatorio.createdAt)}
          </p>
        </div>

        <div className="mt-4">
          <p className="font-semibold mb-1">Descrição</p>
          <p className="whitespace-pre-line text-slate-600">
            {relatorio.texto}
          </p>
        </div>
      </Section>

      <Section title="Aeronave">
        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong>Código:</strong> {relatorio.aeronave.codigo}
          </p>
          <p>
            <strong>Modelo:</strong> {relatorio.aeronave.modelo}
          </p>
          <p>
            <strong>Tipo:</strong> {relatorio.aeronave.tipo}
          </p>
          <p>
            <strong>Capacidade:</strong> {relatorio.aeronave.capacidade}
          </p>
          <p>
            <strong>Alcance:</strong> {relatorio.aeronave.alcance}
          </p>
        </div>
      </Section>

      <Section title="Etapas">
        <div className="space-y-2">
          {relatorio.aeronave.etapas.map((e) => (
            <div
              key={e.id}
              className="flex justify-between bg-slate-50 p-2 rounded"
            >
              <span>{e.nome}</span>
              <span className="text-sm text-slate-500">{e.status}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Peças">
        <div className="space-y-2">
          {relatorio.aeronave.pecas.map((p) => (
            <div
              key={p.id}
              className="flex justify-between bg-slate-50 p-2 rounded"
            >
              <span>{p.nome}</span>
              <span className="text-sm text-slate-500">{p.status}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Testes">
        <div className="space-y-2">
          {relatorio.aeronave.testes.map((t) => (
            <div
              key={t.id}
              className="flex justify-between bg-slate-50 p-2 rounded"
            >
              <span>{t.tipo}</span>
              <span className="text-sm text-slate-500">{t.resultado}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
