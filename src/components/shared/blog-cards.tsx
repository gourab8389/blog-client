import Link from "next/link";
import { Card } from "../ui/card";
import { Calendar } from "lucide-react";

interface BlogCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
  created_at: Date;
}

const BlogCards = ({
  id,
  title,
  description,
  image,
  author,
  created_at,
}: BlogCardProps) => {
  return (
    <Link href={`/blogs/${id}`} key={id}>
      <Card className="p-2 flex flex-col gap-2">
        <div>
          <img
            src={image}
            alt={title}
            className="w-full h-40 object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-1">
            <span className="font-medium">Author:</span> {author}
          </p>
          <p className="text-xs text-muted-foreground flex items-center">
            <Calendar size={16} className="mr-2" />
            {new Date(created_at).toLocaleDateString()}
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default BlogCards;
