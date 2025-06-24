import { useAppData } from "@/context/app-context";
import React from "react";

const AllBlogs = () => {
  const { user, loading, blogLoading, blogs } = useAppData();
  return <div></div>;
};

export default AllBlogs;
