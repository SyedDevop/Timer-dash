import { Response } from "express";
import { log } from "../logger";
import prisma from "../prisma";
import { ConsoleSchema } from "../Schema/console.schema";
import { $exists } from "../Utils/Prisma.utils";

export const handelConsoleCreate = async (data: {
  name: string;
  gpio: number;
  windowsId: number;
}) => {
  try {
    await prisma.gpio
      .findMany({
        where: {
          io: data.gpio,
        },
      })
      .then($exists);
    const resConsole = await prisma.console.create({
      data,
    });
    const resGpio = await prisma.gpio.update({
      where: { io: data.gpio },
      data: { available: false, consoleId: resConsole.id },
    });
    log.info(`Console ${resConsole.name} created`);
    log.info(`Gpio ${resGpio.io} assigned to console ${resConsole.name}`);
  } catch (error) {
    throw error;
  }
};

export const validateBodyData = async (data: any) => {
  try {
    const valid = await ConsoleSchema.validate(data, {
      abortEarly: false,
    });
    return valid;
  } catch (error) {
    throw error;
  }
};

export const handelConsoleDelete = async (id: string, res: Response) => {
  const console = await prisma.console.findUnique({
    where: { id },
    include: { Gpio: true },
  });
  if (!console) {
    return res.json({ status: 404, message: "Console not found" });
  }
  await prisma.console.delete({ where: { id } });
  return res.json({ status: 200, message: "Console deleted" });
};
