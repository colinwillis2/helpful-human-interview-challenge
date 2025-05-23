import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./componets/Header";
import SideBar from "./componets/SideBar";
import { SearchProvider } from "./componets/SearchContext";
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
          <SearchProvider>
            <Header />
            <div className="flex">
              <SideBar />
            <main className="flex flex-col flex-1 p-6 overflow-auto">
              {children}
              </main>
            </div>
          </SearchProvider>
        </Suspense>
      </body>
    </html>
  );
}
