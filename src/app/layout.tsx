import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZENITH FITNESS STUDIO | Elevate Your Movement",
  description: "A boutique fitness destination where strength meets mindfulness. Personalized coaching for your unique transformation journey.",
};

import WhatsAppButton from "@/components/WhatsAppButton";
import { ToastProvider } from "@/context/ToastContext";
import ToastContainer from "@/components/ToastContainer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable}`}>
      <body>
        <ToastProvider>
          {children}
          <WhatsAppButton />
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}
