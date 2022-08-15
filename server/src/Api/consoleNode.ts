import { Router } from "express";

import prisma from "../prisma";
import { onErrors } from "../Error/base.error";
import {
  handelConsoleCreate,
  handelConsoleDelete,
  handelConsoleUpdate,
} from "../functions";
import { validGetConsoleData, validUpdateConsoleData } from "../Validation";

const consoleNode = Router();

consoleNode.get("/", async ({ query }, res) => {
  try {
    const include =
      query.gpio === "true" ? { include: { Gpio: true } } : undefined;
    const console = await prisma.console.findMany(include);
    return res.json(console);
  } catch (error) {
    return res.json(error);
  } finally {
    await prisma.$disconnect();
  }
});
// Create a new console
consoleNode.post("/", async ({ body }, res) => {
  try {
    const data = await validGetConsoleData(body);
    await handelConsoleCreate(data);
    return res.json({ status: 200, message: "Console created" });
  } catch (error: any) {
    return onErrors(error, res);
  } finally {
    await prisma.$disconnect();
  }
});

// Update a console
consoleNode.patch("/:id", async ({ body, params }, res) => {
  const { id } = params;
  const reqData = body;
  try {
    const data = await validUpdateConsoleData(reqData);
    return await handelConsoleUpdate(id, data, res);
  } catch (error) {
    return onErrors(error, res);
  } finally {
    await prisma.$disconnect();
  }
});

// Delete a console
consoleNode.delete("/:id", async ({ params }, res) => {
  try {
    const { id } = params;
    return await handelConsoleDelete(id, res);
  } catch (error: any) {
    return onErrors(error, res);
  } finally {
    await prisma.$disconnect();
  }
});

export { consoleNode };
