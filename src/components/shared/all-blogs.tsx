"use client";
import { useState } from "react";
import { useAppData } from "@/context/app-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { blogCategories } from "@/constants/category";
import { BoxSelect, ChevronDown, ChevronUp } from "lucide-react";

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

const AllBlogs = () => {
  const {
    user,
    loading,
    blogLoading,
    blogs,
    searchQuery,
    setSearchQuery,
    category,
    setCategory,
  } = useAppData();
  const [visibleCategories, setVisibleCategories] = useState(20);

  const CATEGORIES_PER_PAGE = 20;
  const hasMoreCategories = visibleCategories < blogCategories.length;
  const canShowLess = visibleCategories > CATEGORIES_PER_PAGE;

  const handleShowMore = () => {
    setVisibleCategories((prev) =>
      Math.min(prev + CATEGORIES_PER_PAGE, blogCategories.length)
    );
  };

  const handleShowLess = () => {
    setVisibleCategories((prev) =>
      Math.max(prev - CATEGORIES_PER_PAGE, CATEGORIES_PER_PAGE)
    );
  };

  return (
    <div className="w-full mt-8 flex flex-col gap-5">
      {/* here the search input */}
      <div className="">
        <Input
          placeholder="Search blogs by title or author"
          className="!h-12"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {/* here the categories */}
      <div className="flex flex-col gap-2 border p-2 rounded-md bg-blue-50/30">
        <h1 className="text-muted-foreground font-medium text-xl">
          Categories ({blogCategories.length})
        </h1>
        <div className="">
          <Button
            variant={"outline"}
            className="!h-8 !rounded-md !text-sm flex justify-start gap-2 hover:bg-muted transition-all duration-200"
            onClick={() => setCategory("")}
          >
            <BoxSelect className="h-4 w-4" />
            All
          </Button>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {blogCategories.slice(0, visibleCategories).map((category, index) => {
            return (
              <Button
                onClick={() => setCategory(category)}
                variant={"outline"}
                key={index}
                className="!h-8 !rounded-md !text-sm flex justify-start hover:bg-muted transition-all duration-200"
              >
                <BoxSelect className="h-4 w-4" />
                {category}
              </Button>
            );
          })}
        </div>
        {(hasMoreCategories || canShowLess) && (
          <div className="flex justify-center gap-3 mt-4">
            {hasMoreCategories && (
              <Button
                variant="outline"
                onClick={handleShowMore}
                className="flex items-center gap-2"
                disabled={loading || blogLoading}
              >
                <ChevronDown className="h-4 w-4" />
                Show More (
                {Math.min(
                  CATEGORIES_PER_PAGE,
                  blogCategories.length - visibleCategories
                )}{" "}
                more)
              </Button>
            )}
            {canShowLess && (
              <Button
                variant="outline"
                onClick={handleShowLess}
                className="flex items-center gap-2"
                disabled={loading || blogLoading}
              >
                <ChevronUp className="h-4 w-4" />
                Show Less
              </Button>
            )}
          </div>
        )}
      </div>
      {/* here the blogs */}
      <div className="flex flex-col gap-5">
        {blogLoading ? (
          <div className="text-center text-muted-foreground">
            Loading blogs...
          </div>
        ) : blogs && blogs.length > 0 ? (
          blogs.map((blog: Blog) => (
            <div
              key={blog.id}
              className="p-4 border rounded-md bg-white shadow-sm"
            >
              <h2 className="text-lg font-semibold">{blog.title}</h2>
              <p className="text-sm text-muted-foreground">
                {blog.description}
              </p>
              <p className="text-xs text-gray-500">
                By {blog.author} on{" "}
                {new Date(blog.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground">
            No blogs found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
