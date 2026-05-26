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

    if (atual === "EM_TRANSPORTE" && novo === "EM_PRODUCAO") {
      throw new Error("Não é possível voltar uma peça para EM_TRANSPORTE");
    }

    if (atual === "PRONTA") {
      throw new Error("Peça concluída não pode ser alterada ou deletada");
    }
  }

  async findAll() {
    return this.pecaRepository.findMany();
  }

  async create(data: {
    nome: string;
    tipo: "NACIONAL" | "IMPORTADA";
    fornecedor: string;
    status: "EM_PRODUCAO" | "EM_TRANSPORTE" | "PRONTA";
    aeronaveId: string;
  }) {
    return this.pecaRepository.create(data);
  }

  async update(
    id: string,
    data: {
      nome?: string;
      tipo?: "NACIONAL" | "IMPORTADA";
      fornecedor?: string;
      status?: "EM_PRODUCAO" | "EM_TRANSPORTE" | "PRONTA";
    },
  ) {
    const peca = await this.pecaRepository.findById(id);

    if (!peca) {
      throw new Error("Peça não encontrada");
    }

    if (data.status) {
      this.validarTransicaoPeca(peca.status, data.status);
    }

    if (peca.status === "PRONTA") {
      throw new Error("Peça pronta não pode ser alterada");
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
