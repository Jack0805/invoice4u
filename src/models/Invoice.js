import { v4 as uuidv4 } from 'uuid';

export class Invoice {
  constructor(data) {
    this.id = data.id || uuidv4();
    this.invoiceNumber = data.invoiceNumber || this.generateInvoiceNumber();
    this.date = data.date || new Date().toISOString();
    this.dueDate = data.dueDate || null;
    this.status = data.status || 'draft'; // draft, sent, paid, overdue

    // Sender information
    this.from = {
      name: data.from?.name || '',
      email: data.from?.email || '',
      address: data.from?.address || '',
      phone: data.from?.phone || '',
      taxId: data.from?.taxId || ''
    };

    // Client information
    this.to = {
      name: data.to?.name || '',
      email: data.to?.email || '',
      address: data.to?.address || '',
      phone: data.to?.phone || '',
      taxId: data.to?.taxId || ''
    };

    // Invoice items
    this.items = data.items || [];

    // Financial details
    this.currency = data.currency || 'USD';
    this.taxRate = data.taxRate || 0;
    this.discount = data.discount || 0;
    this.notes = data.notes || '';
    this.terms = data.terms || '';

    // Calculated fields
    this.subtotal = this.calculateSubtotal();
    this.taxAmount = this.calculateTax();
    this.total = this.calculateTotal();

    // Metadata
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  generateInvoiceNumber() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `INV-${year}${month}-${random}`;
  }

  calculateSubtotal() {
    return this.items.reduce((sum, item) => {
      return sum + (item.quantity * item.unitPrice);
    }, 0);
  }

  calculateTax() {
    return (this.subtotal - this.discount) * (this.taxRate / 100);
  }

  calculateTotal() {
    return this.subtotal - this.discount + this.taxAmount;
  }

  validate() {
    const errors = [];

    if (!this.from.name) errors.push('Sender name is required');
    if (!this.to.name) errors.push('Client name is required');
    if (!this.items || this.items.length === 0) errors.push('At least one item is required');

    this.items.forEach((item, index) => {
      if (!item.description) errors.push(`Item ${index + 1}: Description is required`);
      if (!item.quantity || item.quantity <= 0) errors.push(`Item ${index + 1}: Valid quantity is required`);
      if (!item.unitPrice || item.unitPrice < 0) errors.push(`Item ${index + 1}: Valid unit price is required`);
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  toJSON() {
    return {
      id: this.id,
      invoiceNumber: this.invoiceNumber,
      date: this.date,
      dueDate: this.dueDate,
      status: this.status,
      from: this.from,
      to: this.to,
      items: this.items,
      currency: this.currency,
      taxRate: this.taxRate,
      discount: this.discount,
      subtotal: this.subtotal,
      taxAmount: this.taxAmount,
      total: this.total,
      notes: this.notes,
      terms: this.terms,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
