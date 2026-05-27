// tipagem da mensagem
type ErrorMessageProps = {
  message: string;
};

// { message } = desestruturação das props
// ao invés de fazer, props.message, pega message direto
export function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className="text-sm text-red-500">{message}</p>;
}
