"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const handleGoogleLogin = () => {
    console.log("Google login initiated");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 login-bg">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Welcome to Blog Web
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <Button
          variant={"outline"} 
            onClick={handleGoogleLogin}
            className="w-full h-12 border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
          >
            <img src="/google.svg" alt="google" className='w-8' />
            <span className="font- text-lg text-muted-foreground">Continue with Google</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;