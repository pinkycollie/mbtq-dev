require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
const server = http.createServer(app);

// Security: Helmet for security headers
app.use(helmet());

// Security: CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Security: Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// Parse JSON bodies
app.use(express.json());

// Socket.IO server with secure CORS
const io = new Server(server, { 
  cors: corsOptions
});

app.get("/", (req, res) => res.json({ 
  status: "PinkSync backend running",
  version: "1.0.0",
  environment: process.env.NODE_ENV || "development"
}));

// Health check endpoint
app.get("/health", (req, res) => res.json({ 
  status: "healthy",
  timestamp: new Date().toISOString()
}));

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

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`PinkSync Socket.IO server listening on :${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
