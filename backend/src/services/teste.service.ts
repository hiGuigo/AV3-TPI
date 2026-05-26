import { TesteRepository } from "../repositories/teste.repository";

export class TesteService {
  private testeRepository = new TesteRepository();

  private validarTransicaoTeste(
    atual: "PENDENTE" | "APROVADO" | "REPROVADO",
    novo: "PENDENTE" | "APROVADO" | "REPROVADO",
  ) {
    if (
      (atual === "APROVADO" || atual === "REPROVADO") &&
      novo === "PENDENTE"
    ) {
      throw new Error("Não é possível voltar um teste para pendente");
    }

    if (atual === "APROVADO" && novo === "REPROVADO") {
      throw new Error("Não é possível reprovar um teste aprovado");
    }

    if (atual === "APROVADO") {
      throw new Error("Teste aprovado não pode ser alterado ou deletado");
    }
  }

  async findAll() {
    return this.testeRepository.findMany();
  }

  async create(data: {
    tipo: "ELETRICO" | "HIDRAULICO" | "AERODINAMICO";
    resultado: "PENDENTE" | "APROVADO" | "REPROVADO";
    aeronaveId: string;
  }) {
    return this.testeRepository.create(data);
  }

  async update(
    id: string,
    data: {
      tipo?: "ELETRICO" | "HIDRAULICO" | "AERODINAMICO";
      resultado?: "PENDENTE" | "APROVADO" | "REPROVADO";
    },
  ) {
    const teste = await this.testeRepository.findById(id);

    if (!teste) {
      throw new Error("Teste não encontrado");
    }

    if (data.resultado) {
      this.validarTransicaoTeste(teste.resultado, data.resultado);
    }

    return this.testeRepository.update(id, data);
  }

  async delete(id: string) {
    const teste = await this.testeRepository.findById(id);

    if (!teste) {
      throw new Error("Teste não encontrado");
    }

    if (teste.resultado === "APROVADO") {
      throw new Error("Não é possível deletar um teste já aprovado");
    }

    return this.testeRepository.delete(id);
  }
}
