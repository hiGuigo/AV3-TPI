// o context é responsável por definir, basicamente, o formato dos dados
// ele será utilizado pelo provider auth.provider.tsx
// é o context que também vai disponibilizar o token aos componentes que precisem dele
// isso evita prop drilling (ficar jogando props pra lá e para cá)

// função nativa do react para criação de contextos
import { createContext } from "react";

// tipagem do usuário logado
import type { Usuario } from "../types/auth/auth";

// aqui é definido o formato do contexto, o que é aceito e o que não é
interface AuthContextType {
  // o token pode ser string (autenticado) ou null (não autenticado)
  token: string | null;

  // dados do usuário logado
  usuario: Usuario | null;

  // a função signIn() tem como parâmetro uma função que recebe um token e não retorna nada
  signIn: (token: string, usuario: Usuario) => void;

  // já a função signOut() não retorna nada
  signOut: () => void;
}

// aqui é criado o contexto global em si
// o createContext cria um "bloco" que envolve toda a aplicação
// e ele exige um valor inicial, mas como os valores ainda não existem,
// pois esse é a função do provider, é passado um "acordo", algo como
// "confia em mim TypeScript, {} vai ter esse formado: AuthContextType"
export const AuthContext = createContext({} as AuthContextType);
