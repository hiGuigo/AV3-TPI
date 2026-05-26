import { prisma } from "../lib/prisma";

export class PecaRepository {
  async findMany() {
    return prisma.peca.findMany({
      include: {
        aeronave: true,
      },
    });
  }

  async findById(id: string) {
    return prisma.peca.findUnique({
      where: { id },
      include: {
        aeronave: true,
      },
    });
  }

  async create(data: {
    nome: string;
    tipo: "NACIONAL" | "IMPORTADA";
    fornecedor: string;
    status: "EM_PRODUCAO" | "EM_TRANSPORTE" | "PRONTA";
    aeronaveId: string;
  }) {
    return prisma.peca.create({
      data,
      include: {
        aeronave: true,
      },
    });
  }

  async update(
    id: string,
    data: Partial<{
      nome: string;
      tipo: "NACIONAL" | "IMPORTADA";
      fornecedor: string;
      status: "EM_PRODUCAO" | "EM_TRANSPORTE" | "PRONTA";
    }>,
  ) {
    return prisma.peca.update({
      where: { id },
      data,
      include: {
        aeronave: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.peca.delete({
      where: { id },
    });
  }
}
