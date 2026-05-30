// bcrypt para criptografia da senha
import bcrypt from "bcrypt";

// importação do módulo perf_hooks para medição das métricas
import { performance } from "perf_hooks";

// o service não "conversa" diretamente com o banco, ele delega isso para o repository
import { UsuarioRepository } from "../repositories/usuario.repository";

// as permissões são utilizadas em muitos lugares
// para evitar repetição de código, elas são definidas em um único arquivo
import { Permissao } from "../types/auth/permissao";

export class UsuarioService {
  // criação da instância do repository
  // com isso é possível utilizar no service os métodos create(), findMany(), etc
  private usuarioRepository = new UsuarioRepository();

  // utiliza o método findMany do repositório para retornar o resultado
  // para o controller
  async findAll() {
    // medidores de tempo de processamento aplicados na rota GET /usuarios
    const inicioProcessamento = performance.now();

    const usuarios = await this.usuarioRepository.findMany();

    const fimProcessamento = performance.now();

    const tempoProcessamento = fimProcessamento - inicioProcessamento;

    console.log(
      `[Service] findAll executado em ${tempoProcessamento.toFixed(2)} ms`,
    );

    return usuarios;
  }

  async findUnique(id: string) {
    const usuario = await this.usuarioRepository.findById(id);

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    return usuario;
  }

  // esse é o método responsável por criar o usuário
  // e exige um objeto exatamente nesse formato
  async create(data: {
    username: string;
    senha: string;
    permissao: Permissao;
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

  // aqui o método é responsável por algumas coisas (feitas também no create):
  // verificar a existência do usuário, impedir usernames duplicados, criptografar a senha e atualizar propriamente o usuário
  // recebe como parâmetro id e data, sendo que todos os campos em data são opcionais
  async update(
    id: string,
    data: {
      username?: string;
      senha?: string;
      permissao?: Permissao;
    },
  ) {
    // aqui é validada a exisência do usuário utilizando o método findById()
    // criado em usuario.repository.ts
    const usuarioExiste = await this.usuarioRepository.findById(id);

    // caso o método retorne null, o if é acionado
    // aqui o erro não é tratado de fato, apenas "enviado" para o controller
    // o controller é quem é o responsável pela exibição do erro para o usuário
    if (!usuarioExiste) {
      throw new Error("Usuário não encontrado");
    }

    // aqui é feita a validação do nome de usuário
    // o primeiro if verifica se o campo "username" está sendo alterado
    // e a lógica interna verifica se o nome já está em uso
    if (data.username) {
      const usernameExiste = await this.usuarioRepository.findByUsername(
        data.username,
      );

      // o segundo if evita conflito quando o usuário altera os próprios dados
      // a primeira parte verifica se foi encontrado alguém com o username informado
      // a segunda verifica se encontrou outro usuário com username igual e id diferente
      // é a lógica mais complicada de entedender, mas basicamente:
      // "se existe um usuário com esse username E esse usuário NÃO sou eu, então HÁ conflito"
      if (usernameExiste && usernameExiste.id !== id) {
        throw new Error("Nome de usuário já está em uso");
      }
    }

    // aqui é criado o objeto que será enviado para atualização
    // "...data" é o spread operator para "desfragmentar" o conteúdo de data
    // a lógica de criar um objeto novo é importante porque o campo senha vai ser alterado depois
    // assim, o objeto original não é alterado diretamente
    const updateData = {
      ...data,
    };

    // se senha vier no body, aplica hash
    if (data.senha) {
      // alteração do campo senha com a senha criptografada
      updateData.senha = await bcrypt.hash(data.senha, 10);
    }

    // depois de todas as regras serem validadas, aí sim o service manda
    // a atualização para o repository executar
    return this.usuarioRepository.update(id, updateData);
  }

  // aqui é bem simples: recebe o parâmetro id,
  // verifica a existência do usuário,
  // se não existir, não executa o delete,
  // se existir, executa normalmente
  async delete(
    usuario: {
      id: string;
      username: string;
      permissao: string;
    },
    id: string,
  ) {
    const usuarioExiste = await this.usuarioRepository.findById(id);

    if (!usuarioExiste) {
      throw new Error("Usuário não encontrado");
    }

    // impede que o usuário delete a si mesmo
    if (usuario.id === id) {
      throw new Error("Você não pode deletar a si próprio");
    }

    // garante que sempre haverá pelo menos um usuário administrado no sistema
    const usuarios = await this.usuarioRepository.findMany();
    const totalAdmins = usuarios.filter((u) => u.permissao === "ADMIN").length;

    if (usuarioExiste.permissao === "ADMIN" && totalAdmins === 1) {
      throw new Error("O sistema deve possuir pelo menos um administrador");
    }

    return this.usuarioRepository.delete(id);
  }
}
