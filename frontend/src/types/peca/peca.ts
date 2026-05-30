export interface Peca {
  id: string;
  nome: string;
  tipo: "NACIONAL" | "IMPORTADA";
  fornecedor: string;
  status: "EM_PRODUCAO" | "EM_TRANSPORTE" | "PRONTA";
  aeronaveId: string;
}
