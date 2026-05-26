export type CreatePecaBody = {
  nome: string;
  tipo: "NACIONAL" | "IMPORTADA";
  fornecedor: string;
  aeronaveId: string;
};