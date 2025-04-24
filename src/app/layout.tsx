import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { SearchProvider } from "./components/SearchContext";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Colin's Color Picker",
  description: "Colin's Color Picker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Suspense fallback={<div>Loading...</div>}>
            <Header />
        </Suspense>
            <div className="flex">
              <Suspense fallback={<div>Loading...</div>}>
                <SideBar />
              </Suspense>
            <main className="flex flex-col flex-1 p-6 overflow-auto">
              <Suspense fallback={<div>Loading...</div>}>
                {children}
              </Suspense>
              </main>
            </div>
      </body>
    </html>
  );
}
