import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { NavMenu } from "../navbar.types";

const ResTopNavbar = ({ data }: { data: NavMenu }) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <Image
          priority
          src="/icons/menu.svg"
          height={100}
          width={100}
          alt="menu"
          className="max-w-[22px] max-h-[22px]"
        />
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto">
        <SheetHeader className="mb-10">
          <SheetTitle asChild>
            <SheetClose asChild>
              <Link href="/" className={cn([integralCF.className, "text-2xl"])}>
                SHOP.CO
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col items-start space-y-4">
          {data.map((item) =>
            item.type === "MenuItem" ? (
              <SheetClose key={item.id} asChild>
                <Link href={item.url ?? "/"} className="text-base font-medium">
                  {item.label}
                </Link>
              </SheetClose>
            ) : null // no MenuList anymore
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ResTopNavbar;
