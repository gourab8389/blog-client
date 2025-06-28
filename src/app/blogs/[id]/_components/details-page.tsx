"use client";

import { Button } from "@/components/ui/button";
import { Blog, blog_service, useAppData, User } from "@/context/app-context";
import axios from "axios";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DetailsPageProps {
  id: string;
}

interface BlogIdResponse {
  status: boolean;
  message: string;
  resposeData: {
    resposeData: {
      blog: Blog;
      author: User;
    };
  };
}

const DetailsPage = ({ id }: DetailsPageProps) => {
  const router = useRouter();
  const { isAuth, user } = useAppData();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchBlogDetails() {
    try {
      setLoading(true);

      const data = await axios.get(`${blog_service}/api/v1/blog/${id}`);
      const response: BlogIdResponse = data.data;

      if (response.status) {
        setBlog(response.resposeData.resposeData.blog);
        setAuthor(response.resposeData.resposeData.author);
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      fetchBlogDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <p>Blog not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 p-2 md:p-5 border rounded-md">
      <div className="flex md:flex-row flex-col gap-5">
        <Button
          onClick={() => router.back()}
          variant={"outline"}
          size={"sm"}
          className="w-fit"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">{blog.title}</h1>
      </div>
      <div className="w-full flex flex-col gap-3">
        <div className="flex gap-1 items-center">
          <Link
            href={`/profile/${author?._id}`}
            className="flex items-center gap-2"
          >
            <img
              src={author?.image}
              className="w-8 h-8 rounded-full object-cover"
              alt="Author Avatar"
            />
            <span className="text-sm font-semibold text-foreground hover:underline">
              {author?.name || "Unknown Author"}
            </span>
          </Link>
          <p className="text-sm text-muted-foreground">
            {new Date(blog.created_at).toLocaleDateString()}
          </p>
        </div>
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full md:max-h-150 object-cover rounded-md"
        />
        <p className="text-lg">{blog.description}</p>
        <div
          className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none 
                     prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground
                     prose-em:text-foreground prose-code:text-foreground prose-pre:bg-muted
                     prose-blockquote:text-foreground prose-blockquote:border-l-primary
                     prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground
                     prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                     prose-img:rounded-lg prose-img:shadow-md prose-hr:border-border
                     prose-table:text-foreground prose-th:text-foreground prose-td:text-foreground
                     prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                     prose-code:text-sm prose-code:font-mono prose-code:border
                     [&>*]:mb-4 [&>p]:leading-relaxed [&>h1]:mt-8 [&>h2]:mt-6 [&>h3]:mt-4
                     [&>ul]:space-y-2 [&>ol]:space-y-2 [&>blockquote]:pl-4 [&>blockquote]:py-2
                     [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto
                     [&_code]:break-words [&_pre_code]:break-normal"
          dangerouslySetInnerHTML={{ __html: blog.blogcontent }}
        ></div>
      </div>
    </div>
  );
};

export default DetailsPage;
