export interface Peca {
  id: string;
  nome: string;
}

export interface Etapa {
  id: string;
  nome: string;
}

export interface Teste {
  id: string;
  tipo: string;
}

export interface Relatorio {
  id: string;
  titulo: string;
}

export interface Aeronave {
  id: string;
  codigo: string;
  modelo: string;
  capacidade: number;
  alcance: number;
  tipo: "COMERCIAL" | "MILITAR";

  pecas: Peca[];
  etapas: Etapa[];
  testes: Teste[];
  relatorios: Relatorio[];
}
