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
  const { isAuth, user, setIsAuth, loading, setLoading } = useAppData();

  React.useEffect(() => {
    if (isAuth && user) {
      router.push("/");
    }
  }, [isAuth, user, router]);

  const resposeGoogle = async (authResult: any) => {
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
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: resposeGoogle,
    onError: resposeGoogle,
    flow: "auth-code",
    
  })

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
            onClick={googleLogin}
            disabled={loading}
            className="w-full h-12 border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
          >
            <img src="/google.svg" alt="google" className='w-8' />
            <span className="font- text-lg text-muted-foreground">Continue with Google</span>
            {loading && <Loader2 className='w-5 h-5 animate-spin ml-2 text-muted-foreground' />}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;