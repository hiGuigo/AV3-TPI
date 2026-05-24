// esse type, diferentemente dos outros está utilizando uma extensão de tipos
// ele utiliza um módulo existente (@fastify/jwt) e adiciona novas informações à tipagem dele
// para melhor organização, ele foi separado dos demais
import "@fastify/jwt";

declare module "@fastify/jwt" {
  // essa interface (FastifyJWT) controla os tipos usados pelo Fastify
  interface FastifyJWT {
    // payload é responsável por definir o formato dos dados que
    // estarão dentro do token
    payload: {
      id: string;
      username: string;
      permissao: string;
    };

    // depois de fazer a verificação com jwtVerify() em auth.ts
    // o Fastify pega os dados do usuário e coloca em req.user
    // sem essa tipagem, o Fastify não saberia o que .user possui id, username e permissao
    user: {
      id: string;
      username: string;
      permissao: string;
    };
  }
}
