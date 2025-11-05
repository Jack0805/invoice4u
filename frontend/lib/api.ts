import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface CompanyInfo {
  name: string;
  email: string;
  address?: string;
  phone?: string;
  taxId?: string;
}

export interface Invoice {
  id?: string;
  invoiceNumber?: string;
  date?: string;
  dueDate?: string;
  status?: 'draft' | 'sent' | 'paid' | 'overdue';
  from: CompanyInfo;
  to: CompanyInfo;
  items: InvoiceItem[];
  currency?: string;
  taxRate?: number;
  discount?: number;
  subtotal?: number;
  taxAmount?: number;
  total?: number;
  notes?: string;
  terms?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const invoiceApi = {
  // Generate and download invoice PDF
  async generateInvoicePDF(data: Invoice) {
    const response = await apiClient.post('/api/invoices/generate', data, {
      responseType: 'blob',
    });

    // Create a blob from the PDF stream
    const blob = new Blob([response.data], { type: 'application/pdf' });

    // Generate filename with date and random ID
    const date = new Date().toISOString().split('T')[0];
    const randomId = Math.random().toString(36).substring(7);
    const filename = `invoice-${date}-${randomId}.pdf`;

    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    // Clean up
    window.URL.revokeObjectURL(link.href);
  },
};
