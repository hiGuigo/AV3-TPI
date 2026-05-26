import { PecaRepository } from "../repositories/peca.repository";

export class PecaService {
  private pecaRepository = new PecaRepository();

  private validarTransicaoPeca(
    atual: "EM_PRODUCAO" | "EM_TRANSPORTE" | "PRONTA",
    novo: "EM_TRANSPORTE" | "PRONTA",
  ) {
    if (atual === "EM_PRODUCAO" && novo !== "EM_TRANSPORTE") {
      throw new Error("Uma peça em produção só pode ir para transporte");
    }

    if (atual === "EM_TRANSPORTE" && novo !== "PRONTA") {
      throw new Error("Uma peça em transporte só pode ser finalizada");
    }

    if (atual === "PRONTA") {
      throw new Error("Peça pronta não pode ser alterada");
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
    usuario: {
      id: string;
      username: string;
      permissao: string;
    },
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

    if (usuario.permissao === "ENGENHEIRO") {
      const camposProibidos = ["nome", "tipo", "fornecedor"];

      const engenheiroCampoProibido = camposProibidos.some(
        (campo) => data[campo as keyof typeof data] !== undefined,
      );

      if (engenheiroCampoProibido) {
        throw new Error("Engenheiros podem alterar apenas o status da peça");
      }
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
