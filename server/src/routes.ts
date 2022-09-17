import { Express } from "express";

import { consoleNode } from "./Api/consoleNode";
import { gpios } from "./Api/gpio";
import { home } from "./Api/home";
import { isDev } from "./Utils";

export default (app: Express) => {
  const devPath = (path: string) => (isDev() ? `/api${path}` : path);
  app.use(devPath("/"), home);
  app.use(devPath("/consoles"), consoleNode);
  app.use(devPath("/gpios"), gpios);
};
