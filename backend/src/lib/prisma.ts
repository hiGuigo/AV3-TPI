// arquivo responsável por estabelecer a conexão com o banco utilizando prisma + mariadb

// import responsável por carregar as variáveis de ambiente
import "dotenv/config";

// por conta da versão do prisma, é necessário utilizar um adapter
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// objeto responsável pelas funções de consulta no banco (findMany, create, update, etc)
import { PrismaClient } from "../../generated/prisma/client";

// no adapter é onde a conexão em si é feita
const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 10,
});

// depois de criado, o prisma recebe o adapter configurado
// de uma forma simples e ilustrativa, é o adapter quem sabe
// conectar com o banco e o prisma usa ele para executar as queries
const prisma = new PrismaClient({ adapter });

export { prisma };