import Link from 'next/link';

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 md:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          Frequently Asked Questions
        </h1>

        <div className="space-y-8">
          {/* FAQ Item */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Is Invoice Generator really free?
            </h2>
            <p className="text-gray-700">
              Yes! Invoice Generator is completely free to use. There are no hidden fees, subscription costs,
              or limitations on the number of invoices you can create.
            </p>
          </div>

          {/* FAQ Item */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Do I need to create an account?
            </h2>
            <p className="text-gray-700">
              No account is required. You can start creating invoices immediately. Your data is saved locally
              in your browser, so you can return to your work even after closing the tab.
            </p>
          </div>

          {/* FAQ Item */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              What currencies are supported?
            </h2>
            <p className="text-gray-700">
              We support over 30 major currencies including USD, EUR, GBP, JPY, CNY, INR, AUD, CAD, and many
              more. Select your preferred currency from the dropdown menu in the form.
            </p>
          </div>

          {/* FAQ Item */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Is my data secure?
            </h2>
            <p className="text-gray-700">
              Your invoice data is stored locally in your browser and only temporarily sent to our server when
              generating a PDF. We do not permanently store your business information. See our{' '}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>{' '}
              for more details.
            </p>
          </div>

          {/* FAQ Item */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Can I edit an invoice after creating it?
            </h2>
            <p className="text-gray-700">
              Yes! Simply click the "Back to Edit" button on the preview page to return to the form with all
              your data intact. You can make changes and generate a new PDF.
            </p>
          </div>

          {/* FAQ Item */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              What format are the invoices downloaded in?
            </h2>
            <p className="text-gray-700">
              Invoices are downloaded as professional PDF files that you can email to clients, print, or store
              for your records.
            </p>
          </div>

          {/* FAQ Item */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Can I use this on mobile devices?
            </h2>
            <p className="text-gray-700">
              Absolutely! Invoice Generator is fully responsive and works seamlessly on smartphones, tablets,
              and desktop computers.
            </p>
          </div>

          {/* FAQ Item */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              How do I add multiple items to an invoice?
            </h2>
            <p className="text-gray-700">
              Click the "Add Item" button to add additional line items to your invoice. You can add as many
              items as you need. Use the "Remove" button to delete items you don't need.
            </p>
          </div>

          {/* FAQ Item */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Are taxes and discounts calculated automatically?
            </h2>
            <p className="text-gray-700">
              Yes! Enter your tax rate (as a percentage) and/or discount amount, and the totals will be
              calculated automatically. The invoice preview and PDF will show the complete breakdown.
            </p>
          </div>

          {/* FAQ Item */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              What if I accidentally close my browser?
            </h2>
            <p className="text-gray-700">
              Don't worry! Your invoice data is automatically saved in your browser. When you return to Invoice
              Generator, your last saved work will be restored.
            </p>
          </div>

          {/* FAQ Item */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Can I customize the invoice template?
            </h2>
            <p className="text-gray-700">
              Currently, we use a professional standard template. You can add custom notes and terms &
              conditions to personalize your invoice. More customization options may be added in the future.
            </p>
          </div>

          {/* FAQ Item */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
              Who can I contact for support?
            </h2>
            <p className="text-gray-700">
              If you have questions or need assistance, please contact us at{' '}
              <a href="mailto:support@invoicegenerator.com" className="text-blue-600 hover:underline">
                support@invoicegenerator.com
              </a>
              . We're here to help!
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
