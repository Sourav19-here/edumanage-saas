import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FloatingSocial from "@/components/FloatingSocial";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduManage - Coaching Center Management",
  description: "Modern coaching center management system with student tracking, attendance, and fee management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className={inter.className}>
        {children}
        <FloatingSocial />
      </body>
    </html>
  );
}
