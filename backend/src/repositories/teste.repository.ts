import { prisma } from "../lib/prisma";

export class TesteRepository {
  async findMany() {
    return prisma.teste.findMany({
      include: {
        aeronave: true,
      },
    });
  }

  async findById(id: string) {
    return prisma.teste.findUnique({
      where: { id },
      include: {
        aeronave: true,
      },
    });
  }

  async create(data: {
    tipo: "ELETRICO" | "HIDRAULICO" | "AERODINAMICO";
    resultado: "PENDENTE" | "APROVADO" | "REPROVADO";
    aeronaveId: string;
  }) {
    return prisma.teste.create({
      data,
      include: {
        aeronave: true,
      },
    });
  }

  async update(
    id: string,
    data: Partial<{
      tipo: "ELETRICO" | "HIDRAULICO" | "AERODINAMICO";
      resultado: "PENDENTE" | "APROVADO" | "REPROVADO";
    }>,
  ) {
    return prisma.teste.update({
      where: { id },
      data,
      include: {
        aeronave: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.teste.delete({
      where: { id },
    });
  }
}
