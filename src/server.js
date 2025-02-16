import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import clothesRoutes from './routes/clothesRoutes.js';
import rentalRoutes from './routes/rentalRoutes.js';
import exportRoutes from './routes/exportRoutes.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';
import './utils/lowStockCheck.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/clothes', clothesRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/export', exportRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Serverless export
export default app;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));