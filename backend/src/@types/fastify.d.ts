// esse type, diferentemente dos outros está utilizando uma extensão de tipos
// ele informa ao TypeScript que o objeto FastifyRequest terá uma nova propriedade: inicio
// o propósito disso é medir o tempo de processamento interno do servidor
// para melhor organização, ele foi separado dos demais

import "fastify";

declare module "fastify" {
  interface FastifyRequest {
    inicio: number;
  }
}
