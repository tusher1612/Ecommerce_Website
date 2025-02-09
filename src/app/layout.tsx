import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/header";
import Footer from "@/components/Footer";
import React from "react";
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "CloudlyIO Task5",
};

export default function RootLayout({
  children, modal // Remove modal if not used correctly
}: Readonly<{
  children: React.ReactNode;
  modal:React.ReactNode;
}>) {
  return (
    <html lang="en">
         <SessionProvider>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
         {/* Fixed closing tag */}
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow">
              
              {modal}

           
              {children}
            
              
              </div>
            <Footer />
          </div>
      
      </body>
      </SessionProvider>
    </html>
  );
}
