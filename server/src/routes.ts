import { Express } from "express";

import { consoleNode } from "./Api/consoleNode";
import { gpios } from "./Api/gpio";
import { home } from "./Api/home";

export default (app: Express) => {
  app.use("/api", home);
  app.use("/api/consoles", consoleNode);
  app.use("/api/gpios", gpios);
};
