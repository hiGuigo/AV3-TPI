// bcrypt para criptografia da senha
import bcrypt from "bcrypt";

// o service não "conversa" diretamente com o banco, ele delega isso para o repository
import { UsuarioRepository } from "../repositories/usuario.repository";

export class UsuarioService {
  // criação da instância do repository
  // com isso é possível utilizar no service os métodos create(), findMany(), etc
  private usuarioRepository = new UsuarioRepository();

  // esse é o método responsável por criar o usuário
  // e exige um objeto exatamente nesse formato
  async create(data: {
    username: string;
    senha: string;
    permissao: "ADMIN" | "ENGENHEIRO" | "OPERADOR";
  }) {
    // primeira regra de negócio explícita: o usuário não pode ser cadastrado se já existir
    // aqui o service utiliza o método findByUsername() (graças a instância usuarioRepository)
    // e aguarda (await) o resultado enviado por "usuario.repository.ts"
    const usuarioExiste = await this.usuarioRepository.findByUsername(
      data.username,
    );

    // tratamento de erro caso o resultado retorne usuário existente
    if (usuarioExiste) {
      throw new Error("Usuário já existe");
    }

    // utilizando bycrypt para aplicar o hash na senha do usuário
    // 10 é o número padrão de "salt rounds" e quanto maior, mais difícil
    // é a descriptografia, porém, quanto maior o número, maior o processamento
    const senhaHash = await bcrypt.hash(data.senha, 10);

    // aqui é onde acontece o registro no banco, onde o usuário é salvo de fato
    // declarar "...data" faz com que o objeto se "fragmente"
    // data = {
    //   username: "nome",
    //   senha: "123",
    //   permissao: "ADMIN",
    // };
    // então "...data":
    // {
    //   username: "gui",
    //   senha: "123",
    //   permissao: "ADMIN"
    // }
    // por fim, "senha" é sobrescrita com o "hash" criado anteriormente
    return this.usuarioRepository.create({
      ...data,
      senha: senhaHash,
    });
  }

  async findAll() {
    return this.usuarioRepository.findMany();
  }
}
