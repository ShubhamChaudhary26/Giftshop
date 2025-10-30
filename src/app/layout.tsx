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
import FloatingButtons from "@/components/common/FloatingButtons";

export const metadata: Metadata = {
  title: "BestGiftEver",
  description: "BestGiftEver - Your Gateway to a World of Candles",
  icons: "/icons/logo.jpg"
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
        <HolyLoader color="#FBBF24" />
        <Providers>
          <AdminWrapper>
            {children}
          </AdminWrapper>
        </Providers>
        
        {/* Floating Action Buttons */}
        {/* <FloatingButtons /> */}
      </body>
    </html>
  );
}