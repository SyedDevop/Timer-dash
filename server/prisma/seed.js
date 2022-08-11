import { PrismaClient } from "@prisma/client";

const consoles = [
  { gpio: 4, name: "Console Number 1", windowsId: 1 },
  { gpio: 17, name: "Console Number 2", windowsId: 1 },
  { gpio: 27, name: "Console Number 3", windowsId: 1 },
  { gpio: 22, name: "Console Number 4", windowsId: 1 },
  { gpio: 5, name: "Console Number 5", windowsId: 1 },
];

const gpios = [
  {
    io: 4,
    available: false,
    windowsId: 1,
  },
  {
    io: 17,
    available: false,
    windowsId: 1,
  },
  {
    io: 27,
    available: false,
    windowsId: 1,
  },
  {
    io: 22,
    available: false,
    windowsId: 1,
  },
  {
    io: 5,
    available: false,
    windowsId: 1,
  },
  {
    io: 6,
    available: true,
    windowsId: 1,
  },
  {
    io: 13,
    available: true,
    windowsId: 1,
  },
  {
    io: 19,
    available: true,
    windowsId: 1,
  },
  {
    io: 26,
    available: true,
    windowsId: 1,
  },
  {
    io: 21,
    available: true,
    windowsId: 1,
  },
  {
    io: 20,
    available: true,
    windowsId: 1,
  },
  {
    io: 16,
    available: true,
    windowsId: 1,
  },
  {
    io: 12,
    available: true,
    windowsId: 1,
  },
  {
    io: 25,
    available: true,
    windowsId: 1,
  },
  {
    io: 23,
    available: true,
    windowsId: 1,
  },
  {
    io: 24,
    available: true,
    windowsId: 1,
  },
];

const prisma = new PrismaClient();

async function main() {
  await prisma.windows.create({
    data: {
      name: "Window 1",
    },
  });
  for (let gpio of gpios) {
    await prisma.gpio.create({
      data: gpio,
    });
  }
  for (let console of consoles) {
    const res = await prisma.console.create({
      data: console,
    });
    res.id;
    await prisma.gpio.update({
      where: {
        io: console.gpio,
      },
      data: {
        consoleId: res.id,
      },
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
