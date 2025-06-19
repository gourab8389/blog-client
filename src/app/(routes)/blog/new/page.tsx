"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw } from "lucide-react";
import React from "react";


const AddBlog = () => {
  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form submitted");
  };
  return (
    <div className="p-6 w-full">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Add New Blog</h2>
          <p className="text-sm text-muted-foreground">
            Create a new blog post by filling out the form below.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Label>Title</Label>
            <div className="flex justify-center items-center gap-2">
              <Input name="title" required placeholder="Enter blog title" />
              <Button
                type="button"
                size={"icon"}
                className="flex items-center justify-center"
              >
                <RefreshCw />
              </Button>
            </div>
            <Label>Description</Label>
            <div className="flex gap-2">
              <Textarea
                name="description"
                required
                placeholder="Enter blog title"
                className="resize-none"
              />
              <Button
                type="button"
                size={"icon"}
                className="flex items-center justify-center"
              >
                <RefreshCw />
              </Button>
            </div>
            <Label>Category</Label>
            <Select name="category" required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>

              </SelectContent>
            </Select>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBlog;
