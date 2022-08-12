import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

import { log } from "./logger";
import sockets from "./socket";
import routes from "./routes";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://192.168.1.120:3000", "http://localhost:3000"],
    credentials: true,
  },
});

server.listen(PORT, () => {
  log.info(`Server is running on port ${PORT}`);
  sockets({ io });
  routes(app);
});
