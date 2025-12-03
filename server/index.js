const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.get("/", (req, res) => res.json({ status: "PinkSync backend running" }));

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("move", (data) => {
    socket.broadcast.emit("sync", data);
  });

  socket.on("resize", (data) => {
    socket.broadcast.emit("sync", data);
  });

  socket.on("visual-alert", (alert) => {
    io.emit("visual-alert", alert);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(4000, () => {
  console.log("PinkSync Socket.IO server listening on :4000");
});
