// este é um hook customizado, responsável por encapsular toda a lógica do formulário de login
// ele será utilizado pelo componente LoginForm.tsx

// o state será utilizado para criar os estados do formulário
import { useState } from "react";

// navigate, para enviar para a tela privada após o login
import { useNavigate } from "react-router-dom";

// tipagem do evento do formulário
// o que ativará o hook será um "onSubmit"
import type { SubmitEvent } from "react";

// importação da API responsável pelo token
import { login } from "../services/auth.service";

// hook para a função signIn
import { useAuth } from "./useAuth";

export function useLoginForm() {
  // função navigate
  const navigate = useNavigate();
  
  // pega a função signIn (que recebe o token) do contexto
  const { signIn } = useAuth();

  // armazenamento de username e senha
  const [username, setUsername] = useState("");
  const [senha, setSenha] = useState("");

  // controle de loadings
  const [loading, setLoading] = useState(false);

  // armazenamento de mensagens de erro
  const [erro, setErro] = useState("");

  // quando o "onSubmit" for ativado pelo componente, esta é a função chamada
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    // sem o preventDefault, toda vez que a página for recarregada
    // os estados serão perdidos
    event.preventDefault();

    try {
      // ativando o loading para o botão "Entrar"
      setLoading(true);
      
      // apenas para evitar exibir algum erro antigo
      setErro("");

      // a parte mais importante, a função login()
      // aqui os estados serão enviados como argumento dentro de um objeto
      const response = await login({
        username,
        senha,
      });

      // se o login der certo, a função signIn salva o token de autenticação
      // agora todas as rotas protegidas ficam disponíveis
      signIn(response.token, response.usuario);

      // depois de salvar o token, redireciona o usuário para a tela principal
      navigate("/aeronaves");
    } catch {
      setErro("Usuário ou senha inválidos");
    } finally {
      // o loading sempre termina, independete de erro ou sucesso
      // por isso está dentro de finally{}
      setLoading(false);
    }
  }

  // retorna tudo o que o componente precisa
  return {
    username,
    senha,
    erro,
    loading,
    setUsername,
    setSenha,
    handleSubmit,
  };
}
