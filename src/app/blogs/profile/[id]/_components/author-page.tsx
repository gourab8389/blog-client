"use client";

import { useAppData, User, user_service, UserRespose } from "@/context/app-context";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Edit, Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface AuthorPageProps {
  id: string;
}

const AuthorPage = ({ id }: AuthorPageProps) => {
  const [user, setUser] = useState<UserRespose | null>(null);

  const userId = id;

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${user_service}/api/v1/user/${userId}`);
      setUser(data);
    } catch (error) {
        console.error("Error fetching user:", error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [userId]);

  if (!user?.user) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }
  return (
    <div className="h-full flex items-center justify-center p-1">
      <Card className="shadow-md rounded-lg p-6 max-w-md w-full flex flex-col items-center">
        <h1 className="text-2xl font-semibold text-muted-foreground">Author</h1>
        <div className="flex flex-col gap-4 items-center">
          <Avatar className="w-28 h-28 cursor-pointer">
            <AvatarImage
              src={user?.user.image}
              alt="profile"
              className="object-cover border rounded-full bg-blue-200"
            />
          </Avatar>
          <div>
            <strong>Name:</strong> {user?.user.name}
          </div>
          <div>
            <strong>Email:</strong> {user?.user.email}
          </div>
          {user?.user.bio && (
            <div>
              <strong>Bio:</strong> {user?.user.bio}
            </div>
          )}
          <div className="flex gap-2">
            {user?.user.instagram && (
              <a
                href={user?.user.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                <img src="/instagram.svg" alt="insta" className="w-7 h-7" />
              </a>
            )}
            {user?.user.facebook && (
              <a
                href={user?.user.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                <img src="/facebook.svg" alt="facebook" className="w-7 h-7" />
              </a>
            )}
            {user?.user.linkedin && (
              <a
                href={user?.user.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                <img src="/linkedin.svg" alt="linkedin" className="w-7 h-7" />
              </a>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AuthorPage;
