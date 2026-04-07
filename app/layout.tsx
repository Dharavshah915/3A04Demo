import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SensorProvider } from "./context/sensor-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SCEMAS — Smart City Environmental Monitoring",
  description: "Real-time environmental monitoring and alert system for smarter, healthier cities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void-1">
        <div className="noise-overlay" />
        <SensorProvider>
          {children}
        </SensorProvider>
      </body>
    </html>
  );
}
