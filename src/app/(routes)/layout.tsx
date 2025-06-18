import Sidebar from "@/components/shared/sidebar";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="flex md:h-screen w-full gap-2">
      <Sidebar className="w-[15%] md:flex hidden" />
      <div className="md:w-[85%] w-full md:h-screen md:overflow-y-scroll p-5">{children}</div>
    </main>
  );
};

export default DashboardLayout;
