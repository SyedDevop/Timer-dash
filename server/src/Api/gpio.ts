import { Prisma } from "@prisma/client";
import { Router, Request, Response } from "express";
import prisma from "../prisma";

const gpios = Router();

gpios.get("/", async (req: Request, res: Response) => {
  const { available } = req.query;
  const options: Prisma.GpioFindManyArgs = {
    where: { available: true },
    include: { windows: true },
  };
  if (available !== "true") delete options.where;
  try {
    const gpios = await prisma.gpio.findMany(options);
    res.json(gpios);
  } catch (error) {
    res.json(error);
  } finally {
    await prisma.$disconnect();
  }
});

gpios.post("/", async (req: Request, res: Response) => {
  // const { name, available, windows } = req.body;
  console.log(req.body);
  res.json(req.body);
});

export { gpios };
