// src/pages/api/socket.ts

import { Server as HTTPServer } from "http";
import { NextApiRequest } from "next";
import { Server as SocketIOServer } from "socket.io";
import dbConnect from "../../utils/dbConnect";
import Message from "../../models/Message";
import User from "../../models/User";

export default function SocketHandler(req: NextApiRequest, res: any) {
  if (!res.socket.server.io) {
    console.log("*New Socket.io server...");
    const httpServer: HTTPServer = res.socket.server as any;
    const io = new SocketIOServer(httpServer, {
      path: "/api/socket",
      addTrailingSlash: false,
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("New client connected");

      socket.on("sendChatMessage", async (message) => {
        await dbConnect();
        const newMessage = await Message.create(message);
        io.emit("newChatMessage", newMessage);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }
  res.end();
}
