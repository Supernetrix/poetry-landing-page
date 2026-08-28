import type { Metadata } from "next";
import { Allura, Barlow, Playfair_Display } from "next/font/google";
import SiteHeader from "./components/SiteHeader";
import "./globals.css";

const barlow = Barlow({
  weight: ["300", "400", "500", "600", "800"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-quote",
  display: "swap",
});

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-allura",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Poetry Studios",
  description: "Sculpting Stanzas. Curated architectural estates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlow.variable} ${playfair.variable} ${allura.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
