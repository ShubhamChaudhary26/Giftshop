// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import TopBanner from "@/components/layout/Banner/TopBanner";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import HolyLoader from "holy-loader";
import Providers from "./providers";
import AdminWrapper from "@/components/layout/AdminWrapper";

export const metadata: Metadata = {
  title: "Candle.Store",
  description: "Candle.Store - Your Gateway to a World of Candles",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <HolyLoader color="#868686" />
        <Providers>
          <AdminWrapper>
            {children}
          </AdminWrapper>
        </Providers>
      </body>
    </html>
  );
}
