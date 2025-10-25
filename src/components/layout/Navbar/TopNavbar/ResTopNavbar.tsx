import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { NavMenu } from "../navbar.types";
import { Menu, Home, ShoppingBag, Info, Wrench, Phone } from "lucide-react";

const ResTopNavbar = ({ data }: { data: NavMenu }) => {
  const iconMap: { [key: string]: any } = {
    "Home": Home,
    "Shop": ShoppingBag,
    "About": Info,
    "Services": Wrench,
    "Contact": Phone,
  };

  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 transition-all shadow-sm">
          <Menu className="w-5 h-5 text-pink-600" />
        </div>
      </SheetTrigger>
      
      <SheetContent 
        side="left" 
        className="overflow-y-auto bg-[#fff9fb] border-r-2 border-pink-200 w-[280px] sm:w-[320px]"
      >
        <SheetHeader className="mb-8 border-b-2 border-pink-200 pb-4">
          <SheetTitle asChild>
            <SheetClose asChild>
              <Link 
                href="/" 
                className={cn([
                  integralCF.className, 
                  "text-2xl font-bold bg-rose-500 bg-clip-text text-transparent hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 transition-all"
                ])}
              >
                BestGiftEver
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col items-start space-y-3">
          {data.map((item) => {
            const IconComponent = iconMap[item.label] || ShoppingBag;
            
            return item.type === "MenuItem" ? (
              <SheetClose key={item.id} asChild>
                <Link 
                  href={item.url ?? "/"} 
                  className="group w-full flex items-center gap-3 text-base font-bold text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-rose-500 hover:from-pink-600 hover:to-purple-600 transition-all duration-300 p-3 rounded-xl hover:bg-white/80 backdrop-blur-sm border-2 border-transparent hover:border-pink-200 hover:shadow-md"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-r from-pink-100 to-purple-100 group-hover:from-pink-200 group-hover:to-purple-200 transition-all">
                    <IconComponent className="w-5 h-5 text-pink-600 group-hover:" />
                  </div>
                  <span>{item.label}</span>
                </Link>
              </SheetClose>
            ) : null;
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ResTopNavbar;