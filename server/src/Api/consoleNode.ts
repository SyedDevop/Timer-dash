import { Request, Response, Router } from "express";
import { ValidationError } from "yup";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

import prisma from "../prisma";
import { log } from "../logger";
import { ConsoleApi } from "../@types";
import { ConsoleSchema } from "../Schema/console.schema";
import { $exists } from "../Utils/Prisma.utils";

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
consoleNode.post("/", async ({ body }, res) => {
  try {
    const data = await validateBodyData(body);
    await handelConsoleCreate(data);
    return res.json({ status: 200, message: "Console created" });
  } catch (err: any) {
    if (err instanceof PrismaClientKnownRequestError) {
      return handelPrismaError(err, res);
    }
    if (err instanceof ValidationError) {
      return handelYupError(err, res);
    }
    if (err instanceof Error) {
      return handelError(err, res);
    }
  }
});

export { consoleNode };

const handelConsoleCreate = async (data: {
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

const validateBodyData = async (data: any) => {
  try {
    const valid = await ConsoleSchema.validate(data, {
      abortEarly: false,
    });
    return valid;
  } catch (error) {
    throw error;
  }
};

const handelPrismaError = (
  err: PrismaClientKnownRequestError,
  res: Response
) => {
  const { code, name, meta } = err;
  log.error(err);
  return res
    .status(400)
    .json({ status: 400, message: [meta, { code }, { name }] });
};

const handelYupError = (err: ValidationError, res: Response) => {
  log.error(err.errors);
  return res
    .status(400)
    .json({ error: { status: "failed", message: err.errors } });
};

const handelError = (err: Error, res: Response) => {
  log.error(err);
  return res
    .status(400)
    .json({ error: { status: "failed", message: err.message } });
};
