import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Invoice } from '@/lib/api';

interface InvoiceState {
  formData: Invoice;
  createdInvoiceId: string | null;
}

// USD has 0% default tax rate (state-level sales tax varies)
const initialFormData: Invoice = {
  from: { name: '', email: '', address: '', phone: '', taxId: '' },
  to: { name: '', email: '', address: '', phone: '', taxId: '' },
  items: [{ description: '', quantity: 1, unitPrice: 0 }],
  currency: 'USD',
  taxRate: 0, // USD default (no federal sales tax)
  discount: 0,
  notes: '',
  terms: '',
  dueDate: '',
  date: new Date().toISOString(),
};

const initialState: InvoiceState = {
  formData: initialFormData,
  createdInvoiceId: null,
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Invoice>) => {
      state.formData = action.payload;
    },
    updateFormField: (state, action: PayloadAction<Partial<Invoice>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setCreatedInvoiceId: (state, action: PayloadAction<string | null>) => {
      state.createdInvoiceId = action.payload;
    },
    resetForm: (state) => {
      state.formData = initialFormData;
      state.createdInvoiceId = null;
    },
  },
});

export const { setFormData, updateFormField, setCreatedInvoiceId, resetForm } = invoiceSlice.actions;
export default invoiceSlice.reducer;
