import { Server } from "socket.io";

interface SetNode {
  gpio: number;
  value: "HIGH" | "LOW";
}

const EVENTS = {
  SET_NODE: "SET_NODE",
};

const socket = ({ io }: { io: Server }) => {
  console.log("Socket enabled");

  io.on("connection", (socket) => {
    console.log("User connected ID:", socket.id);
    socket.on(EVENTS.SET_NODE, ({ gpio, value }: SetNode) => {
    //   console.log(data);
    });
  });
};

export default socket;
