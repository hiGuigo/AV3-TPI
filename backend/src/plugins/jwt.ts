// a função desse plugin é configurar a autenticação

// aqui fp "recebe" fastify-plugin
// transformando esse arquivo em um plugin "oficial" do Fastify
// dentre muitas coisas, isso é feito para facilitar o desenvolvimento
import fp from "fastify-plugin";

// aqui importa o plugin oficial do Fastify
import jwt from "@fastify/jwt";

// o plugin fp recebe como parâmetro uma instância fastify
export default fp(async (fastify) => {
  // para que as funcionalidades do jwt possam ser utilizadas, é preciso registrar
  // o plugin jwt na instância recebida no parâmetro
  fastify.register(jwt, {
    // o secret é a assinatura da validação
    // quando o jwt é criado, a assinatura é atrelada a ele
    // quando for feita qualquer verificação do token e a assinatura diferir,
    // então o resultado é: usuário não autorizado
    secret: process.env.JWT_SECRET ||  "vR7mQ2xN9pL4kT8aH1sD6wZ3uJ5cF0eY",
  });
});