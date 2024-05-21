import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const environment = process.env.NODE_ENV;

// Load environment-specific variables
if (environment === "development") {
  dotenv.config({ path: ".env.development" });
} else if (environment === "production") {
  dotenv.config({ path: ".env.production" });
}

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_ORIGIN],
    methods: ["GET", "POST"],
  },
});

const users_socket = {};

export const get_receiver_socket_id = (receiver_id) =>
  users_socket[receiver_id];

io.on("connection", (socket) => {
  console.log("user connected: " + socket.id);
  const user_id = socket.handshake.query.user_id;
  if (user_id !== undefined) users_socket[user_id] = socket.id;

  io.emit("get_online_users", Object.keys(users_socket));

  socket.on("disconnect", () => {
    console.log("user disconnected: ", socket.id);
    delete users_socket[user_id];
    io.emit("get_online_users", Object.keys(users_socket));
  });
});

export { app, server, io };
