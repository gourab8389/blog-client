import React from "react";
import AuthorPage from "./_components/author-page";

interface BlogAuthorPageProps {
  params: Promise<{
    id: string;
  }>;
}

const BlogAuthorPage = async ({ params }: BlogAuthorPageProps) => {
  const { id } = await params;
  return <AuthorPage id={id} />;
};

export default BlogAuthorPage;