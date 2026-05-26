export type UpdateTesteBody = {
  tipo?: "ELETRICO" | "HIDRAULICO" | "AERODINAMICO";
  resultado?: "PENDENTE" | "APROVADO" | "REPROVADO";
};