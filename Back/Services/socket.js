import app from "../app.js";
import http from "http";
import { Server } from "socket.io";
import { env } from "./../Config/env.js";

// Création d'un HTTP
const server = http.createServer(app);

// Création du serveur WebSocket
const io = new Server(server, {
  cors: {
    origin: env.WEB_APP_URL, // MAJ selon mes besoins CORS
    methods: ["GET", "POST"],
  },
});

// Gestion des connexions WebSocket
io.on("connection", (socket) => {
  console.log("Socket is connected", socket.id);
});
io.on("disconnect", () => {
  console.log("Socket is disconnected", socket.id);
});

export { server, io };
