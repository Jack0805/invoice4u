import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us - Free Invoice Generator Tool",
  description: "Learn about Invoice Generator - a free, easy-to-use online tool for creating professional invoices. No registration required, supports 30+ currencies, and instant PDF downloads.",
  keywords: [
    "about invoice generator",
    "invoice tool",
    "free invoicing",
    "invoice maker about",
    "professional invoices"
  ],
  alternates: {
    canonical: "https://invoice4u.vercel.app/about"
  },
  openGraph: {
    title: "About Us - Free Invoice Generator Tool",
    description: "Learn about Invoice Generator - a free, easy-to-use online tool for creating professional invoices.",
    url: "https://invoice4u.vercel.app/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 md:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">About Invoice Generator</h1>

        <div className="prose prose-sm sm:prose max-w-none">
          <p className="text-gray-700 mb-4">
            Invoice Generator is a free, easy-to-use online tool designed to help individuals and businesses
            create professional invoices quickly and efficiently.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            We aim to simplify the invoicing process for freelancers, small businesses, and entrepreneurs
            around the world. Our tool is designed to be intuitive, accessible, and powerful enough to meet
            your invoicing needs.
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">Key Features</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Create professional invoices in minutes</li>
            <li>Support for 30+ global currencies</li>
            <li>Automatic calculations for subtotals, taxes, and discounts</li>
            <li>Download invoices as PDF files</li>
            <li>Data persistence - your work is automatically saved</li>
            <li>Mobile-friendly responsive design</li>
            <li>No registration required</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            Have questions or feedback? We'd love to hear from you. Reach out to us at{' '}
            <a href="mailto:support@invoicegenerator.com" className="text-blue-600 hover:underline">
              support@invoicegenerator.com
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
