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

// ✅ Simple menu data
const data: {
  id: number;
  type: "MenuItem" | "MenuList";
  label: string;
  url: string;
  children: never[];
}[] = [
  { id: 0, type: "MenuItem", label: "Home", url: "/", children: [] },
  { id: 1, type: "MenuItem", label: "About", url: "/about", children: [] },
  { id: 2, type: "MenuItem", label: "Services", url: "/service", children: [] }, // redirects to services
  { id: 2, type: "MenuItem", label: "Ecom", url: "/shop", children: [] }, // redirects to shop
  { id: 3, type: "MenuItem", label: "Contact", url: "/contact", children: [] },
];

const TopNavbar = () => {
  return (
    <nav className="sticky top-0 bg-white z-20 shadow-sm">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-5 md:py-6 px-4 xl:px-0">
        {/* Logo */}
        <div className="flex items-center">
          <div className="block md:hidden mr-4">
            <ResTopNavbar data={data} />
          </div>
          <Link
            href="/"
            className={cn(
              integralCF.className,
              "text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10 font-bold"
            )}
          >
         Book.Verse
          </Link>
        </div>

        {/* Navigation Menu */}
        <NavigationMenu className="hidden md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            {data.map((item) => (
              <MenuItem key={item.id} label={item.label} url={item.url} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search */}
        <InputGroup className="hidden md:flex bg-[#F0F0F0] mr-3 lg:mr-10">
          <InputGroup.Text>
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
            className="bg-transparent placeholder:text-black/40"
          />
        </InputGroup>

        {/* Right Icons */}
        <div className="flex items-center">
          <Link href="/search" className="block md:hidden mr-[14px] p-1">
            <Image
              priority
              src="/icons/search-black.svg"
              height={150}
              width={150}
              alt="search"
              className="max-w-[52px] max-h-[32px]"
            />
          </Link>
          <CartBtn />
         
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
