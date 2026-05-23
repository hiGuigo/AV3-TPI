// "const fastify = Fastify()" é a instância
// "FastifyInstance" é o tipo dela
// para que o TypeScript "entenda" que a instância possui os métodos
// "get()", "post()", "put()", "delete()", "register()", "listen()", ...
// é preciso informar o tipo da instância com o import
import { FastifyInstance } from "fastify";

// classe controller
import { UsuarioController } from "../controllers/usuario.controller";

// criação de uma nova instância da classe controller
const usuarioController = new UsuarioController();

// as permissões são utilizadas em muitos lugares
// para evitar repetição de código, elas são definidas em um único arquivo
import { permissoes } from "../types/usuario/permissao";

// por conta da tipagem do TypeScript, além de ser necessário informar a instância (fastify),
// é necessário também informar o tipo dela (FastifyInstance)
// essa função é chamada através do método "register()", em "server.ts"
// o "register()" é responsável por "enviar" a instância para a função "usuarioRoutes()"
// assim, ela "entende" que existe uma instância no contexto da aplicação
export async function usuarioRoutes(fastify: FastifyInstance) {
  // requisição simples para buscar todos os usuários no sistema
  // utilizao método "findAll" do controller
  fastify.get("/usuarios", usuarioController.findAll.bind(usuarioController));

  // aqui é definida a rota,
  // a validação dos campos (aceitam somente o que é passado no schema)
  // e um "bind()" para que o contexto (controller) do método de requisição
  // seja mantido quando o método for executado pelo Fastify
  fastify.post(
    "/usuarios",
    {
      // schema serve para configurar a rota (coisa do Fastify)
      // ele valida dados, gera tipagem, impede requests inválidos, entre outras coisas
      // aqui ele valida params e body, se os dois forem inválidos de alguma forma,
      // o método nem chega no controller
      schema: {
        // valida o body que está sendo enviado junto com a requisição
        body: {
          // garante que o tipo do body seja objeto
          type: "object",
          // garante que TODOS os campos enviado no body sejam obrigatórios
          required: ["username", "senha", "permissao"],
          // define quais campos são permitidos/aceitos
          properties: {
            // define os tipos de username, senha e permissao
            // um detalhe é que em permissão, somente os valores contidos em "enum" são aceitos
            // "ADMIN", "ENGENHEIRO", "OPERADOR" = ok, "GERENTE" = não ok
            // aqui todos os campos são opcionais, pois se trata de um PATCH
            username: { type: "string" },
            senha: { type: "string" },
            permissao: {
              type: "string",
              enum: permissoes,
            },
          },
        },
      },
    },

    // por fim executa o handler
    // basicamente: “execute o método create,
    // mas sempre considerando que this (contexto) é o usuarioController”
    usuarioController.create.bind(usuarioController),
  );

  // aqui no método patch, assim como nos outros,
  // existe uma validação de params, body e chamada do controller
  fastify.patch(
    "/usuarios/:id",
    {
      // schema serve para configurar a rota (coisa do Fastify)
      // ele valida dados, gera tipagem, impede requests inválidos, entre outras coisas
      // aqui ele valida params e body, se os dois forem inválidos de alguma forma,
      // o método nem chega no controller
      schema: {
        // valida o id que está sendo envido na url
        params: {
          // garante que params é do tipo objeto
          type: "object",
          // que o campo id é obrigatório (somente /usuarios não funciona na requisição patch)
          required: ["id"],
          // e define quais campos são permitidos/aceitos
          properties: {
            // valida o tipo do id ("123" = ok, 123 = não ok)
            id: { type: "string" },
          },
        },

        // valida o body que está sendo enviado junto com a requisição
        body: {
          // garante que o body também é um objeto
          type: "object",
          // define quais campos são permitidos/aceitos
          properties: {
            // garante o tipo de username, senha e permissão
            // um detalhe é que em permissão, somente os valores contidos em "enum" são aceitos
            // "ADMIN", "ENGENHEIRO", "OPERADOR" = ok, "GERENTE" = não ok
            // aqui todos os campos são opcionais, pois se trata de um PATCH
            username: { type: "string" },
            senha: { type: "string" },
            permissao: {
              type: "string",
              enum: permissoes,
            },
          },
        },
      },
    },

    // por fim, se tudo for validado corretamente, o handler é executado
    // basicamente: “execute o método create, mas sempre considerando que this (contexto) é o usuarioController”
    usuarioController.update.bind(usuarioController),
  );

  // aqui como sempre, mais fácil de entender
  // define a rota, configuração e handler
  fastify.delete(
    "/usuarios/:id",
    {
      // schema é o responsável pela configuração da rota
      schema: {
        // params garante a validação do que está sendo enviado junto com a url
        // nesse caso, o id
        params: {
          // garante o tipo de params como objeto
          type: "object",
          // garante id como obrigatório
          required: ["id"],
          // e define quais campos são aceitos
          properties: {
            id: { type: "string" },
          },
        },
      },
    },

    // quando tudo der certo no schema, o handler é acionado
    usuarioController.delete.bind(usuarioController),
  );
}
