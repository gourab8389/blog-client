import React from "react";

interface BlogAuthorPageProps {
  params: Promise<{
    id: string;
  }>;
}

const BlogAuthorPage = async ({ params }: BlogAuthorPageProps) => {
  const { id } = await params;
  return <div>Blog Author Page for Author ID: {id}</div>;
};

export default BlogAuthorPage;