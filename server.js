// server.mjs or server.js (with "type": "module" in package.json)
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import envLoader from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';

// Load environment variables
dotenv.config();
envLoader();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'https://todo-app-pink-eight-29.vercel.app/'
];

/*app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));*/


app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Error handler middleware
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

