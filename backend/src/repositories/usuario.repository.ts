// importação do client do prisma
// é o client quem permite a utilização de
// create(), findMany(), update(), etc
import { prisma } from "../lib/prisma";

// as permissões são utilizadas em muitos lugares
// para evitar repetição de código, elas são definidas em um único arquivo
import { Permissao } from "../types/usuario/permissao";

export class UsuarioRepository {
  // utiliza o client para realisar o SELECT no banco
  // a fim de preservar a segurança, utiliza-se o select no return
  // para que os dados sensíveis (nesse caso a senha) não seja enviada
  async findMany() {
    return prisma.usuario.findMany({
      select: {
        id: true,
        username: true,
        permissao: true,
        createdAt: true,
      },
    });
  }

  // esse método recebe um "username" e utiliza
  // o findUnique() para validar com o banco
  // de acordo com o que é exigido no "where"
  // basicamente: "select * from usuario where usuario = ?"
  async findByUsername(username: string) {
    return prisma.usuario.findUnique({
      where: {
        username,
      },
    });
  }

  // esse método recebe como parâmetro "data" (aquilo que vem do service)
  // aqui as validações já estão feitas (senha e existência do usuário)
  async create(data: {
    username: string;
    senha: string;
    permissao: "ADMIN" | "ENGENHEIRO" | "OPERADOR";
  }) {
    // aqui o insert é feito através do "create", que utiliza "data"
    // sem o select, o prisma retornaria tudo (inclusive a senha)
    return prisma.usuario.create({
      data,
      select: {
        id: true,
        username: true,
        permissao: true,
        createdAt: true,
      },
    });
  }

  // esse método é responsável por fazer o SELECT no banco com base no id passado como parâmetro
  // utiliza o findUnique(), método do prisma, para fazer a pesquisa
  // basicamente "SELECT * FROM usuario WHERE id = ?"
  async findById(id: string) {
    return prisma.usuario.findUnique({
      where: {
        id,
      },
    });
  }

  // esse método é o responsável por fazer o UPDATE no banco com base no parâmetro id
  // o segundo parâmetro (data) é quem define qual campo será atualizado (todos são opcionais)
  // aqui é utilizado o type "Permissao", definido em "permissao.ts", a fim de garantir a tipagem
  async update(
    id: string,
    data: {
      username?: string;
      senha?: string;
      permissao?: Permissao;
    },
  ) {
    // aqui é definido qual usuário será alterado (com o where)
    // quais campos (data)
    // e o que será retornado (select), novamente, ocultando dados sensíveis
    return prisma.usuario.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        username: true,
        permissao: true,
        createdAt: true,
      },
    });
  }

  // esse método é o responsável por fazer o DELETE no banco com base no parâmetro id
  // o usuário a ser deletado é definido com o where
  // e o select garante que os dados sensíveis não sejam retornados na resposta
  async delete(id: string) {
    return prisma.usuario.delete({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        permissao: true,
        createdAt: true,
      },
    });
  }
}
