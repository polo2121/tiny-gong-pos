import type { Metadata } from "next";
import { Geist, Geist_Mono, Margarine, Quicksand } from "next/font/google";
import "./globals.css";

const margarine = Margarine({
  variable: "--font-margarine",
  weight: ["400"],
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ting Gong",
  description: "Created by Polo",
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${margarine.variable} ${quicksand.variable} `}>
        {children}
      </body>
    </html>
  );
}
