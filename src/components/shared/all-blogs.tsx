"use client";
import { useState } from "react";
import { useAppData } from "@/context/app-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { blogCategories } from "@/constants/category";
import { BoxSelect, ChevronDown, ChevronUp } from "lucide-react";

const AllBlogs = () => {
  const { user, loading, blogLoading, blogs } = useAppData();
  const [visibleCategories, setVisibleCategories] = useState(20);
  
  const CATEGORIES_PER_PAGE = 20;
  const hasMoreCategories = visibleCategories < blogCategories.length;
  const canShowLess = visibleCategories > CATEGORIES_PER_PAGE;
  
  const handleShowMore = () => {
    setVisibleCategories(prev => 
      Math.min(prev + CATEGORIES_PER_PAGE, blogCategories.length)
    );
  };
  
  const handleShowLess = () => {
    setVisibleCategories(prev => 
      Math.max(prev - CATEGORIES_PER_PAGE, CATEGORIES_PER_PAGE)
    );
  };
  
  return (
    <div className="w-full mt-8 flex flex-col gap-5">
      <div className="">
        <Input
          placeholder="Search blogs by title or author"
          className="!h-12"
          disabled={loading || blogLoading}
          onChange={(e) => {
            // Implement search functionality here
          }}
        />
      </div>
      <div className="flex flex-col gap-2 border p-2 rounded-md bg-blue-50/30">
        <h1 className="text-muted-foreground font-medium text-xl">Categories{" "}({blogCategories.length})</h1>
        <div className="grid grid-cols-5 gap-3">
          {blogCategories.slice(0, visibleCategories).map((category, index) => {
            return (
              <div
                key={index}
                className="!h-8 !rounded-md !text-sm flex items-center gap-2 border p-1 line-clamp-1 cursor-pointer hover:bg-muted transition-all duration-200"
              >
                <BoxSelect className="h-4 w-4" />
                {category}
              </div>
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
                Show More ({Math.min(CATEGORIES_PER_PAGE, blogCategories.length - visibleCategories)} more)
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
    </div>
  );
};

export default AllBlogs;