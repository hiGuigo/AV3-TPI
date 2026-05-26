export type UpdateTesteBody = {
  tipo?: "ELETRICO" | "HIDRAULICO" | "AERODINAMICO";
  resultado?: "APROVADO" | "REPROVADO";
};