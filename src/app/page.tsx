import Link from "next/link";
import React from "react";

const RootPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Link
        href={"/blogs"}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Go to Blogs
      </Link>
    </div>
  );
};

export default RootPage;
