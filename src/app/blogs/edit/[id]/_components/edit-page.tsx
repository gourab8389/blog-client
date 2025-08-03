"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Loader2, Plus, RefreshCw, Upload } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { blogCategories } from "@/constants/category";
import FormGroup from "@/components/shared/group";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import axios from "axios";
import { author_service, blog_service } from "@/context/app-context";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const EditPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [existingImage, setExistingImage] = useState(null);

  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
    blogcontent: "",
  });

  const hadleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typings...",
    }),
    []
  );

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("token");
        const { data } = await axios.get(`${blog_service}/api/v1/blog/${id}`);
        const blog = data.resposeData.resposeData.blog;
        setFormData({
          title: blog.title,
          description: blog.description,
          category: blog.category,
          image: blog.image,
          blogcontent: blog.blogcontent,
        });
        setContent(blog.blogcontent);
        setValue(blog.category);
        setExistingImage(blog.image);
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to fetch blog details.");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("blogcontent", content);
    if (formData.image) {
      formDataToSend.append("file", formData.image);
    }

    try {
      const token = Cookies.get("token");
      const { data } = await axios.post(
        `${author_service}/api/v1/blog/${id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Blog updated successfully!");
      setFormData({
        title: "",
        description: "",
        category: "",
        image: null,
        blogcontent: "",
      });
      setContent("");
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to update blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:p-6 w-full">
      <Card>
        <CardHeader>
          <div className="flex gap-2 items-center">
            <Button
              variant="outline"
              className="mb-4"
              onClick={() => router.back()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-2xl font-bold">Edit Blog</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Update your blog details below. Ensure all fields are filled out
            correctly before submitting.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormGroup>
              <div className="flex justify-between">
                <Label>Title</Label>
              </div>
              <div className="flex justify-center items-center gap-2">
                <Input
                  name="title"
                  required
                  placeholder="Enter blog title"
                  value={formData.title}
                  onChange={hadleInputChange}
                />
              </div>
            </FormGroup>
            <FormGroup>
              <div className="flex justify-between">
                <Label>Description</Label>
              </div>
              <div className="flex gap-2">
                <Textarea
                  name="description"
                  required
                  placeholder="Enter blog title"
                  value={formData.description}
                  onChange={hadleInputChange}
                  className="resize-none"
                />
              </div>
            </FormGroup>
            <FormGroup>
              <Label>Category</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className="!w-fit">
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between",
                      !value && "text-muted-foreground"
                    )}
                  >
                    {value || "Select a category"}
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                  <Command
                    onValueChange={(value: any) =>
                      setFormData({
                        ...formData,
                        category: value,
                      })
                    }
                  >
                    <CommandInput
                      placeholder={formData.category || "Search category..."}
                    />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {blogCategories.map((category) => (
                          <CommandItem
                            key={category}
                            onSelect={(currentValue) => {
                              setValue(currentValue);
                              setFormData({
                                ...formData,
                                category: currentValue,
                              });
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === category ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {category}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormGroup>
            <div className="">
              <FormGroup>
                <Label>Image Upload</Label>
                {existingImage && formData.image && (
                  <div className="mb-2">
                    <img
                      src={existingImage}
                      alt="Existing Blog Image"
                      className="w-48 h-48 object-cover rounded-md"
                    />
                  </div>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  name="image"
                  required
                  className="border border-gray-300 rounded pb-2 w-full"
                  onChange={handleFileChange}
                  placeholder="Upload an image for your blog"
                />
              </FormGroup>
            </div>
            <div className="">
              <FormGroup>
                <Label>Blog Content</Label>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Paste your blog or type here . You can use rich text
                    formatting. Please add image after improving your grammer
                    and spellings.
                  </p>
                </div>
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  tabIndex={1}
                  onBlur={(newContent) => {
                    setContent(newContent);
                    setFormData({
                      ...formData,
                      blogcontent: newContent,
                    });
                  }}
                />
              </FormGroup>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              Update Blog
              {loading ? (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPage;
