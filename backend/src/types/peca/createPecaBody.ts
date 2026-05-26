export type CreatePecaBody = {
  nome: string;
  tipo: "NACIONAL" | "IMPORTADA";
  fornecedor: string;
  status: "EM_PRODUCAO" | "EM_TRANSPORTE" | "PRONTA";
  aeronaveId: string;
};