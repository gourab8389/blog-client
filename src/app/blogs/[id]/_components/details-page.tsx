"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Blog, blog_service, useAppData, User } from "@/context/app-context";
import axios from "axios";
import {
  Bookmark,
  ChevronLeft,
  Edit,
  Loader2,
  Trash,
  Trash2Icon,
} from "lucide-react";
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
          {isAuth && (
            <Button variant={"ghost"} className="ml-2" size={"icon"}>
              <Bookmark className="h-4 w-4 text-muted-foreground" />
            </Button>
          )}
          {blog.author === user?.user?._id && (
            <>
              <Button variant={"outline"} className="ml-auto" size={"sm"}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant={"destructive"} className="ml-2" size={"sm"}>
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full md:max-h-150 object-cover rounded-md"
        />
        <p className="text-lg">{blog.description}</p>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.blogcontent }}
        ></div>
      </div>
      {isAuth && (
        <Card>
          <CardHeader className="text-xl font-semibold">
          Leave a Comment
          </CardHeader>
          <CardContent>
            <Label htmlFor="comment">
              Your Comment
            </Label>
            <Textarea
              id="comment"
              placeholder="Write your comment here..."
              className="my-2 resize-none"
              />
            <Button>
              Post Comment
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DetailsPage;
