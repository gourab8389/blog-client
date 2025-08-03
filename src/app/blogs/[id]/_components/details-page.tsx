"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Blog, blog_service, useAppData, User } from "@/context/app-context";
import axios from "axios";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Edit,
  Loader2,
  Trash2,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";

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

interface Comment {
  id: string;
  comment: string;
  userid: string;
  username: string;
  blogid: string;
  created_at: Date;
}

const DetailsPage = ({ id }: DetailsPageProps) => {
  const router = useRouter();
  const { isAuth, user } = useAppData();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [author, setAuthor] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null
  );

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

  const handleEdit = () => {
    router.push(`/blogs/edit/${id}`);
  };

  async function addComment() {
    try {
      setCommentLoading(true);
      const token = Cookies.get("token");
      const { data } = await axios.post(
        `${blog_service}/api/v1/comment/${id}`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      setComment("");
      fetchComments();
    } catch (error) {
      toast.error("Failed to add comment. Please try again.");
    } finally {
      setCommentLoading(false);
    }
  }

  async function fetchComments() {
    try {
      setCommentLoading(true);
      const { data } = await axios.get(`${blog_service}/api/v1/comment/${id}`);
      const response: {
        status: boolean;
        message: string;
        comments: Comment[];
      } = data;
      if (response.status) {
        setComments(response.comments);
      } else {
        console.error("Failed to fetch comments.");
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setCommentLoading(false);
    }
  }

  useEffect(() => {
    fetchComments();
  }, [id]);

  async function deleteComment(id: string) {
    try {
      setDeletingCommentId(id);
      const token = Cookies.get("token");
      const { data } = await axios.delete(
        `${blog_service}/api/v1/comment/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      fetchComments();
    } catch (error) {
      toast.error("Failed to delete comment. Please try again.");
    } finally {
      setDeletingCommentId(null);
    }
  }

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
              <Button
                variant={"outline"}
                className="ml-auto"
                size={"sm"}
                onClick={handleEdit}
              >
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
            <Label htmlFor="comment">Your Comment</Label>
            <Textarea
              id="comment"
              placeholder="Write your comment here..."
              className="my-2 resize-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button onClick={addComment} disabled={commentLoading}>
              Post Comment
              {commentLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader className="text-xl font-semibold">
          Comments ({comments.length})
        </CardHeader>
        <CardContent>
          {comments.length > 0 ? (
            <div className="space-y-1">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border p-2 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-muted-foreground">
                      {comment.username}
                    </span>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </p>
                      {comment.userid === user?.user?._id && (
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => deleteComment(comment.id)}
                          disabled={deletingCommentId === comment.id}
                        >
                          {deletingCommentId === comment.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed">{comment.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No comments yet. Be the first to comment!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailsPage;
