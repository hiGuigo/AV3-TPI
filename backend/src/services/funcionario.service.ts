import { Permissao } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

import { FuncionarioRepository } from "../repositories/funcionario.repository";

import { performance } from "perf_hooks";

export class FuncionarioService {
  private funcionarioRepository = new FuncionarioRepository();

  async findAll() {
    const inicioProcessamento = performance.now();

    const funcionarios = await this.funcionarioRepository.findMany();

    const fimProcessamento = performance.now();

    const tempoProcessamento = fimProcessamento - inicioProcessamento;

    console.log(
      `[Service] findAll executado em ${tempoProcessamento.toFixed(2)} ms`,
    );

    return funcionarios;
  }

  async create(data: {
    nome: string;
    telefone?: string;
    endereco?: string;
    usuarioId?: string;
  }) {
    if (data.usuarioId) {
      const usuarioExiste = await prisma.usuario.findUnique({
        where: { id: data.usuarioId },
      });

      if (!usuarioExiste) {
        throw new Error("Usuário não existe");
      }

      const usuarioEmUso = await this.funcionarioRepository.findIdUsuarioEmUso(
        data.usuarioId,
      );

      if (usuarioEmUso) {
        throw new Error("Este usuário já está vinculado a outro funcionário");
      }
    }

    return this.funcionarioRepository.create(data);
  }

  async createWithUser(data: {
    nome: string;
    telefone?: string;
    endereco?: string;

    username: string;
    senha: string;
    permissao: Permissao;
  }) {
    const usuarioExiste = await prisma.usuario.findUnique({
      where: { username: data.username },
    });

    if (usuarioExiste) {
      throw new Error("Usuário já existe");
    }

    const senhaHash = await bcrypt.hash(data.senha, 10);

    return prisma.$transaction(async (tx) => {
      const usuario = await tx.usuario.create({
        data: {
          username: data.username,
          senha: senhaHash,
          permissao: data.permissao,
        },
      });

      const funcionario = await tx.funcionario.create({
        data: {
          nome: data.nome,
          telefone: data.telefone,
          endereco: data.endereco,
          usuarioId: usuario.id,
        },
      });

      return funcionario;
    });
  }

  async update(
    id: string,
    data: {
      nome?: string;
      telefone?: string;
      endereco?: string;
      usuarioId?: string;
    },
  ) {
    const funcionario = await this.funcionarioRepository.findById(id);

    if (!funcionario) {
      throw new Error("Funcionário não encontrado");
    }

    if (data.usuarioId) {
      const usuarioExiste = await prisma.usuario.findUnique({
        where: { id: data.usuarioId },
      });

      if (!usuarioExiste) {
        throw new Error("Usuário não existe");
      }

      const usuarioEmUso = await this.funcionarioRepository.findIdUsuarioEmUso(
        data.usuarioId,
      );

      if (usuarioEmUso) {
        throw new Error("Este usuário já está vinculado a outro funcionário");
      }
    }

    return this.funcionarioRepository.update(id, data);
  }

  async delete(id: string) {
    const funcionario = await this.funcionarioRepository.findById(id);

    if (!funcionario) {
      throw new Error("Funcionário não encontrado");
    }

    return this.funcionarioRepository.delete(id);
  }
}
