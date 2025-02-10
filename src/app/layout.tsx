import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/utilities/components/header";
import Footer from "@/utilities/components/Footer";
import React from "react";
import { SessionProvider } from "next-auth/react";



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
      <body >
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
