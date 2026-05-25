import { prisma } from "../lib/prisma";

export class FuncionarioRepository {
  async findMany() {
    return prisma.funcionario.findMany();
  }

  async findById(id: string) {
    return prisma.funcionario.findUnique({
      where: { id },
    });
  }

  async findIdUsuarioEmUso(usuarioId: string) {
    return prisma.funcionario.findFirst({
      where: { usuarioId },
    });
  }

  async create(data: {
    nome: string;
    telefone?: string;
    endereco?: string;
    usuarioId?: string;
  }) {
    return prisma.funcionario.create({
      data,
      select: {
        id: true,
        nome: true,
        telefone: true,
        endereco: true,
        usuarioId: true,
      },
    });
  }

  async update(
    id: string,
    data: {
      nome?: string;
      telefone?: string;
      endereco?: string;
      usuarioId?: string;
    },
  ) {
    return prisma.funcionario.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.funcionario.delete({
      where: { id },
    });
  }
}
