import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pharma POS",
  description: "Punto de Venta para Farmacia con Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="h-screen w-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-slate-200 overflow-hidden">
        {children}
      </body>
    </html>
  );
}
