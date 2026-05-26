import { PecaRepository } from "../repositories/peca.repository";

export class PecaService {
  private pecaRepository = new PecaRepository();

  private validarTransicaoPeca(
    atual: "EM_PRODUCAO" | "EM_TRANSPORTE" | "PRONTA",
    novo: "EM_PRODUCAO" | "EM_TRANSPORTE" | "PRONTA",
  ) {
    if (atual === "EM_PRODUCAO" && novo === "PRONTA") {
      throw new Error("Não é possível concluir uma peca pendente");
    }

    if (atual === "PRONTA") {
      throw new Error("Peça concluída não pode ser alterada");
    }
  }

  async findAll() {
    return this.pecaRepository.findMany();
  }

  async create(data: {
    nome: string;
    tipo: "NACIONAL" | "IMPORTADA";
    fornecedor: string;

    aeronaveId: string;
  }) {
    return this.pecaRepository.create({ ...data, status: "EM_PRODUCAO" });
  }

  async update(
    id: string,
    data: {
      nome?: string;
      tipo?: "NACIONAL" | "IMPORTADA";
      fornecedor?: string;
      status?: "EM_TRANSPORTE" | "PRONTA";
    },
  ) {
    const peca = await this.pecaRepository.findById(id);

    if (!peca) {
      throw new Error("Peça não encontrada");
    }

    if (data.status) {
      this.validarTransicaoPeca(peca.status, data.status);
    }

    return this.pecaRepository.update(id, data);
  }

  async delete(id: string) {
    const peca = await this.pecaRepository.findById(id);

    if (!peca) {
      throw new Error("Peça não encontrada");
    }

    if (peca.status === "PRONTA") {
      throw new Error("Não é possível deletar peça pronta");
    }

    return this.pecaRepository.delete(id);
  }
}
