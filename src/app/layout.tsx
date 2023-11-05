import type { Metadata } from "next";
import { Comfortaa, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RightBite",
  description: "Barcode scanner for food safety warnings",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + "h-full"}>
        <div className="w-full min-h-screen bg-zinc-900">
          <div className="flex m-0 p-0 gap-x-0.5 md:gap-x-2 bg-zinc-800">
            <Link href="/"><Image
              className="flex justify-left m-2 md:m-4 w-8 md:w-16 h-auto"
              src="/right-bite-logo.png"
              alt="RightBite Logo"
              width={75}
              height={75}
              priority
            />
            </Link>
            
            <h1 className="flex justify-center my-6 text-xl md:text-4xl text-white h-fit font-bold">RightBite</h1>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
