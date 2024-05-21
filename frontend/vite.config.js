import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  "/api": {
    target: "http://localhost:3000", // Assuming backend runs on port 3000
    changeOrigin: true,
    secure: false,
  },
  "/socket.io": {
    target: "http://localhost:3000", // Proxy socket.io requests
    ws: true, // Enable WebSocket proxying
  },
});
