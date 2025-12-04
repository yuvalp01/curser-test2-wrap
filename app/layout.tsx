import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Database Schema Browser",
  description: "View your database tables, fields, and relationships",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
