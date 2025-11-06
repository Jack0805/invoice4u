import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Use - Invoice Generator",
  description: "Read the Terms of Use for Invoice Generator. Learn about acceptable use, user responsibilities, and terms for using our free invoice generation service.",
  keywords: [
    "invoice generator terms",
    "terms of use",
    "terms and conditions",
    "invoice service terms"
  ],
  alternates: {
    canonical: "https://invoice4u.vercel.app/terms"
  },
  openGraph: {
    title: "Terms of Use - Invoice Generator",
    description: "Read the Terms of Use for Invoice Generator and understand how to use our service responsibly.",
    url: "https://invoice4u.vercel.app/terms",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 md:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Terms of Use</h1>

        <div className="prose prose-sm sm:prose max-w-none">
          <p className="text-sm text-gray-500 mb-6">Last updated: November 5, 2025</p>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">Acceptance of Terms</h2>
          <p className="text-gray-700 mb-4">
            By accessing and using Invoice Generator, you accept and agree to be bound by the terms and
            provisions of this agreement. If you do not agree to these terms, please do not use our service.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">Use of Service</h2>
          <p className="text-gray-700 mb-4">
            Invoice Generator is provided as a free tool for creating professional invoices. You may use this
            service for:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Personal business invoicing</li>
            <li>Freelance work documentation</li>
            <li>Small business billing</li>
            <li>Any lawful commercial purpose</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">User Responsibilities</h2>
          <p className="text-gray-700 mb-4">You agree to:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Provide accurate information in your invoices</li>
            <li>Use the service in compliance with all applicable laws</li>
            <li>Not use the service for fraudulent or illegal purposes</li>
            <li>Not attempt to compromise the security or integrity of our systems</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Intellectual Property
          </h2>
          <p className="text-gray-700 mb-4">
            The Invoice Generator service, including its design, functionality, and content, is owned by us and
            protected by copyright and other intellectual property laws. You retain all rights to the content
            you create using our service.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">Disclaimer of Warranties</h2>
          <p className="text-gray-700 mb-4">
            Invoice Generator is provided "as is" without any warranties, express or implied. We do not
            guarantee that the service will be uninterrupted, error-free, or completely secure. You use the
            service at your own risk.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Limitation of Liability
          </h2>
          <p className="text-gray-700 mb-4">
            We shall not be liable for any indirect, incidental, special, consequential, or punitive damages
            resulting from your use of or inability to use the service. You are responsible for verifying the
            accuracy of all invoices generated.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">Changes to Terms</h2>
          <p className="text-gray-700 mb-4">
            We reserve the right to modify these terms at any time. Continued use of the service after changes
            constitutes acceptance of the modified terms.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Information</h2>
          <p className="text-gray-700 mb-4">
            For questions about these Terms of Use, please contact us at{' '}
            <a href="mailto:legal@invoicegenerator.com" className="text-blue-600 hover:underline">
              legal@invoicegenerator.com
            </a>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
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
