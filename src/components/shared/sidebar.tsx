"use client";

import { navMenu } from "@/constants/menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useAppData } from "@/context/app-context";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const { user } = useAppData();

  return (
    <div
      className={cn(
        "bg-gray-100/50 flex flex-col justify-between py-5 px-3 border-r",
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
        <Separator className="mb-3 bg-blue-400" />
        {user ? (
          <Link href={"/profile"}>
            <Button className="w-full flex">
              <Avatar className="w-7 h-7">
                <AvatarImage src={user.user.image} className="object-cover"/>
                <AvatarFallback className="bg-white text-blue-500">
                  {user.user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {user.user.name}
            </Button>
          </Link>
        ) : (
          <Link href={"/login"}>
            <Button className="w-full">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
