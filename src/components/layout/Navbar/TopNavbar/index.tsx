'use client';
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React from "react";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import Image from "next/image";
import InputGroup from "@/components/ui/input-group";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";

type NavMenuItem = {
  id: number;
  type: "MenuItem" | "MenuList";
  label: string;
  url: string;
  children: never[];
};

const data: NavMenuItem[] = [
  { id: 0, type: "MenuItem", label: "Home", url: "/", children: [] },
  { id: 1, type: "MenuItem", label: "About", url: "/about", children: [] },
  { id: 2, type: "MenuItem", label: "Services", url: "/service", children: [] },
  { id: 3, type: "MenuItem", label: "Ecom", url: "/shop", children: [] },
  { id: 4, type: "MenuItem", label: "Contact", url: "/contact", children: [] },
];

const TopNavbar = () => {
  return (
    <nav className="sticky top-0 bg-white z-20 shadow-sm">
      <div className="flex items-center justify-between max-w-frame mx-auto py-4 px-4 sm:px-6 lg:px-0">

        {/* Left: Mobile Menu + Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile menu */}
          <div className="block md:hidden">
            <ResTopNavbar data={data} />
          </div>

          {/* Logo */}
          <Link
            href="/"
            className={cn(
              integralCF.className,
              "text-xl sm:text-2xl lg:text-[32px] font-bold mb-1.2 ml-2"
            )}
          >
            Book.Verse
          </Link>
        </div>

        {/* Center Menu (hidden on mobile) */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6">
              {data.map((item) => (
                <MenuItem key={item.id} label={item.label} url={item.url} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right: Search + Cart */}
        <div className="flex items-center gap-3">
          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-[350px] bg-[#F0F0F0] rounded-full">
            <InputGroup className="w-full">
              <InputGroup.Text className="pl-4">
                <Image
                  priority
                  src="/icons/search.svg"
                  height={20}
                  width={20}
                  alt="search"
                />
              </InputGroup.Text>
              <InputGroup.Input
                type="search"
                name="search"
                placeholder="Search for products..."
                className="bg-transparent placeholder:text-black/40 w-full"
              />
            </InputGroup>
          </div>

          {/* Mobile Search Icon */}
          <Link href="/search" className="block md:hidden p-1">
            <Image
              priority
              src="/icons/search-black.svg"
              height={22}
              width={22}
              alt="search"
            />
          </Link>

          {/* Cart */}
          <CartBtn />
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
