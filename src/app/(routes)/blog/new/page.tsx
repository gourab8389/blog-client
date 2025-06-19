"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, RefreshCw, Upload } from "lucide-react";
import React, { useMemo, useRef, useState } from "react";
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
import { author_service } from "@/context/app-context";
import { toast } from "sonner";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const AddBlog = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiTitle, setAiTitle] = useState(false);
  const [aiDescription, setAiDescription] = useState(false);
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
        `${author_service}/api/v1/blog/new`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Blog created successfully!");
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
      toast.error("Failed to create blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const aiTitleRespose = async () => {
    try {
      setAiTitle(true);
      const { data } = await axios.post(`${author_service}/api/v1/ai/title`, {
        text: formData.title,
      });
      setFormData({
        ...formData,
        title: data.title,
      });
    } catch (error) {
      console.error("Error generating AI title:", error);
      toast.error("Failed to generate AI title. Please try again.");
    } finally {
      setAiTitle(false);
    }
  };

  const aiDescriptionResponse = async () => {
    try {
      setAiDescription(true);
      const { data } = await axios.post(
        `${author_service}/api/v1/ai/description`,
        {
          title: formData.title,
          description: formData.description,
        }
      );
      setFormData({
        ...formData,
        description: data.description,
      });
    } catch (error) {
      console.error("Error generating AI description:", error);
      toast.error("Failed to generate AI description. Please try again.");
    } finally {
      setAiDescription(false);
    }
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typings...",
    }),
    []
  );
  return (
    <div className="md:p-6 w-full">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Add New Blog</h2>
          <p className="text-sm text-muted-foreground">
            Create a new blog post by filling out the form below.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormGroup>
              <Label>Title</Label>
              <div className="flex justify-center items-center gap-2">
                <Input
                  name="title"
                  required
                  placeholder="Enter blog title"
                  value={formData.title}
                  onChange={hadleInputChange}
                  className={
                    aiTitle ? "animate-pulse placeholder:opacity-60" : ""
                  }
                />
                {formData.title && (
                  <Button
                    type="button"
                    size={"icon"}
                    className="flex items-center justify-center"
                    onClick={aiTitleRespose}
                    disabled={aiTitle}
                  >
                    <RefreshCw className={aiTitle ? "animate-spin" : ""} />
                  </Button>
                )}
              </div>
            </FormGroup>
            <FormGroup>
              <Label>Description</Label>
              <div className="flex gap-2">
                <Textarea
                  name="description"
                  required
                  placeholder="Enter blog title"
                  value={formData.description}
                  onChange={hadleInputChange}
                  className={
                    aiDescription ? "animate-pulse placeholder:opacity-60 resize-none" : "resize-none"
                  }
                />
                {formData.description && (
                  <Button
                    type="button"
                    size={"icon"}
                    className="flex items-center justify-center"
                    onClick={aiDescriptionResponse}
                    disabled={aiDescription}
                  >
                    <RefreshCw className={aiDescription ? "animate-spin" : ""} />
                  </Button>
                )}
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
                  <Button type="button" size={"sm"}>
                    <RefreshCw className="h-4 w-4" />
                    <span className="ml-1">Fix Content</span>
                  </Button>
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
              Create Blog
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

export default AddBlog;
