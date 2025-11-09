import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/lib/redux/StoreProvider";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Invoice Generator - Create Professional Invoices Free",
    template: "%s | Invoice Generator",
  },
  description:
    "Create professional invoices instantly with our free online invoice generator. No registration required. Support for 30+ currencies, automatic calculations, and instant PDF downloads.",
  keywords: [
    "invoice generator",
    "free invoice",
    "create invoice",
    "invoice maker",
    "professional invoice",
    "PDF invoice",
    "online invoice",
    "invoice template",
    "business invoice",
    "freelance invoice",
    "invoice creator",
    "generate invoice free",
  ],
  authors: [{ name: "Invoice Generator" }],
  creator: "Invoice Generator",
  publisher: "Invoice Generator",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://invoice4u.io",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://invoice4u.io",
    title: "Invoice Generator - Create Professional Invoices Free",
    description:
      "Create professional invoices instantly with our free online invoice generator. No registration required. Support for 30+ currencies, automatic calculations, and instant PDF downloads.",
    siteName: "Invoice Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoice Generator - Create Professional Invoices Free",
    description:
      "Create professional invoices instantly with our free online invoice generator. No registration required.",
  },
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
  metadataBase: new URL("https://invoice4u.io"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-2W6DQPQ37H"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2W6DQPQ37H');
            `,
          }}
        />
      </head>
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
