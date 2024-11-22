import app from "../app.js";
import http from "http";
import { Server } from "socket.io";

// Création d'un HTTP
const server = http.createServer(app);

// Création du serveur WebSocket
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // MAJ selon mes besoins CORS
  },
});

// Gestion des connexions WebSocket
io.on("connection", (socket) => {
  console.log("Socket is connected");
});

export { server, io };
