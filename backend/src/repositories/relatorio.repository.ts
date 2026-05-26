import { prisma } from "../lib/prisma";

export class RelatorioRepository {
  async findMany() {
    return prisma.relatorio.findMany({
      include: {
        autor: {
          select: {
            id: true,
            username: true,
            permissao: true,
          },
        },

        aeronave: {
          include: {
            etapas: {
              include: {
                funcionarios: true,
              },
            },

            pecas: true,

            testes: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    return prisma.relatorio.findUnique({
      where: {
        id,
      },

      include: {
        autor: {
          select: {
            id: true,
            username: true,
            permissao: true,
          },
        },

        aeronave: {
          include: {
            etapas: {
              include: {
                funcionarios: true,
              },
            },

            pecas: true,

            testes: true,
          },
        },
      },
    });
  }

  async create(data: {
    cliente: string;
    dataEntrega: string;
    texto: string;

    aeronaveId: string;
    autorId: string;
  }) {
    return prisma.relatorio.create({
      data: {
        cliente: data.cliente,

        dataEntrega: new Date(data.dataEntrega),

        texto: data.texto,

        aeronaveId: data.aeronaveId,

        autorId: data.autorId,
      },

      include: {
        autor: {
          select: {
            id: true,
            username: true,
            permissao: true,
          },
        },

        aeronave: {
          include: {
            etapas: {
              include: {
                funcionarios: true,
              },
            },

            pecas: true,

            testes: true,
          },
        },
      },
    });
  }

  async update(
    id: string,
    data: {
      cliente?: string;
      dataEntrega?: string;
      texto?: string;
    },
  ) {
    return prisma.relatorio.update({
      where: {
        id,
      },

      data: {
        cliente: data.cliente,

        texto: data.texto,

        dataEntrega: data.dataEntrega ? new Date(data.dataEntrega) : undefined,
      },

      include: {
        autor: {
          select: {
            id: true,
            username: true,
            permissao: true,
          },
        },

        aeronave: {
          include: {
            etapas: {
              include: {
                funcionarios: true,
              },
            },

            pecas: true,

            testes: true,
          },
        },
      },
    });
  }

  async delete(id: string) {
    return prisma.relatorio.delete({
      where: {
        id,
      },
    });
  }
}
