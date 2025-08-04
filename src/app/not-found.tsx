"use client";

import Link from "next/link";
import React from "react";
import { ArrowLeft, Home, Search } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-500 via-blue-100 to-slate-500 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>

      <div className="relative z-10 flex flex-col h-screen">
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
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-4xl">
            <div className="mb-8">
              <h1 className="text-8xl md:text-9xl font-bold text-blue-500 mb-4 opacity-80">
                404
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold text-blue-500 mb-6 leading-tight">
                Story Not Found
              </h2>
            </div>
            
            <p className="text-lg md:text-xl text-blue-900 mb-8 leading-relaxed max-w-2xl mx-auto">
              Looks like this page got lost in the stack! The story you're looking for 
              doesn't exist or may have been moved to a different chapter.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                href="/"
                className="group bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <Home className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              
              <Link
                href="/blogs"
                className="group bg-white hover:bg-blue-50 text-blue-500 border-2 border-blue-500 px-8 py-4 rounded-full font-semibold text-lg shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Browse Stories</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotFoundPage;