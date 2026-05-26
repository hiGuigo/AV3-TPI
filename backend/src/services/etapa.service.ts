import { EtapaRepository } from "../repositories/etapa.repository";

export class EtapaService {
  private etapaRepository = new EtapaRepository();

  private validarTransicaoStatus(
    atual: "PENDENTE" | "ANDAMENTO" | "CONCLUIDA",
    novo: "PENDENTE" | "ANDAMENTO" | "CONCLUIDA",
  ) {
    if (atual === "PENDENTE" && novo === "CONCLUIDA") {
      throw new Error("Não é possível concluir uma etapa pendente");
    }

    if (atual === "ANDAMENTO" && novo === "PENDENTE") {
      throw new Error("Não é possível voltar uma etapa para pendente");
    }

    if (atual === "CONCLUIDA") {
      throw new Error("Etapa concluída não pode ser alterada ou deletada");
    }
  }

  async findAll() {
    return this.etapaRepository.findMany();
  }

  async create(data: {
    prazo: string;
    status: "PENDENTE" | "ANDAMENTO" | "CONCLUIDA";
    aeronaveId: string;
    funcionariosIds: string[];
  }) {
    return this.etapaRepository.create({
      ...data,
      prazo: new Date(data.prazo),
    });
  }

  async update(
    id: string,
    data: {
      status?: "PENDENTE" | "ANDAMENTO" | "CONCLUIDA";
      adicionarFuncionariosIds?: string[];
      removerFuncionariosIds?: string[];
    },
  ) {
    const etapa = await this.etapaRepository.findById(id);

    if (!etapa) {
      throw new Error("Etapa não encontrada");
    }

    if (data.status) {
      this.validarTransicaoStatus(etapa.status, data.status);
    }

    const alterandoFuncionarios =
      data.adicionarFuncionariosIds?.length ||
      data.removerFuncionariosIds?.length;

    if (etapa.status === "CONCLUIDA" && alterandoFuncionarios) {
      throw new Error(
        "Não é possível alterar funcionários de uma etapa concluída",
      );
    }

    return this.etapaRepository.update(id, data);
  }

  async delete(id: string) {
    const etapa = await this.etapaRepository.findById(id);

    if (!etapa) {
      throw new Error("Etapa não encontrada");
    }

    if (etapa.status === "CONCLUIDA") {
      throw new Error("Não é possível deletar uma etapa concluída");
    }

    return this.etapaRepository.delete(id);
  }
}
