import { Router } from "express";
import prisma from "../prisma";
const home = Router();

home.get("/", async (_, res) => {
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

export { home };
