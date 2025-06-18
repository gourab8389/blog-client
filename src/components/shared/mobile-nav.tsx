import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navMenu } from "@/constants/menu";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";

interface MobileNavProps {
  className?: string;
}

const MobileNav = ({ className }: MobileNavProps) => {
  return (
    <div className={cn("md:hidden", className)}>
      <Sheet>
        <SheetTrigger className="z-50 bg-white">
          <Menu className="w-7 h-7" />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="hidden">Are you absolutely sure?</SheetTitle>
            <div className="flex flex-col gap-5 py-5 px-3">
              <div className="flex items-center justify-center">
                <h1 className="text-2xl font-bold text-center">Blog Web</h1>
              </div>
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
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
