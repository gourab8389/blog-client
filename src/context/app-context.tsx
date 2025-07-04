"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const user_service = process.env.NEXT_PUBLIC_USER_SERVICE_URL;
export const blog_service = process.env.NEXT_PUBLIC_BLOG_SERVICE_URL;
export const author_service = process.env.NEXT_PUBLIC_AUTHOR_SERVICE_URL;

export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  bio: string;
}

export interface UserRespose {
  success: boolean;
  message: string;
  user: User;
}

export interface Blog {
  id: number;
  title: string;
  description: string;
  blogcontent: string;
  image: string;
  category: string;
  author: string;
  created_at: Date;
}

interface BlogResponse {
  success: boolean;
  message: string;
  blogs: Blog[];
}

interface AppContextType {
  user: UserRespose | null;
  loading: boolean;
  isAuth: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<UserRespose | null>>;
  logoutUser: () => Promise<void>;
  blogs: BlogResponse | null;
  blogLoading: boolean;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  category: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserRespose | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    try {
      const token = Cookies.get("token");
      const { data } = await axios.get(`${user_service}/api/v1/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
      setLoading(false);
    }
  }
  const [blogLoading, setBlogLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogResponse | null>(null);

  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchBlogs() {
    setBlogLoading(true);
    try {
      const { data } = await axios.get(`${blog_service}/api/v1/blog/all?searchQuery=${searchQuery}&category=${category}`);
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }finally{
      setBlogLoading(false);
    }
  }

  async function logoutUser() {
    Cookies.remove("token");
    setUser(null);
    setIsAuth(false);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [searchQuery, category]);

  return (
    <AppContext.Provider
      value={{ 
        user, 
        setIsAuth, 
        isAuth, 
        setLoading, 
        loading, 
        setUser, 
        logoutUser, 
        blogs, 
        blogLoading,
        setSearchQuery,
        searchQuery,
        setCategory,
        category 
      }}
    >
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
      >
        {children}
      </GoogleOAuthProvider>
    </AppContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppData must be used within an AppProvider");
  }
  return context;
};
