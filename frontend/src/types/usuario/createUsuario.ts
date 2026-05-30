import type { Permissao } from "../permissao";

export interface CreateUsuarioData {
  nome: string;
  telefone?: string;
  endereco?: string;

  username: string;
  senha: string;
  permissao: Permissao;
}

export type FormData = {
  nome: string;
  telefone: string;
  endereco: string;

  username: string;
  senha: string;
  permissao: "";
};

export type FormErrors = {
  nome?: string;
  telefone?: string;
  endereco?: string;

  username?: string;
  senha?: string;
  permissao?: string;
};
