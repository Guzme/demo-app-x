import { prisma } from "../lib/prisma";

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Naruto Test",
      email: `naruto${Date.now()}@test.com`,
      password: "123456",
    },
  });

  console.log("Usuario creado:", user);

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  console.log("Usuarios:", users);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });