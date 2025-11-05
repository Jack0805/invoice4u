import express from 'express';
import { invoiceController } from '../controllers/invoiceController.js';

const router = express.Router();

// Generate and download invoice PDF directly (no storage)
router.post('/generate', invoiceController.generatePDF);

export default router;
