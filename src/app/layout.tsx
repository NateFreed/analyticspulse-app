import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AnalyticsPulse - Privacy-First Web Analytics for Small Businesses",
  description: "Simple, cookie-free web analytics. No consent banners. GDPR-compliant by default. Know your visitors without invading their privacy.",
  openGraph: {
    title: "AnalyticsPulse - Privacy-First Analytics",
    description: "Cookie-free web analytics. No consent banners. GDPR-compliant. From $9/mo.",
    type: "website",
    siteName: "AnalyticsPulse",
  },
  twitter: {
    card: "summary_large_image",
    title: "AnalyticsPulse - Privacy-First Analytics",
    description: "Cookie-free web analytics. No consent banners. GDPR-compliant. From $9/mo.",
  },
  keywords: ["web analytics", "privacy analytics", "GDPR compliant", "cookie-free", "plausible alternative", "website traffic"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
