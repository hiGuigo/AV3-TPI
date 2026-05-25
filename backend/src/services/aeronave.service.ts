import { AeronaveRepository } from "../repositories/aeronave.repository";

export class AeronaveService {
  private aeronaveRepository = new AeronaveRepository();

  async findAll() {
    return this.aeronaveRepository.findMany();
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

    return this.aeronaveRepository.delete(id);
  }
}
