"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, Upload } from "lucide-react";
import React from "react";
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

const AddBlog = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSubmit = () => {
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
            <FormGroup>
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
            </FormGroup>
            <FormGroup>
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
                  <Command>
                    <CommandInput placeholder="Search categories..." />
                    <CommandList>
                      <CommandEmpty>No categories found.</CommandEmpty>
                      <CommandGroup>
                        {blogCategories.map((category) => (
                          <CommandItem
                            key={category}
                            value={category}
                            onSelect={(currentValue) => {
                              setValue(currentValue);
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
                />
              </FormGroup>
            </div>
            <div className="">
              <FormGroup>
                <Label>Blog Content</Label>
                <div className="flex justify-between items-center mb-2">
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
              </FormGroup>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBlog;
