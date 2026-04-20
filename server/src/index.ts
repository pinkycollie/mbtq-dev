import express, { Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';

// Import routes
import requestsRoutes from './routes/requests.routes';
import webhooksRoutes from './routes/webhooks.routes';
import creatorsRoutes from './routes/creators.routes';

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Middleware
app.use(helmet());
app.use(cors());

// Rate limiting for API endpoints (Auth/Login endpoints only recommended, but if global, use a high limit)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased limit to prevent blocking legitimate usage
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', apiLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'PinkSync Content Fulfillment API running',
    version: '1.0.0',
    endpoints: {
      requests: '/api/requests',
      webhooks: '/api/webhooks',
      creators: '/api/creators',
    },
  });
});

// API Routes
app.use('/api/requests', requestsRoutes);
app.use('/api/webhooks', webhooksRoutes);
app.use('/api/creators', creatorsRoutes);

// Socket.IO for real-time sync
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('move', (data) => {
    socket.broadcast.emit('sync', data);
  });

  socket.on('resize', (data) => {
    socket.broadcast.emit('sync', data);
  });

  socket.on('visual-alert', (alert) => {
    io.emit('visual-alert', alert);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  });
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 PinkSync Content Fulfillment API server listening on :${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
