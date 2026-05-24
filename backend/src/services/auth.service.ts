// esse service é responsável por validar as credenciais enviadas pelo usuário
// ele compara o que está sendo enviado, com o que o está registrado no banco

// aqui o bcrypt é importado para a utilização do método compare()
import bcrypt from "bcrypt";

// e como é feita uma comparação entre parâmetros enviados e os dados no banco,
// é necessário importar o repository também
import { UsuarioRepository } from "../repositories/usuario.repository";

export class AuthService {
  // criação de uma nova instância do repository
  private usuarioRepository = new UsuarioRepository();

  // método login() recebe um objeto (data) com username e senha
  async login(data: { username: string; senha: string }) {
    // busca usuário com o método criado no repository
    const usuario = await this.usuarioRepository.findByUsername(data.username);

    // valida a existência do usuário
    if (!usuario) {
      throw new Error("Usuário ou senha inválidos");
    }

    // compara a senha enviada com hash do banco
    const senhaCorreta = await bcrypt.compare(data.senha, usuario.senha);

    // valida a senha
    if (!senhaCorreta) {
      throw new Error("Usuário ou senha inválidos");
    }

    // retorna usuário autenticado
    return usuario;
  }
}
