"use client";

import BlogCards from "@/components/shared/blog-cards";
import { Blog, useAppData } from "@/context/app-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";

const SavedBlogs = () => {
  const { blogs, savedBlogs, isAuth, user } = useAppData();

  if (!user || !isAuth) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-semibold text-muted-foreground mb-4">
          Please log in to view your saved blogs.
        </h1>
        <Link href="/login">
          <Button className="bg-blue-500 text-white hover:bg-blue-600">
            Log In
            <ChevronRight className="inline-block" />
          </Button>
        </Link>
      </div>
    );
  }

  if (!blogs || !savedBlogs) {
    return <div className="flex items-center justify-center h-full">
      <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
    </div>;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="text-2xl font-semibold text-muted-foreground">
        Your Saved Blogs
      </h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {savedBlogs.map((blog: Blog) => (
          <BlogCards
            key={blog.id}
            id={blog.id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            author={blog.author}
            created_at={blog.created_at}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedBlogs;
