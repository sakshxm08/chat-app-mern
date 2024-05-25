// Import necessary modules
import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
import { update_message_to_read } from "../controllers/message.controller.js";

// Load environment variables from .env file
dotenv.config();
const environment = process.env.NODE_ENV;

// Load environment-specific variables
if (environment === "development") {
  dotenv.config({ path: ".env.development" });
} else if (environment === "production") {
  dotenv.config({ path: ".env.production" });
}

// Create Express app
const app = express();

// Create HTTP server using Express app
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_ORIGIN], // Allow requests only from specified origins
    methods: ["GET", "POST"], // Allow specified HTTP methods
  },
});

// Object to store user socket connections
const users_socket = {};

// Function to get socket ID of a specific user
export const get_receiver_socket_id = (receiver_id) =>
  users_socket[receiver_id];

// Handle socket connections
io.on("connection", (socket) => {
  console.log("user connected: " + socket.id);
  const user_id = socket.handshake.query.user_id; // Extract user ID from socket handshake query
  if (user_id !== undefined) users_socket[user_id] = socket.id; // Store user socket ID

  // Emit event to get online users and send their IDs
  io.emit("get_online_users", Object.keys(users_socket));

  socket.on("mark_message_as_read", update_message_to_read);

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("user disconnected: ", socket.id);
    delete users_socket[user_id]; // Remove user's socket ID from the object
    io.emit("get_online_users", Object.keys(users_socket)); // Emit event to update online users list
  });
});

// Export Express app, HTTP server, and Socket.IO instance
export { app, server, io };
