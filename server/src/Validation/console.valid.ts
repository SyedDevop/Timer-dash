import { ConsoleSchema, updateConsoleSchema } from "../Schema/console.schema";

export const validGetConsoleData = async (data: any) => {
  try {
    const valid = await ConsoleSchema.validate(data, {
      abortEarly: false,
    });
    return valid;
  } catch (error) {
    throw error;
  }
};

export const validUpdateConsoleData = async (data: any) => {
  try {
    const valid = await updateConsoleSchema.validate(data, {
      abortEarly: false,
    });
    return valid;
  } catch (error) {
    throw error;
  }
};
