import { EtapaRepository } from "../repositories/etapa.repository";

export class EtapaService {
  private etapaRepository = new EtapaRepository();

  private validarTransicaoStatus(
    atual: "PENDENTE" | "ANDAMENTO" | "CONCLUIDA",
    novo: "ANDAMENTO" | "CONCLUIDA",
  ) {
    if (atual === "PENDENTE" && novo !== "ANDAMENTO") {
      throw new Error("Uma etapa pendente só pode ser iniciada");
    }

    if (atual === "ANDAMENTO" && novo !== "CONCLUIDA") {
      throw new Error("Uma etapa em andamento só pode ser concluída");
    }

    if (atual === "CONCLUIDA") {
      throw new Error("Etapa concluída não pode ser alterada");
    }
  }

  async findAll() {
    return this.etapaRepository.findMany();
  }

  async findUnique(id: string) {
    const etapa = await this.etapaRepository.findById(id);

    if (!etapa) {
      throw new Error("Etapa não encontrada");
    }

    return etapa;
  }

  async create(data: {
    prazo: string;
    nome: string;
    aeronaveId: string;
    funcionariosIds: string[];
  }) {
    return this.etapaRepository.create({
      ...data,
      status: "PENDENTE",
      prazo: new Date(data.prazo),
    });
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
      status?: "ANDAMENTO" | "CONCLUIDA";
      adicionarFuncionariosIds?: string[];
      removerFuncionariosIds?: string[];
    },
  ) {
    const etapa = await this.etapaRepository.findById(id);

    if (!etapa) {
      throw new Error("Etapa não encontrada");
    }

    const alterandoFuncionarios =
      (data.adicionarFuncionariosIds?.length || 0) > 0 ||
      (data.removerFuncionariosIds?.length || 0) > 0;

    if (etapa.status === "CONCLUIDA" && alterandoFuncionarios) {
      throw new Error(
        "Não é possível alterar funcionários de uma etapa concluída",
      );
    }

    if (data.status) {
      this.validarTransicaoStatus(etapa.status, data.status);
    }

    const funcionariosAtuaisIds = etapa.funcionarios.map(
      (funcionario) => funcionario.id,
    );

    const funcionariosRemovidos = (data.removerFuncionariosIds || []).filter(
      (id) => funcionariosAtuaisIds.includes(id),
    );

    const funcionariosAdicionados = data.adicionarFuncionariosIds || [];

    const totalFinalFuncionarios =
      funcionariosAtuaisIds.length -
      funcionariosRemovidos.length +
      funcionariosAdicionados.length;

    if (funcionariosAtuaisIds.length > 0 && totalFinalFuncionarios <= 0) {
      throw new Error(
        "Não é possível remover todos os funcionários de uma etapa",
      );
    }

    if (data.status === "CONCLUIDA" && totalFinalFuncionarios <= 0) {
      throw new Error("Etapa concluída deve possuir pelo menos um funcionário");
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
