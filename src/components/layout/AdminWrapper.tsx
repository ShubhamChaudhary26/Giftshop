// src/components/layout/AdminWrapper.tsx
"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import TopBanner from "./Banner/TopBanner";
import TopNavbar from "./Navbar/TopNavbar";
import Footer from "./Footer";

export default function AdminWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdmin && <TopBanner />}
      {!isAdmin && <TopNavbar />}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
}
