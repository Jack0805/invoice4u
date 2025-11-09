'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { invoiceApi } from '@/lib/api';
import { useAppSelector } from '@/lib/redux/hooks';
import { getTaxConfig, formatTaxLabel } from '@/lib/taxConfig';

// Metadata is handled by layout.tsx template
export default function PreviewPage() {
  const router = useRouter();
  const invoice = useAppSelector((state) => state.invoice.formData);

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!invoice) return;

    setIsDownloading(true);
    try {
      // Generate and download the PDF directly
      await invoiceApi.generateInvoicePDF(invoice);
    } catch (err) {
      console.error('Error downloading PDF:', err);
      alert('Failed to download PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  if (!invoice || !invoice.from.name || !invoice.to.name) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-800">No invoice data found. Please create an invoice first.</p>
          <button
            onClick={handleBack}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Form
          </button>
        </div>
      </div>
    );
  }

  // Calculate totals from invoice items
  const calculateTotals = () => {
    const subtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const discountAmount = invoice.discount || 0;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = (taxableAmount * (invoice.taxRate || 0)) / 100;
    const total = taxableAmount + taxAmount;

    return {
      subtotal,
      taxAmount,
      total,
    };
  };

  const { subtotal, taxAmount, total } = calculateTotals();

  // Get tax configuration for the selected currency
  const taxConfig = getTaxConfig(invoice.currency);

  const formatCurrency = (amount: number) => {
    return `${invoice.currency} ${amount.toFixed(2)}`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) {
      // Default to today's date if not provided
      return new Date().toLocaleDateString();
    }
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with Actions */}
      <div className="mb-8">
        <div className="mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words">Invoice Preview</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Review your invoice before downloading</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleBack}
            className="w-full sm:w-auto px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium"
          >
            ← Back to Edit
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isDownloading ? 'Downloading...' : '📥 Download PDF'}
          </button>
        </div>
      </div>

      {/* Invoice Preview Card */}
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8 border border-gray-200">
        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 sm:mb-8 gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">INVOICE</h2>
            <div className="text-xs sm:text-sm text-gray-600 break-words">
              <p className="font-semibold break-words">Invoice #: {invoice.invoiceNumber}</p>
              <p>Date: {formatDate(invoice.date)}</p>
              {invoice.dueDate && <p>Due Date: {formatDate(invoice.dueDate)}</p>}
            </div>
          </div>
          <div className="shrink-0">
            <span className="inline-block px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-blue-100 text-blue-800 whitespace-nowrap">
              {invoice.status?.toUpperCase() || 'DRAFT'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* From Section */}
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase mb-2 sm:mb-3">From</h3>
            <div className="text-gray-900 break-words">
              <p className="font-semibold text-base sm:text-lg break-words">{invoice.from.name}</p>
              <p className="text-xs sm:text-sm break-all">{invoice.from.email}</p>
              {invoice.from.address && <p className="text-xs sm:text-sm break-words">{invoice.from.address}</p>}
              {invoice.from.phone && <p className="text-xs sm:text-sm break-words">{invoice.from.phone}</p>}
              {invoice.from.taxId && <p className="text-xs sm:text-sm break-words">{taxConfig.taxIdShortLabel}: {invoice.from.taxId}</p>}
            </div>
          </div>

          {/* To Section */}
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase mb-2 sm:mb-3">Bill To</h3>
            <div className="text-gray-900 break-words">
              <p className="font-semibold text-base sm:text-lg break-words">{invoice.to.name}</p>
              <p className="text-xs sm:text-sm break-all">{invoice.to.email}</p>
              {invoice.to.address && <p className="text-xs sm:text-sm break-words">{invoice.to.address}</p>}
              {invoice.to.phone && <p className="text-xs sm:text-sm break-words">{invoice.to.phone}</p>}
              {invoice.to.taxId && <p className="text-xs sm:text-sm break-words">{taxConfig.taxIdShortLabel}: {invoice.to.taxId}</p>}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-6 sm:mb-8 overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle px-4 sm:px-0">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">Description</th>
                  <th className="text-center py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm w-16 sm:w-24">Qty</th>
                  <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm w-20 sm:w-32 whitespace-nowrap">Unit Price</th>
                  <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm w-20 sm:w-32">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-900 text-xs sm:text-sm break-words">{item.description}</td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-center text-gray-900 text-xs sm:text-sm">{item.quantity}</td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-right text-gray-900 text-xs sm:text-sm whitespace-nowrap">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="py-3 sm:py-4 px-2 sm:px-4 text-right text-gray-900 text-xs sm:text-sm font-medium whitespace-nowrap">
                      {formatCurrency(item.quantity * item.unitPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-6 sm:mb-8">
          <div className="w-full sm:w-80">
            <div className="flex justify-between py-2 text-gray-700 text-xs sm:text-sm">
              <span>Subtotal:</span>
              <span className="font-medium break-words text-right ml-2">{formatCurrency(subtotal)}</span>
            </div>
            {invoice.discount && invoice.discount > 0 && (
              <div className="flex justify-between py-2 text-gray-700 text-xs sm:text-sm">
                <span>Discount:</span>
                <span className="text-red-600 font-medium break-words text-right ml-2">-{formatCurrency(invoice.discount)}</span>
              </div>
            )}
            {invoice.taxRate && invoice.taxRate > 0 && (
              <div className="flex justify-between py-2 text-gray-700 text-xs sm:text-sm">
                <span className="break-words">{formatTaxLabel(invoice.currency, invoice.taxRate)}:</span>
                <span className="font-medium break-words text-right ml-2">{formatCurrency(taxAmount)}</span>
              </div>
            )}
            <div className="flex justify-between py-2 sm:py-3 border-t-2 border-gray-300 mt-2">
              <span className="text-base sm:text-lg font-bold text-gray-900">Total:</span>
              <span className="text-base sm:text-lg font-bold text-gray-900 break-words text-right ml-2">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes and Terms */}
        {(invoice.notes || invoice.terms) && (
          <div className="border-t border-gray-200 pt-4 sm:pt-6 space-y-3 sm:space-y-4">
            {invoice.notes && (
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">Notes</h3>
                <p className="text-gray-600 text-xs sm:text-sm whitespace-pre-wrap break-words">{invoice.notes}</p>
              </div>
            )}
            {invoice.terms && (
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">Terms & Conditions</h3>
                <p className="text-gray-600 text-xs sm:text-sm whitespace-pre-wrap break-words">{invoice.terms}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
        <button
          onClick={handleBack}
          className="w-full sm:w-auto px-8 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-medium text-sm sm:text-base"
        >
          ← Back to Edit
        </button>
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          {isDownloading ? 'Downloading...' : '📥 Download PDF'}
        </button>
      </div>
    </div>
  );
}
