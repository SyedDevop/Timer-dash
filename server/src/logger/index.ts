import Logger from "pino";
import dayjs from "dayjs";

export const log = Logger({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
  base: {
    pid: false,
  },

  timestamp: () => `,"time":"${dayjs().format()}"`,
});
