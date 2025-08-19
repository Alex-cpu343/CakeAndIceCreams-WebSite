import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Header";
import ReduxProvider from "./ReduxProvider";
import Basked from "./Basked"; 
import Footer from "./Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cake and Ice Creams",
  keywords: ["cake", "ice cream", "desserts", "bakery"],
  description: "A delightful collection of cakes and ice creams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>
          <Header />
          {children}
          <Basked /> 
        </ReduxProvider>
        <Footer />
      </body>
      
    </html>
  );
}
