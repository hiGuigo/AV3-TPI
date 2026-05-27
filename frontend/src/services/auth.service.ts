// este service é o responsável pela autenticação do usuário
// para estabelecer a comunicação com o banco foi utilizado a bilioteca Axios

// com o axios é possível realizar as requisições HTTP necessárias
import axios from "axios";

// é importante declarar as interfaces com "type" para que o TypeScript
// entenda que elas só serão utilizadas para tipagem, e não viram código JS no final
import type { LoginRequest, LoginResponse } from "../types/auth/auth";

// baseURL é definida em uma instância personalizada para evitar repetições de código
// sem ela fica algo como: axios.post("http://localhost:3000/rota", data)
const api = axios.create({
  baseURL: "http://localhost:3000",
});

// a função login() vai receber como parâmetro um objeto do tipo "LoginRequest"
// ela será utilizada no hook useLoginForm.tsx
export async function login(data: LoginRequest) {
  // aqui é feita a requisição POST utilizando:
  // a url base + a rota + o argumento recebido pela função login
  const response = await api.post<LoginResponse>("/login", data);

  // ao retornar o método, o axios envia um objeto enorme com:
  // data, status, headers, config, mas o que interessa é apenas "data"
  // que é onde o token de autenticação está
  return response.data;
}
