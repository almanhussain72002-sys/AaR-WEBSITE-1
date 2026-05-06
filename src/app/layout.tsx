import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "AAR Security & Solutions | CCTV, Smart Locks & Access Control",
  description:
    "AAR Security & Solutions provides CCTV installation, smart locks, access control systems, video door phones, and AMC services for homes and businesses.",
  keywords: [
    "AAR Security & Solutions",
    "CCTV installation Karnataka",
    "smart locks Mangalore",
    "access control Udupi",
    "video door phones",
    "AMC security maintenance"
  ],
  openGraph: {
    title: "AAR Security & Solutions | CCTV, Smart Locks & Access Control",
    description:
      "Premium CCTV installation, smart locks, access control systems, video door phones, and AMC services in Karnataka, Mangalore, and Udupi.",
    type: "website",
    locale: "en_IN",
    siteName: "AAR Security & Solutions"
  },
  twitter: {
    card: "summary_large_image",
    title: "AAR Security & Solutions | CCTV, Smart Locks & Access Control",
    description:
      "Security installation and smart protection systems for homes and businesses in Karnataka, Mangalore, and Udupi."
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
