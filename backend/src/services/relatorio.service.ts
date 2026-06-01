import { RelatorioRepository } from "../repositories/relatorio.repository";
import { AeronaveRepository } from "../repositories/aeronave.repository";
import { UsuarioRepository } from "../repositories/usuario.repository";

import { performance } from "perf_hooks";

export class RelatorioService {
  private relatorioRepository = new RelatorioRepository();
  private aeronaveRepository = new AeronaveRepository();
  private usuarioRepository = new UsuarioRepository();

  async findAll() {
    const inicioProcessamento = performance.now();

    const relatorios = await this.relatorioRepository.findMany();

    const fimProcessamento = performance.now();

    const tempoProcessamento = fimProcessamento - inicioProcessamento;

    console.log(
      `[Service] findAll executado em ${tempoProcessamento.toFixed(2)} ms`,
    );

    return relatorios;
  }

  async findUnique(id: string) {
    const relatorio = await this.relatorioRepository.findById(id);

    if (!relatorio) {
      throw new Error("Relatório não encontrado");
    }

    return relatorio;
  }

  async create(data: {
    cliente: string;
    dataEntrega: string;
    texto: string;
    aeronaveId: string;
    autorId: string;
  }) {
    const aeronave = await this.aeronaveRepository.findById(data.aeronaveId);

    if (!aeronave) {
      throw new Error("Aeronave não encontrada");
    }

    const autor = await this.usuarioRepository.findById(data.autorId);

    if (!autor) {
      throw new Error("Autor não encontrado");
    }

    if (autor.permissao !== "ADMIN" && autor.permissao !== "ENGENHEIRO") {
      throw new Error("Usuário sem permissão para gerar relatório");
    }

    const dataEntrega = new Date(data.dataEntrega);

    if (isNaN(dataEntrega.getTime())) {
      throw new Error("Data de entrega inválida");
    }

    return this.relatorioRepository.create({
      ...data,
      dataEntrega: data.dataEntrega,
    });
  }

  async update(
    id: string,
    data: {
      cliente?: string;
      dataEntrega?: string;
      texto?: string;
    },
  ) {
    const relatorio = await this.relatorioRepository.findById(id);

    if (!relatorio) {
      throw new Error("Relatório não encontrado");
    }

    return this.relatorioRepository.update(id, data);
  }

  async delete(id: string) {
    const relatorio = await this.relatorioRepository.findById(id);

    if (!relatorio) {
      throw new Error("Relatório não encontrado");
    }

    return this.relatorioRepository.delete(id);
  }
}
