export interface Relatorio {
  id: string;
  cliente: string;
  dataEntrega: string;
  texto: string;

  aeronaveId: string;
  autorId: string;
  createdAt: string;

  autor: {
    id: string;
    username: string;
    permissao: string;
  };

  aeronave: {
    id: string;
    codigo: string;
    modelo: string;
    capacidade: number;
    alcance: number;
    tipo: string;
    createdAt: string;

    etapas: {
      id: string;
      nome: string;
      status: string;
    }[];

    pecas: {
      id: string;
      nome: string;
      tipo: string;
      fornecedor: string;
      status: string;
    }[];

    testes: {
      id: string;
      tipo: string;
      resultado: string;
      createdAt: string;
    }[];
  };
}
