// importação do client do prisma
// é o client quem permite a utilização de
// create(), findMany(), update(), etc
import { prisma } from "../lib/prisma";

export class UsuarioRepository {
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
}
