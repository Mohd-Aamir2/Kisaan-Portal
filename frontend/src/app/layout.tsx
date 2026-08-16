import type { Metadata } from "next";
// @ts-ignore: side-effect import for global styles
import "./globals.css";
import AppProvider from "./context/appcontext";
import { Toaster } from "@/components/ui/toaster";
import SafeWrapper from "@/components/SafeWrapper";
import Footer from "@/components/footer/Footer";  // 👈 import footer

export const metadata: Metadata = {
  title: "Kisaan",
  description: "AI-powered Smart Crop Advisory for farmers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased h-full flex flex-col min-h-screen">
        <SafeWrapper>
          <AppProvider>
            <main className="flex-grow">{children}</main> {/* 👈 push content */}
            <Footer /> {/* 👈 footer here */}
          </AppProvider>
        </SafeWrapper>
        <Toaster />
      </body>
    </html>
  );
}

