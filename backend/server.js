// Import necessary modules
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";

// Import route handlers
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

// Import database connection function and Socket.IO setup
import connect_to_mongodb from "./db/db.js";
import { app, server } from "./socket/socket.js";

// Resolve directory path
const __dirname = path.resolve();

// Set the port number
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cookieParser()); // Parse cookies from incoming requests
app.use(express.json()); // Parse incoming requests with JSON payloads (for req.body)

// Route handlers setup
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/messages", messageRoutes); // Message routes
app.use("/api/contacts", userRoutes); // User routes

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Catch-all route to serve the frontend index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Start the HTTP server
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  // Connect to MongoDB
  connect_to_mongodb();
});
