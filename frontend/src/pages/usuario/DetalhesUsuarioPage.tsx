import { ErrorMessage } from "../../components/ui/ErrorMessage";
import { useUsuario } from "../../hooks/usuario/useUsuario";

export function DetalhesUsuarioPage() {
  const { usuario, isLoading, errorMessage } = useUsuario();

  if (isLoading) return <p>Carregando usuário...</p>;

  if (!usuario) {
    return errorMessage ? (
      <ErrorMessage message={errorMessage} />
    ) : (
      <p>Usuário não encontrado.</p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-slate-800">Perfil do Usuário</h1>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Informações do Usuário</h2>

        <div className="grid gap-3 text-slate-700">
          <p>
            <strong>Username:</strong> {usuario.username}
          </p>
          <p>
            <strong>Permissão:</strong> {usuario.permissao}
          </p>
          <p>
            <strong>Criado em:</strong>{" "}
            {new Date(usuario.createdAt).toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Funcionário</h2>

        {usuario.funcionario ? (
          <div className="grid gap-3 text-slate-700">
            <p>
              <strong>Nome:</strong> {usuario.funcionario.nome}
            </p>
            <p>
              <strong>Telefone:</strong> {usuario.funcionario.telefone || "-"}
            </p>
            <p>
              <strong>Endereço:</strong> {usuario.funcionario.endereco || "-"}
            </p>
          </div>
        ) : (
          <p className="text-slate-500">Usuário não vinculado a funcionário.</p>
        )}
      </div>

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Relatórios</h2>

        {usuario.relatorios.length > 0 ? (
          <div className="space-y-2">
            {usuario.relatorios.map((r) => (
              <div
                key={r.id}
                className="flex justify-between bg-slate-50 p-2 rounded"
              >
                <span>{r.cliente}</span>
                <span className="text-sm text-slate-500">
                  {new Date(r.dataEntrega).toLocaleDateString("pt-BR")}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500">Nenhum relatório encontrado.</p>
        )}
      </div>
    </div>
  );
}
