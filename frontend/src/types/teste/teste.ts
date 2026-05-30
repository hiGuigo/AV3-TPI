export type TipoTeste = "ELETRICO" | "HIDRAULICO" | "AERODINAMICO";

export type ResultadoTeste = "PENDENTE" | "APROVADO" | "REPROVADO";

export interface Teste {
  id: string;
  tipo: TipoTeste;
  resultado: ResultadoTeste;w
  createdAt: string;
  aeronaveId: string;
}
