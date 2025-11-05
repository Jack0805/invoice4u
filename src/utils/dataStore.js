import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../../data');
const INVOICES_FILE = path.join(DATA_DIR, 'invoices.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize file if it doesn't exist
if (!fs.existsSync(INVOICES_FILE)) {
  fs.writeFileSync(INVOICES_FILE, JSON.stringify([]), 'utf-8');
}

export const dataStore = {
  // Read all invoices
  getAllInvoices() {
    try {
      const data = fs.readFileSync(INVOICES_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading invoices:', error);
      return [];
    }
  },

  // Get invoice by ID
  getInvoiceById(id) {
    const invoices = this.getAllInvoices();
    return invoices.find(inv => inv.id === id);
  },

  // Save invoice
  saveInvoice(invoice) {
    const invoices = this.getAllInvoices();
    const existingIndex = invoices.findIndex(inv => inv.id === invoice.id);

    if (existingIndex >= 0) {
      // Update existing invoice
      invoices[existingIndex] = { ...invoice, updatedAt: new Date().toISOString() };
    } else {
      // Add new invoice
      invoices.push(invoice);
    }

    fs.writeFileSync(INVOICES_FILE, JSON.stringify(invoices, null, 2), 'utf-8');
    return invoice;
  },

  // Delete invoice
  deleteInvoice(id) {
    const invoices = this.getAllInvoices();
    const filteredInvoices = invoices.filter(inv => inv.id !== id);

    if (invoices.length === filteredInvoices.length) {
      return false; // Invoice not found
    }

    fs.writeFileSync(INVOICES_FILE, JSON.stringify(filteredInvoices, null, 2), 'utf-8');
    return true;
  }
};
