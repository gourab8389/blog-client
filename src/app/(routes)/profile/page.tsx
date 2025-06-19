"use client";

import { useAppData, user_service } from "@/context/app-context";
import { useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setloading] = useState(false);
  const { user, setUser } = useAppData();

  const changeHandler = async (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        setloading(true);
        const token = Cookies.get("token");
        const { data } = await axios.post(
          `${user_service}/api/v1/user/update/profile`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Profile picture updated successfully!");
        setloading(false);
        Cookies.set("token", data.token, {
          expires: 5,
          secure: true,
          path: "/",
        });
        setUser(data);
        setloading(false);
      } catch (error) {
        console.error("Error updating profile picture:", error);
        toast.error("Failed to update profile picture.");
        setloading(false);
      }
    }
  };

  const clickHandler = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-1">
      {loading ? (
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      ) : (
        <Card className="shadow-md rounded-lg p-6 max-w-md w-full items-center">
          <h1 className="text-2xl font-bold mb-2 text-center">Profile</h1>
          {user && (
            <div className="flex flex-col gap-4 items-center">
              <Avatar
                className="w-28 h-28 cursor-pointer"
                onClick={clickHandler}
              >
                <AvatarImage
                  src={user.user.image}
                  alt="profile"
                  className="object-cover"
                />
                <input
                  type="file"
                  ref={inputRef}
                  accept="image/*"
                  onChange={changeHandler}
                  className="hidden"
                />
              </Avatar>
              <div>
                <strong>Name:</strong> {user.user.name}
              </div>
              <div>
                <strong>Email:</strong> {user.user.email}
              </div>
              {user.user?.bio && (
                <div>
                  <strong>Bio:</strong> {user.user.bio}
                </div>
              )}
              <div className="flex gap-2">
                {user.user.instagram && (
                  <a
                    href={user.user.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    <img src="/instagram.svg" alt="insta" className="w-7 h-7" />
                  </a>
                )}
                {user.user.facebook && (
                  <a
                    href={user.user.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    <img
                      src="/facebook.svg"
                      alt="facebook"
                      className="w-7 h-7"
                    />
                  </a>
                )}
                {user.user.linkedin && (
                  <a
                    href={user.user.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    <img
                      src="/linkedin.svg"
                      alt="linkedin"
                      className="w-7 h-7"
                    />
                  </a>
                )}
              </div>
              <div className="flex items-center">
                <Button>
                  Add Blog
                  <Plus className="font-bold" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default ProfilePage;
