export type UpdateAeronaveBody = {
  codigo?: string;
  modelo?: string;
  capacidade?: number;
  alcance?: number;
  tipo?: "COMERCIAL" | "MILITAR";
};