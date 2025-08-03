"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { useAppData, user_service } from '@/context/app-context';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useGoogleLogin } from "@react-oauth/google"
import { Loader2 } from 'lucide-react';

const LoginPage = () => {
  const router = useRouter();
  const { isAuth, user, setIsAuth, loading, setLoading, setUser } = useAppData();

  React.useEffect(() => {
    if (isAuth && user) {
      router.push("/blogs");
    }
  }, [isAuth, user, router]);

  const resposeGoogle = async (authResult: any) => {
    setLoading(true);
    try {
      const result = await axios.post(`${user_service}/api/v1/login`, {
        code: authResult["code"],
      })

      Cookies.set("token", result.data.token, {
        expires: 5,
        secure: true,
        path: "/",
      });
      toast.success("Login successful!");
      setUser(result.data);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: resposeGoogle,
    onError: resposeGoogle,
    flow: "auth-code",
    
  })

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
                className="w-16 h-16 rounded-lg"
              />
              <span className="text-2xl font-bold text-blue-500">STACKSTORIES</span>
            </div>
          </div>
        </header>

        {/* Login Section */}
        <main className="flex-1 flex items-center justify-center px-6">
          <Card className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-2xl border border-white/20 rounded-2xl">
            <CardHeader className="text-center pb-6 pt-8">
              <CardTitle className="text-3xl font-bold text-blue-500 mb-2">
                Welcome Back
              </CardTitle>
              <p className="text-blue-900/70 text-sm">
                Sign in to continue your story journey
              </p>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <Button
                variant="outline" 
                onClick={googleLogin}
                disabled={loading}
                className="w-full h-14 border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-blue-900 font-medium text-lg rounded-xl shadow-sm"
              >
                <img src="/google.svg" alt="google" className='w-6 h-6 mr-3' />
                <span>Continue with Google</span>
                {loading && <Loader2 className='w-5 h-5 animate-spin ml-3 text-blue-500' />}
              </Button>
              
              <div className="mt-6 text-center">
                <p className="text-xs text-blue-900/50">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default LoginPage;