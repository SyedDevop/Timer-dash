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

interface FieldName {
  [key: string]: string;
  name: string;
  gpio: string;
}

export const handelPrismaError = (
  err: PrismaClientKnownRequestError,
  res: Response
) => {
  const { message, meta, code } = err;
  const fieldName: FieldName = {
    name: "Console name",
    gpio: "Gpio No",
  };
  log.error(err);
  if (code === "P2002") {
    // @ts-ignore
    const index: string = meta?.target[0];
    const errorMessage = `${fieldName[index]} already in use.`;
    return errorMessageFormatter([errorMessage], res);
  }
  return errorMessageFormatter([message], res);
};

export const handelYupError = (err: ValidationError, res: Response) => {
  log.error(err.errors);
  return errorMessageFormatter(err.errors, res);
};

export const handelError = (err: Error, res: Response) => {
  log.error(err);
  return errorMessageFormatter([err.message], res);
};

export const errorMessageFormatter = (message: string[], res: Response) => {
  return res.status(400).json({ error: { status: "failed", message } });
};
