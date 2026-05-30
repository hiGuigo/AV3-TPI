import { prisma } from "../lib/prisma";

export class EtapaRepository {
  async findMany() {
    return prisma.etapa.findMany({
      include: {
        aeronave: true,
        funcionarios: true,
      },
    });
  }

  async findById(id: string) {
    return prisma.etapa.findUnique({
      where: { id },
      include: {
        aeronave: true,
        funcionarios: true,
      },
    });
  }

  async create(data: {
    prazo: Date;
    nome: string;
    status: "PENDENTE";
    aeronaveId: string;
    funcionariosIds: string[];
  }) {
    return prisma.etapa.create({
      data: {
        nome: data.nome,
        prazo: data.prazo,
        status: data.status,

        aeronave: {
          connect: { id: data.aeronaveId },
        },

        funcionarios: {
          connect: data.funcionariosIds.map((id) => ({ id })),
        },
      },
      include: {
        aeronave: true,
        funcionarios: true,
      },
    });
  }

  async update(
    id: string,
    data: {
      nome?: string;
      status?: "ANDAMENTO" | "CONCLUIDA";
      adicionarFuncionariosIds?: string[];
      removerFuncionariosIds?: string[];
    },
  ) {
    return prisma.etapa.update({
      where: { id },
      data: {
        status: data.status,

        funcionarios: {
          connect: data.adicionarFuncionariosIds?.map((id) => ({ id })),

          disconnect: data.removerFuncionariosIds?.map((id) => ({ id })),
        },
      },
      include: {
        funcionarios: true,
        aeronave: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.etapa.delete({
      where: { id },
      include: {
        funcionarios: true,
        aeronave: true,
      },
    });
  }
}
