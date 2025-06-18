"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navMenu } from "@/constants/menu";
import { useAppData } from "@/context/app-context";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface MobileNavProps {
  className?: string;
}

const MobileNav = ({ className }: MobileNavProps) => {
  const { isAuth, user } = useAppData();
  return (
    <div className={cn("md:hidden", className)}>
      <Sheet>
        <SheetTrigger className="z-50 bg-white">
          <Menu className="w-7 h-7" />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="hidden">Are you absolutely sure?</SheetTitle>
            <div className="flex flex-col justify-between !h-[90vh] py-5 px-3">
              <div className="flex flex-col gap-5 items-center justify-center">
                <h1 className="text-2xl font-bold text-center">Blog Web</h1>
                <div className="flex flex-col w-full gap-3">
                  {navMenu.map((item) => (
                    <Link
                      key={item.title}
                      href={item.path}
                      className="text-lg font-semibold text-blue-900 p-1 rounded-md w-full bg-blue-50 hover:bg-blue-100 text-center"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="w-full">
                {user ? (
                  <Link href={"/profile"}>
                    <Button className="w-full">{user.user.name}</Button>
                  </Link>
                ) : (
                  <Link href={"/login"}>
                    <Button className="w-full">Login</Button>
                  </Link>
                )}
              </div>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
