import { PrismaClient } from "@prisma/client";

const consoles = [
  { gpio: 1, name: "Console Number 1", windowsId: 1 },
  { gpio: 2, name: "Console Number 2", windowsId: 1 },
  { gpio: 3, name: "Console Number 3", windowsId: 1 },
  { gpio: 4, name: "Console Number 4", windowsId: 1 },
  { gpio: 5, name: "Console Number 5", windowsId: 1 },
];

const gpios = [
  {
    io: 4,
    available: true,
  },
  {
    io: 17,
    available: true,
  },
  {
    io: 27,
    available: true,
  },
  {
    io: 22,
    available: true,
  },
  {
    io: 5,
    available: true,
  },
  {
    io: 6,
    available: true,
  },
  {
    io: 13,
    available: true,
  },
  {
    io: 19,
    available: true,
  },
  {
    io: 26,
    available: true,
  },
  {
    io: 21,
    available: true,
  },
  {
    io: 20,
    available: true,
  },
  {
    io: 16,
    available: true,
  },
  {
    io: 12,
    available: true,
  },
  {
    io: 25,
    available: true,
  },
  {
    io: 23,
    available: true,
  },
  {
    io: 24,
    available: true,
  },
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
  for (let gpio of gpios) {
    await prisma.gpio.create({
      data: gpio,
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

export {};
