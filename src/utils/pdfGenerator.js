import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateInvoicePDF(invoice) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks = [];

      // Collect PDF chunks
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Header
      doc
        .fontSize(20)
        .text('INVOICE', 50, 50, { align: 'right' })
        .fontSize(10)
        .text(`Invoice #: ${invoice.invoiceNumber}`, 50, 80, { align: 'right' })
        .text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 50, 95, { align: 'right' });

      if (invoice.dueDate) {
        doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`, 50, 110, { align: 'right' });
      }

      // From section
      doc
        .fontSize(12)
        .text('From:', 50, 150)
        .fontSize(10)
        .text(invoice.from.name, 50, 170)
        .text(invoice.from.email, 50, 185);

      if (invoice.from.address) doc.text(invoice.from.address, 50, 200);
      if (invoice.from.phone) doc.text(invoice.from.phone, 50, 215);
      if (invoice.from.taxId) doc.text(`Tax ID: ${invoice.from.taxId}`, 50, 230);

      // To section
      doc
        .fontSize(12)
        .text('Bill To:', 300, 150)
        .fontSize(10)
        .text(invoice.to.name, 300, 170)
        .text(invoice.to.email, 300, 185);

      if (invoice.to.address) doc.text(invoice.to.address, 300, 200);
      if (invoice.to.phone) doc.text(invoice.to.phone, 300, 215);
      if (invoice.to.taxId) doc.text(`Tax ID: ${invoice.to.taxId}`, 300, 230);

      // Items table
      let tableTop = 280;
      doc.fontSize(10);

      // Table header
      doc
        .rect(50, tableTop, 500, 25)
        .fillAndStroke('#f0f0f0', '#000000')
        .fill('#000000')
        .text('Description', 60, tableTop + 8)
        .text('Qty', 350, tableTop + 8)
        .text('Unit Price', 400, tableTop + 8)
        .text('Total', 480, tableTop + 8);

      tableTop += 25;

      // Table rows
      invoice.items.forEach((item, index) => {
        const y = tableTop + (index * 25);
        const lineTotal = item.quantity * item.unitPrice;

        doc
          .rect(50, y, 500, 25)
          .stroke()
          .text(item.description, 60, y + 8, { width: 280 })
          .text(item.quantity.toString(), 350, y + 8)
          .text(`${invoice.currency} ${item.unitPrice.toFixed(2)}`, 400, y + 8)
          .text(`${invoice.currency} ${lineTotal.toFixed(2)}`, 480, y + 8);
      });

      // Calculate totals position
      const totalsTop = tableTop + (invoice.items.length * 25) + 20;

      // Subtotal, discount, tax, and total
      doc
        .text('Subtotal:', 380, totalsTop)
        .text(`${invoice.currency} ${invoice.subtotal.toFixed(2)}`, 480, totalsTop);

      if (invoice.discount > 0) {
        doc
          .text('Discount:', 380, totalsTop + 20)
          .text(`-${invoice.currency} ${invoice.discount.toFixed(2)}`, 480, totalsTop + 20);
      }

      if (invoice.taxRate > 0) {
        doc
          .text(`Tax (${invoice.taxRate}%):`, 380, totalsTop + 40)
          .text(`${invoice.currency} ${invoice.taxAmount.toFixed(2)}`, 480, totalsTop + 40);
      }

      doc
        .fontSize(12)
        .text('Total:', 380, totalsTop + 60)
        .text(`${invoice.currency} ${invoice.total.toFixed(2)}`, 480, totalsTop + 60);

      // Notes
      if (invoice.notes) {
        doc
          .fontSize(10)
          .text('Notes:', 50, totalsTop + 100)
          .text(invoice.notes, 50, totalsTop + 115, { width: 500 });
      }

      // Terms
      if (invoice.terms) {
        const termsTop = invoice.notes ? totalsTop + 160 : totalsTop + 100;
        doc
          .fontSize(10)
          .text('Terms & Conditions:', 50, termsTop)
          .text(invoice.terms, 50, termsTop + 15, { width: 500 });
      }

      // Finalize PDF
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
