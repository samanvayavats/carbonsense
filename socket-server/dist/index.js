import express from 'express';
// const express = require("express");
import http from 'http';
// const http = require("http");
import cors from 'cors';
import { Server } from 'socket.io';
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // your Next.js frontend
        methods: ["GET", "POST"]
    }
});
// Socket logic
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("sendMessage", (data) => {
        io.emit("receiveMessage", data);
    });
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Socket.IO server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map