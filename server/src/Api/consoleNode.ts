import { Router } from "express";
import prisma from "../prisma";

const consoleNode = Router();

consoleNode.get("/", async ({ query }, res) => {
  try {
    const include =
      query.gpio === "true" ? { include: { Gpio: true } } : undefined;
    const console = await prisma.console.findMany(include);
    res.json(console);
  } catch (error) {
    res.json(error);
  } finally {
    await prisma.$disconnect();
  }
});
consoleNode.post("/", async (req, res) => {
  const { name, gpio } = req.body;
  console.log({ name, gpio });
  res.json({ name, gpio });
  // try {
  //   const console = await prisma.console.create({
  //     data: { gpio, name, windowsId: 1 },
  //   });
  //   res.json(console);
  // } catch (error) {
  //   res.json(error);
  // } finally {
  //   await prisma.$disconnect();
  // }
});

export { consoleNode };
