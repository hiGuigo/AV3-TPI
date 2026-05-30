export interface Teste {
  id: string;
  tipo: "ELETRICO" | "HIDRAULICO" | "AERODINAMICO";
  resultado: "PENDENTE" | "APROVADO" | "REPROVADO";
  createdAt: string;
  aeronaveId: string;
}
