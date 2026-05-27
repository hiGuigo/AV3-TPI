// sempre que for necessário validar o token do usuário, fazer login ou logout,
// é esse hook quem deve ser chamado

// useContext é o responsável por "ler" os dados de um contexto
import { useContext } from "react";

// o contexto que o useContext irá "ler"
import { AuthContext } from "../contexts/auth.context";

export function useAuth() {
  // aqui será retornado o "value" disponibilizado pelo provider
  // e value contém: token, signIn e signOut

  // isso serve como um encapsulamento, para não precisar fazer o que está sendo feito
  // aqui, em todos os componentes que precisem dos dados disponíveis em "value"
  return useContext(AuthContext);
}
