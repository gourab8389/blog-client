import React from "react";
import DetailsPage from "./_components/details-page";

interface BlogIdPageProps {
  params: {
    id: string;
  };
}

const BlogIdPage = ({ params: { id } }: BlogIdPageProps) => {
  return <DetailsPage id={id} />
};

export default BlogIdPage;
