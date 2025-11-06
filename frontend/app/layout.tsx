import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/lib/redux/StoreProvider";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Invoice Generator",
  description: "Create and manage professional invoices",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <StoreProvider>
          <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <a
                    href="/"
                    className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    Invoice Generator
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <main className="flex-grow">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
