import { AeronaveRepository } from "../repositories/aeronave.repository";

import { performance } from "perf_hooks";

export class AeronaveService {
  private aeronaveRepository = new AeronaveRepository();

  async findAll() {
    const inicioProcessamento = performance.now();

    const aeronaves = await this.aeronaveRepository.findMany();

    const fimProcessamento = performance.now();

    const tempoProcessamento = fimProcessamento - inicioProcessamento;

    console.log(
      `[Service] findAll executado em ${tempoProcessamento.toFixed(2)} ms`,
    );

    return aeronaves;
  }

  async findUnique(id: string) {
    const aeronave = await this.aeronaveRepository.findById(id);

    if (!aeronave) {
      throw new Error("Aeronave não encontrada");
    }

    return aeronave;
  }

  async create(data: {
    codigo: string;
    modelo: string;
    capacidade: number;
    alcance: number;
    tipo: "COMERCIAL" | "MILITAR";
  }) {
    const existe = await this.aeronaveRepository.findByCodigo(data.codigo);

    if (existe) {
      throw new Error("Código da aeronave já existe");
    }

    return this.aeronaveRepository.create(data);
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
    const aeronave = await this.aeronaveRepository.findById(id);

    if (!aeronave) {
      throw new Error("Aeronave não encontrada");
    }

    if (data.codigo) {
      const codigoExiste = await this.aeronaveRepository.findByCodigo(
        data.codigo,
      );

      if (codigoExiste && codigoExiste.id !== id) {
        throw new Error("Código já está em uso");
      }
    }

    return this.aeronaveRepository.update(id, data);
  }

  async delete(id: string) {
    const aeronave = await this.aeronaveRepository.findById(id);

    if (!aeronave) {
      throw new Error("Aeronave não encontrada");
    }

    if (aeronave.etapas.length > 0) {
      throw new Error("Não é possível deletar aeronaves com etapas vinculadas");
    }

    if (aeronave.pecas.length > 0) {
      throw new Error("Não é possível deletar aeronaves com peças vinculadas");
    }

    if (aeronave.testes.length > 0) {
      throw new Error("Não é possível deletar aeronaves com testes vinculados");
    }

    return this.aeronaveRepository.delete(id);
  }
}
