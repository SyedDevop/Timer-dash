import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Response } from "express";
import { ValidationError } from "yup";
import { log } from "../logger";

export const onErrors = async (err: any, res: Response) => {
  if (err instanceof PrismaClientKnownRequestError) {
    return handelPrismaError(err, res);
  }
  if (err instanceof ValidationError) {
    return handelYupError(err, res);
  }
  if (err instanceof Error) {
    return handelError(err, res);
  }
};

export const handelPrismaError = (
  err: PrismaClientKnownRequestError,
  res: Response
) => {
  const { message } = err;
  log.error(err);
  return res.status(400).json({ error: { status: "failed", message } });
};

export const handelYupError = (err: ValidationError, res: Response) => {
  log.error(err.errors);
  return res
    .status(400)
    .json({ error: { status: "failed", message: err.errors } });
};

export const handelError = (err: Error, res: Response) => {
  log.error(err);
  return res
    .status(400)
    .json({ error: { status: "failed", message: err.message } });
};
