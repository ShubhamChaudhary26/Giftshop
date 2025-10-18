"use client";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "./MenuItem";
import Image from "next/image";
import InputGroup from "@/components/ui/input-group";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";

const data: {
  id: number;
  type: "MenuItem" | "MenuList";
  label: string;
  url: string;
  children: never[];
}[] = [
  { id: 0, type: "MenuItem", label: "Home", url: "/", children: [] },
  { id: 1, type: "MenuItem", label: "About", url: "/about", children: [] },
  { id: 2, type: "MenuItem", label: "Services", url: "/service", children: [] },
  { id: 3, type: "MenuItem", label: "Ecom", url: "/shop", children: [] },
  { id: 4, type: "MenuItem", label: "Contact", url: "/contact", children: [] },
];

const TopNavbar = () => {
  return (
    <nav className="sticky top-0 bg-white z-20 shadow-sm">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-3 md:py-5 px-3 sm:px-4 lg:px-0">
        {/* Left Section: Logo + Mobile Menu */}
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <div className="block md:hidden mr-3">
            <ResTopNavbar data={data} />
          </div>

          {/* Logo */}
          <Link
            href="/"
            className={cn(
              integralCF.className,
              "text-xl sm:text-2xl lg:text-[32px] font-bold mr-3 lg:mr-10"
            )}
          >
            Book.Verse
          </Link>
        </div>

        {/* Middle Section: Menu (hidden on mobile) */}
        <NavigationMenu className="hidden md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            {data.map((item) => (
              <MenuItem key={item.id} label={item.label} url={item.url} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Section: Search + Cart */}
        <div className="flex items-center ml-auto w-full ">
          {/* Search (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-[550px] bg-[#F0F0F0] rounded-full mr-3 lg:mr-10">
            <InputGroup className="w-full">
              <InputGroup.Text className="pl-4">
                <Image
                  priority
                  src="/icons/search.svg"
                  height={20}
                  width={20}
                  alt="search"
                  className="min-w-5 min-h-5"
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
          <Link href="/search" className="block md:hidden mr-3 p-1">
            <Image
              priority
              src="/icons/search-black.svg"
              height={22}
              width={22}
              alt="search"
              className="min-w-[22px] min-h-[22px]"
            />
          </Link>

          {/* Cart Button */}
          <CartBtn />
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
