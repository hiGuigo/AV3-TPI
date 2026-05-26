export type CreateTesteBody = {
  tipo: "ELETRICO" | "HIDRAULICO" | "AERODINAMICO";
  resultado: "PENDENTE" | "APROVADO" | "REPROVADO";
  aeronaveId: string;
};
