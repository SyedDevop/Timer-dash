import { Express } from "express";

import { consoleNode } from "./Api/consoleNode";
import { gpios } from "./Api/gpio";
import { home } from "./Api/home";

export default (app: Express) => {
  app.use("/", home);
  app.use("/consoles", consoleNode);
  app.use("/gpios", gpios);
  app.get("/restart", (_, res) => {
    res.json({ status: 200, message: "Restarting server" });
    process.exit(0);
  });
};
