import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zensa-Next.POS",
  description: "Punto de Venta para Farmacia con Next.js",
   generator: 'Zensa-Next.POS'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <header>  
        <link rel="icon" type="image/png" href="/favicon.png" />
      </header>
       <body className={`${inter.className} bg-[url('/background.png')] bg-cover bg-center min-h-screen`}>
          
        <div className="absolute top-0 left-0 w-full h-full bg-indigo-400 opacity-50 -z-10"></div>

        {children}
      </body>
    </html>
  );
}
