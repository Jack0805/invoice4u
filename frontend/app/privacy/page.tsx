import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy - Invoice Generator",
  description: "Read our privacy policy to understand how Invoice Generator handles your data. We store data locally in your browser and only temporarily process it to generate PDFs.",
  keywords: [
    "invoice generator privacy",
    "privacy policy",
    "data security",
    "invoice data protection"
  ],
  alternates: {
    canonical: "https://invoice4u.vercel.app/privacy"
  },
  openGraph: {
    title: "Privacy Policy - Invoice Generator",
    description: "Read our privacy policy to understand how Invoice Generator handles your data securely.",
    url: "https://invoice4u.vercel.app/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 md:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>

        <div className="prose prose-sm sm:prose max-w-none">
          <p className="text-sm text-gray-500 mb-6">Last updated: November 5, 2025</p>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">Introduction</h2>
          <p className="text-gray-700 mb-4">
            Invoice Generator ("we", "our", or "us") is committed to protecting your privacy. This Privacy
            Policy explains how we handle your information when you use our invoice generation service.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">Data Storage</h2>
          <p className="text-gray-700 mb-4">
            All invoice data you create is stored locally in your browser using localStorage and on our servers
            only temporarily to generate your PDF invoice. We do not permanently store your personal or business
            information on our servers.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Information We Collect
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Invoice data you voluntarily enter (names, addresses, amounts, etc.)</li>
            <li>Browser information for technical functionality</li>
            <li>Usage statistics to improve our service</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">How We Use Your Data</h2>
          <p className="text-gray-700 mb-4">
            We use the information you provide solely to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Generate PDF invoices based on your input</li>
            <li>Provide invoice preview functionality</li>
            <li>Save your work locally in your browser for convenience</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">Data Security</h2>
          <p className="text-gray-700 mb-4">
            We implement industry-standard security measures to protect your data. Invoice data is transmitted
            securely and temporarily stored only for the duration needed to generate your PDF.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">Your Rights</h2>
          <p className="text-gray-700 mb-4">You have the right to:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Clear your browser's localStorage to delete all saved invoice data</li>
            <li>Stop using our service at any time</li>
            <li>Request information about data we may have processed</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:privacy@invoicegenerator.com" className="text-blue-600 hover:underline">
              privacy@invoicegenerator.com
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
