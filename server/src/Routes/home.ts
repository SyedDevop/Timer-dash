import { Router } from "express";
import prisma from "../prisma";

const home = Router();

home.get("/", async (req, res) => {
  const windows = await prisma.windows.findMany({ include: { console: true } });
  res.json(windows);
});

home.post("/windows", async (req, res) => {
  const { windowName } = req.body;
  const window = await prisma.windows.create({
    data: {
      name: windowName,
      console: { create: { gpio: 1, name: "Console Number 1" } },
    },
  });
  res.json(window);
});

home.post("/console", async (req, res) => {
  const { name, gpio } = req.body;
  try {
    const console = await prisma.console.create({
      data: { gpio, name, windowsId: 1 },
    });
    res.json(console);
  } catch (error) {
    res.json(error);
  } finally {
    await prisma.$disconnect();
  }
});

export { home };
