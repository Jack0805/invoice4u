import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Footer Menu */}
        <nav className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-6">
          <Link
            href="/about"
            className="text-sm sm:text-base text-gray-600 hover:text-blue-600 transition-colors"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="text-sm sm:text-base text-gray-600 hover:text-blue-600 transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-sm sm:text-base text-gray-600 hover:text-blue-600 transition-colors"
          >
            Terms of Use
          </Link>
          <Link
            href="/faq"
            className="text-sm sm:text-base text-gray-600 hover:text-blue-600 transition-colors"
          >
            FAQ
          </Link>
        </nav>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            Copyright © 2025 Invoice Generator. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
