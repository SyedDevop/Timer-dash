import { PrismaClient } from "@prisma/client";

const consoles = [
  { gpio: 1, name: "Console Number 1", windowsId: 1 },
  { gpio: 2, name: "Console Number 2", windowsId: 1 },
  { gpio: 3, name: "Console Number 3", windowsId: 1 },
  { gpio: 4, name: "Console Number 4", windowsId: 1 },
  { gpio: 5, name: "Console Number 5", windowsId: 1 },
];

const prisma = new PrismaClient();

async function main() {
  await prisma.windows.create({
    data: {
      name: "Window 1",
    },
  });
  for (let console of consoles) {
    await prisma.console.create({
      data: console,
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
