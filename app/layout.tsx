import type { Metadata } from "next";
import { Margarine, Quicksand } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import localFont from "next/font/local";

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

export const uMoe = localFont({
  src: [
    {
      path: "../public/fonts/u-moe-handwritten-font.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-u-moe",
  display: "swap",
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
      <body
        className={`${margarine.variable} ${quicksand.variable} ${uMoe.variable} overflow-y-scroll overflow-x-hidden`}
      >
        <div className="bg-brown-200 w-full p-3 flex justify-center">
          <Image
            src="/jpeg/tiny-gon-icon.jpg"
            width={100}
            height={100}
            alt="icon"
          />
        </div>
        {children}
      </body>
    </html>
  );
}
