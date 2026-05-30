// importação dos componentes "genéricos" para interface
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { ErrorMessage } from "../ui/ErrorMessage";

// importação do hook responsável pela parte lógica do login
import { useLoginForm } from "../../hooks/useLoginForm";

export function LoginForm() {
  // para ficar mais fácil de entender:
  // "toda vez que um desses itens forem alterados, chame o hook useLoginForm"
  // assim, quando o usuário informa username, o seu estado é atualizado
  // bem como quando o botão "entrar" é acionado, a função handleSubmit é executada
  const {
    username,
    senha,
    erro,
    loading,
    setUsername,
    setSenha,
    handleSubmit,
  } = useLoginForm();

  return (
    // tudo dentro de um form html que reconhece o "onSubmit"
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/*  componente genérico */}
      <Input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/*  componente genérico */}
      <Input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      {/* aqui há uma pequena lógica de loading: sempre que o botão for clicado,  */}
      {/* ele fica desabilitado até que loading volte a ser "false" */}
      {/* isso evita múltiplos cliques, ou seja, múltiplas requisições */}
      <Button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 py-2"
      >
        {/* o texto também fica dinâmico de acordo com o estado de loading */}
        {loading ? "Entrando..." : "Entrar"}
      </Button>

      {/* aqui a mensagem de erro só é exibida SE existir de fato um erro */}
      {erro && <ErrorMessage message={erro} />}
    </form>
  );
}
