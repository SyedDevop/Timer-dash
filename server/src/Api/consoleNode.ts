import { Router } from "express";

import prisma from "../prisma";
import { log } from "../logger";
import { ConsoleSchema } from "../Schema/console.schema";
import { $exists } from "../Utils/Prisma.utils";
import { onErrors } from "../Error/base.error";
import {
  handelConsoleCreate,
  handelConsoleDelete,
  validateBodyData,
} from "../functions";

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
// Create a new console
consoleNode.post("/", async ({ body }, res) => {
  try {
    const data = await validateBodyData(body);
    await handelConsoleCreate(data);
    return res.json({ status: 200, message: "Console created" });
  } catch (err: any) {
    onErrors(err, res);
  }
});
// Delete a console
consoleNode.delete("/:id", async ({ params }, res) => {
  try {
    const { id } = params;
    return await handelConsoleDelete(id, res);
  } catch (err: any) {
    onErrors(err, res);
  }
});

export { consoleNode };
