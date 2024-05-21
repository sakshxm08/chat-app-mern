import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://buzz.sakshxm08.in"],
    methods: ["GET", "POST"],
  },
});

const users_socket = {};

export const get_receiver_socket_id = (receiver_id) =>
  users_socket[receiver_id];

io.on("connection", (socket) => {
  console.log(socket.id);
  const user_id = socket.handshake.query.user_id;
  if (user_id !== undefined) users_socket[user_id] = socket.id;

  io.emit("get_online_users", Object.keys(users_socket));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete users_socket[user_id];
    io.emit("get_online_users", Object.keys(users_socket));
  });
});

export { app, server, io };
