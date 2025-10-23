import * as React from "react";
import Link from "next/link";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

type MenuItemProps = {
  label: string;
  url?: string;
};

export function MenuItem({ label, url }: MenuItemProps) {
  return (
    <NavigationMenuItem>
      <Link href={url ?? "/"} legacyBehavior passHref>
        <NavigationMenuLink
          className={cn([
            navigationMenuTriggerStyle(), 
            "font-bold px-4 text-gray-700 hover:bg-gradient-to-r  hover:purple-50 hover:text-white transition-all duration-300 rounded-lg"
          ])}
        >
          {label}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}