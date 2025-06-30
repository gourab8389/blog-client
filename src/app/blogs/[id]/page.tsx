import React from "react";
import DetailsPage from "./_components/details-page";

interface BlogIdPageProps {
  params: Promise<{
    id: string;
  }>;
}

const BlogIdPage = async ({ params }: BlogIdPageProps) => {
  const { id } = await params;
  return <DetailsPage id={id} />;
};

export default BlogIdPage;