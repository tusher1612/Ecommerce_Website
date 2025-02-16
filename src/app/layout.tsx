import type { Metadata } from "next";

import "./globals.css";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "CloudlyIO Task5",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <SessionProvider>
        <body>
          {/* Fixed closing tag */}
          <div className="min-h-screen flex flex-col">
            <div className="flex-grow">{children}</div>
          </div>
        </body>
      </SessionProvider>
    </html>
  );
}
