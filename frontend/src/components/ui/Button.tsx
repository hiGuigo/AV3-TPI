// essa tipagem garante que esse componente irá aceitar todos os props normais de um html-button
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

// como parâmetro ele terá:
// className, então quando for declarado, o estilo será seja lá o que tiver vindo
// children, ou seja, o conteúdo, o texto do botão (<>children</>)
// e ...pros, que engloba todas as props restantes (type, disabled, required, etc)
export function Button({ className = "", children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      // className é o padrão, e ${className} são os estilos a adicionais
      className={`rounded-lg font-semibold text-white transition disabled:opacity-50 hover:opacity-80 ${className}`}
    >
      {/* renderiza o conteúdo dentro do botão */}
      {children}
    </button>
  );
}
