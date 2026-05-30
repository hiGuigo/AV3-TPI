// o provider é quem vai guardar o estado globalmente e disponibilizá-lo para a aplicação inteira
// é ele o responsável por fornecer os dados para os componentes através do contexto

// state para criar estados reativos no componente
// assim, toda vez que o estado for alterado, o componente renderiza
import { useState } from "react";

// o ReactNode representa qualquer conteúdo renderizável pelo React
import type { ReactNode } from "react";

// importação do contexto criado
import { AuthContext } from "../contexts/auth.context";

// tipagem do usuário logado
import type { Usuario } from "../types/auth";

// essa interface define o tipo de "children" como um componente renderizável
// ou seja, lá em App.tsx, que é onde está declarado o provider,
// tudo que estiver "dentro" será recebido em children e renderizado pelo react
interface Props {
  children: ReactNode;
}

// a função()-componente recebe children via props
// esse componente vai envolver toda a aplicação (em App.tsx)
export function AuthProvider({ children }: Props) {
  // aqui o local storage será utilizado para persistência do token no navegador
  // o local storage permite armazenar chave:valor, portanto, é passado "token":token

  // utilizar o local storage permite manter o token salvo, mesmo após o refresh
  // ou o fechamento do navegador até que ele seja removido

  // o getItem() é o responsável por obter o valor contido no local storage
  // nesse caso, queremos a o valor da chave "token", que pode ser string (logado)
  // ou null (não logado)
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  // mesma coisa com usuário
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const storedUser = localStorage.getItem("usuario");

    // a diferença é que, como usuario é um objeto
    // e o local storage salva tudo como string
    // o objeto usuário precisa ser convertido de string -> objeto
    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser);
  });

  // setItem é responsável por salvar o token e atualizar o estado global (renderizando)
  // além de fazer o mesmo com usuário
  function signIn(token: string, usuario: Usuario) {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));

    setToken(token);
    setUsuario(usuario);
  }

  // removeItem simplesmente limpa o valor armazenado
  function signOut() {
    localStorage.removeItem("token");
    setToken(null);
  }

  // o provider disponibiliza esses valores para todos os componentes "filhos"
  // através do contexto criado em auth.context.tsx
  return (
    <AuthContext.Provider
      value={{
        token,
        usuario,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
