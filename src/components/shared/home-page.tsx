"use client";

import { useAppData } from "@/context/app-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Homepage = () => {
  const router = useRouter();
  const { isAuth } = useAppData();

  useEffect(() => {
    if (isAuth) {
      router.push("/blogs");
    }
  }, [isAuth, router]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Link
        href={"/blogs"}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Go to Blogs
      </Link>
    </div>
  );
};

export default Homepage;