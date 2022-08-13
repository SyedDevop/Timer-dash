import { GpiosApi } from "../@Types";
import { convertFD2JSON } from ".";

export const parseGpios = (data: GpiosApi[]) => {
  return data.map((item) => {
    return {
      value: item.io.toString(),
      label: `Gpio ${item.io}`,
    };
  });
};

export const parseWindows = (data: GpiosApi[]) => {
  const windows = data.map((item) => {
    return {
      value: item.windows?.id.toString() || "",
      label: `Window ${item.windows?.id}`,
    };
  });
  return windows.filter(
    (value, index, self) =>
      index === self.findIndex((item) => item.value === value.value)
  );
};

export const parseConsoleFormData = (data: FormData) => {
  const {
    "console-name": name,
    "gpio-no": gpio,
    "windows-no": windowsId,
  } = convertFD2JSON(data);
  return {
    name,
    gpio,
    windowsId,
  };
};
