import { TesteRepository } from "../repositories/teste.repository";

import { performance } from "perf_hooks";

export class TesteService {
  private testeRepository = new TesteRepository();

  private validarTransicaoTeste(
    atual: "PENDENTE" | "APROVADO" | "REPROVADO",
    novo: "PENDENTE" | "APROVADO" | "REPROVADO",
  ) {
    if (atual !== "PENDENTE") {
      throw new Error("Teste já avaliado não pode ser alterado");
    }
  }

  async findAll() {
    const inicioProcessamento = performance.now();

    const testes = await this.testeRepository.findMany();

    const fimProcessamento = performance.now();

    const tempoProcessamento = fimProcessamento - inicioProcessamento;

    console.log(
      `[Service] findAll executado em ${tempoProcessamento.toFixed(2)} ms`,
    );

    return testes;
  }

  async findUnique(id: string) {
    const teste = await this.testeRepository.findById(id);

    if (!teste) {
      throw new Error("Teste não encontrado");
    }

    return teste;
  }

  async create(data: {
    tipo: "ELETRICO" | "HIDRAULICO" | "AERODINAMICO";

    aeronaveId: string;
  }) {
    return this.testeRepository.create({ ...data, resultado: "PENDENTE" });
  }

  async update(
    usuario: {
      id: string;
      username: string;
      permissao: string;
    },
    id: string,
    data: {
      tipo?: "ELETRICO" | "HIDRAULICO" | "AERODINAMICO";
      resultado?: "APROVADO" | "REPROVADO";
    },
  ) {
    const teste = await this.testeRepository.findById(id);

    if (!teste) {
      throw new Error("Teste não encontrado");
    }

    if (usuario.permissao === "ENGENHEIRO") {
      const camposProibidos = ["tipo"];

      const engenheiroCampoProibido = camposProibidos.some(
        (campo) => data[campo as keyof typeof data] !== undefined,
      );

      if (engenheiroCampoProibido) {
        throw new Error(
          "Engenheiros podem alterar apenas o resultado do teste",
        );
      }
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

    if (teste.resultado === "APROVADO" || teste.resultado === "REPROVADO") {
      throw new Error("Não é possível deletar um teste já avaliado");
    }

    return this.testeRepository.delete(id);
  }
}
