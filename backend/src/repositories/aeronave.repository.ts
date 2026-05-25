import { prisma } from "../lib/prisma";

export class AeronaveRepository {
  async findMany() {
    return prisma.aeronave.findMany({
      include: {
        pecas: true,
        etapas: true,
        testes: true,
        relatorios: true,
      },
    });
  }

  async findById(id: string) {
    return prisma.aeronave.findUnique({
      where: { id },
      include: {
        pecas: true,
        etapas: true,
        testes: true,
        relatorios: true,
      },
    });
  }

  async findByCodigo(codigo: string) {
    return prisma.aeronave.findUnique({
      where: { codigo },
    });
  }

  async create(data: {
    codigo: string;
    modelo: string;
    capacidade: number;
    alcance: number;
    tipo: "COMERCIAL" | "MILITAR";
  }) {
    return prisma.aeronave.create({
      data,
    });
  }

  async update(
    id: string,
    data: Partial<{
      codigo: string;
      modelo: string;
      capacidade: number;
      alcance: number;
      tipo: "COMERCIAL" | "MILITAR";
    }>,
  ) {
    return prisma.aeronave.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.aeronave.delete({
      where: { id },
    });
  }
}
