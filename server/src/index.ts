import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import prisma from "./prisma";
import { home } from "./Routes/home";
import socket from "./socket";

import cors from "cors";

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://192.168.1.120:3000", "http://localhost:3000"],
    credentials: true,
  },
});

app.use("/", home);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  socket({ io });
});
