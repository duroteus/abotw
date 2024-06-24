import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arcane Ballad of the Wild",
  description: "Projeto criado para fins de estudo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-sm min-h-screen text-zinc-900 bg-[#e0e2e6ef]`}
      >
        {children}
      </body>
    </html>
  );
}
