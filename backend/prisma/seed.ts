import bcrypt from "bcrypt";
import { Permissao } from "../generated/prisma/enums";
import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Iniciando seed...");

  await prisma.usuario.deleteMany();

  const senhaAdmin = await bcrypt.hash("admin", 10);

  const admin = await prisma.usuario.create({
    data: {
      username: "admin",
      senha: senhaAdmin,
      permissao: Permissao.ADMIN,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
