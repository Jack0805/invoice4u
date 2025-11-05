'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InvoiceForm from '@/components/forms/InvoiceForm';
import { Invoice } from '@/lib/api';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (invoiceData: Invoice) => {
    setIsLoading(true);
    setError(null);

    // Just navigate to preview page - invoice data is already in Redux
    router.push('/preview');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Invoice</h1>
        <p className="text-gray-600">
          Fill in the details below to generate a professional invoice
        </p>
      </div>

      {/* Invoice Form */}
      <InvoiceForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
