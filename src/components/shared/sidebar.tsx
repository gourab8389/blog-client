import { navMenu } from "@/constants/menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div
      className={cn(
        "bg-blue-50/50 flex flex-col justify-between py-5 px-3",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="text-2xl font-bold text-center">Blog Web</h1>
        <div className="flex flex-col w-full gap-3">
        {navMenu.map((item) => (
          <Link
            key={item.title}
            href={item.path}
            className="text-lg font-semibold text-blue-900 p-1 rounded-md w-full bg-white text-center"
          >
            {item.title}
          </Link>
        ))}
      </div>
      </div>
      <div className="w-full">
        <Link href={"/login"}>
          <Button className="w-full">Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
