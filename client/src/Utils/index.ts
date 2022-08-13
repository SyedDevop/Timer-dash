export * from "./ConsoleForm.Utils";

export const toTwoDigit = (digit: number) => {
  return digit < 10 ? `0${digit}` : digit;
};

export const convertFD2JSON = (data: FormData) => {
  const object: any = {};
  for (const [key, value] of data.entries()) {
    object[key] = value;
  }
  return object;
};
