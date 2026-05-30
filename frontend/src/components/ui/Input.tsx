// essta tipagem garante que esse componente aceite todos os props normais de um html-input
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

// recebe como parâmetro:
// className, para o estilo complementar
// ..pros (disable, required, type, etc)
export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 ${className}`}
    />
  );
}