import type { Metadata } from "next";

import "../globals.css";
import Header from "@/utilities/components/layout/header";
import Footer from "@/utilities/components/layout/Footer";

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "CloudlyIO Task5",
};

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </>
  );
}
