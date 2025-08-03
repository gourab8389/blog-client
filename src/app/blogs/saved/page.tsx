"use client";

import BlogCards from "@/components/shared/blog-cards";
import { Blog, useAppData } from "@/context/app-context";
import React, { useEffect, useState } from "react";

const SavedBlogs = () => {
  const { blogs, savedBlogs } = useAppData();

  if (!blogs || !savedBlogs) {
    return <div>Loading...</div>;
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
