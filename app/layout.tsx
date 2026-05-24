import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LearnOS — Student Dashboard",
  description: "Track your learning progress, active courses and daily streaks.",
  keywords: ["education", "learning", "dashboard", "courses"],
  openGraph: {
    title: "LearnOS — Student Dashboard",
    description: "Next-gen learning dashboard.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrains.variable} font-sans bg-bg-900 text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
