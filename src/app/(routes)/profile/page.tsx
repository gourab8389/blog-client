"use client";

import { useAppData, user_service } from "@/context/app-context";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "sonner";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Edit, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ProfilePage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setloading] = useState(false);
  const { user, setUser } = useAppData();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: user?.user.name || "",
    email: user?.user.email || "",
    bio: user?.user.bio || "",
    instagram: user?.user.instagram || "",
    facebook: user?.user.facebook || "",
    linkedin: user?.user.linkedin || "",
  });

  useEffect(() => {
  if (user) {
    setFormData({
      name: user.user.name || "",
      email: user.user.email || "",
      bio: user.user.bio || "",
      instagram: user.user.instagram || "",
      facebook: user.user.facebook || "",
      linkedin: user.user.linkedin || "",
    });
  }
}, [user]);

  const handleFormSubmit = async () => {
    try {
      setloading(true);
      const token = Cookies.get("token");
      const { data } = await axios.post(
        `${user_service}/api/v1/user/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Profile updated successfully!");
      setUser(data);
      setOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
      setloading(false);
    }
  };

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
              <div className="flex items-center gap-5">
                <Button>
                  Add Blog
                  <Plus className="font-bold" />
                </Button>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      Edit
                      <Edit className="font-bold" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleFormSubmit();
                      }}
                      className="flex flex-col gap-2"
                    >
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        value={formData.bio}
                        onChange={(e) =>
                          setFormData({ ...formData, bio: e.target.value })
                        }
                      />
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        value={formData.instagram}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            instagram: e.target.value,
                          })
                        }
                      />
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input
                        id="facebook"
                        value={formData.facebook}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            facebook: e.target.value,
                          })
                        }
                      />
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={formData.linkedin}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            linkedin: e.target.value,
                          })
                        }
                      />
                      <Button type="submit" className="mt-4">
                        Save Changes
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default ProfilePage;
