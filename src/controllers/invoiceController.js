import { Invoice } from '../models/Invoice.js';
import { generateInvoicePDF } from '../utils/pdfGenerator.js';

export const invoiceController = {
  // Generate and download PDF directly (no storage needed)
  async generatePDF(req, res, next) {
    try {
      const invoice = new Invoice(req.body);
      const validation = invoice.validate();

      if (!validation.isValid) {
        return res.status(400).json({
          success: false,
          errors: validation.errors
        });
      }

      // Generate PDF directly without storing invoice
      const pdfBuffer = await generateInvoicePDF(invoice.toJSON());

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=invoice-${invoice.invoiceNumber}.pdf`);
      res.send(pdfBuffer);
    } catch (error) {
      next(error);
    }
  }
};
