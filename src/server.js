import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import invoiceRoutes from './routes/invoiceRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: [
    'https://invoice4u.vercel.app',
    'http://localhost:3001', // For local development
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Invoice Generator API',
    version: '1.0.0',
    endpoints: {
      'POST /api/invoices': 'Create a new invoice',
      'GET /api/invoices': 'Get all invoices',
      'GET /api/invoices/:id': 'Get invoice by ID',
      'GET /api/invoices/:id/pdf': 'Download invoice as PDF',
      'DELETE /api/invoices/:id': 'Delete invoice by ID'
    }
  });
});

app.use('/api/invoices', invoiceRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Invoice Generator API running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
