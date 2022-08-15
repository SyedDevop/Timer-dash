import { Response } from "express";
import { log } from "../logger";
import prisma from "../prisma";
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
    const resGpio = await connectGpioToConsole(data.gpio, resConsole.id);
    log.info(`Console ${resConsole.name} created`);
    log.info(`Gpio ${resGpio.io} assigned to console ${resConsole.name}`);
  } catch (error) {
    throw error;
  }
};

export const handelConsoleDelete = async (id: string, res: Response) => {
  const isAConsole = await prisma.console.findUnique({
    where: { id },
    include: { Gpio: true },
  });
  if (!isAConsole) {
    return res.json({ status: 404, message: "Console not found" });
  }
  const resConsole = await prisma.console.delete({
    where: { id },
    include: { Gpio: true },
  });
  await gpioReset(resConsole.Gpio?.id);
  return res.json({ status: 200, message: "Console deleted" });
};

export const handelConsoleUpdate = async (
  id: string,
  data: { name?: string; gpio?: number },
  res: Response
) => {
  try {
    if (data.gpio === undefined) {
      await prisma.console.update({
        where: { id },
        data,
      });
      return res.json({ status: 200, message: "Console name updated" });
    }
    const resConsole = await prisma.console.update({
      where: { id: id },
      data: {
        gpio: data.gpio,
        name: data.name,
        Gpio: {
          update: {
            available: true,
          },
          disconnect: true,
        },
      },
    });
    await connectGpioToConsole(resConsole.gpio, resConsole.id);
    return res.json({ status: 200, message: "Console updated" });
  } catch (error) {
    throw error;
  }
};

export const gpioReset = async (id?: number) => {
  try {
    await prisma.gpio.update({
      where: { id },
      data: { available: true, consoleId: null },
    });
  } catch (error) {
    throw error;
  }
};

export const connectGpioToConsole = async (io: number, consoleId: string) => {
  try {
    return await prisma.gpio.update({
      where: { io },
      data: { available: false, consoleId },
    });
  } catch (error) {
    throw error;
  }
};
