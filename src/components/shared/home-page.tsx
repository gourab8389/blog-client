"use client";

import { useAppData } from "@/context/app-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";

const Homepage = () => {
  const router = useRouter();
  const { isAuth } = useAppData();

  useEffect(() => {
    if (isAuth) {
      router.push("/blogs");
    }
  }, [isAuth, router]);

  return (
    <div className="h-screen bg-gradient-to-br from-blue-500 via-blue-100 to-slate-500 relative overflow-hidden">
      {/* Static background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <header className="px-6 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="StackStories Logo" 
                className="w-20 h-20 rounded-lg"
              />
              <span className="text-3xl font-bold text-blue-500">STACKSTORIES</span>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-blue-500 mb-6 leading-tight">
              Where Stories
              <span className="text-blue-500 bg-clip-text block">
                Stack Up
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-blue-900 mb-8 leading-relaxed max-w-2xl mx-auto">
              Discover, share, and stack your stories with a community of passionate writers and readers. 
              Every story matters, every voice counts.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                href="/blogs"
                className="group bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <span>Start Reading</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Homepage;