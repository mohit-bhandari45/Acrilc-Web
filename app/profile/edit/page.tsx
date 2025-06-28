"use client";

import api, { UPDATE_PROFILE } from "@/apis/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/store/hooks";
// import { IUser } from "@/types/types";
// import { AxiosError } from "axios";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface SocialLink {
  platform: string;
  url: string;
}

export default function ProfileEditPage() {
  const router = useRouter();
  // const [, setToken] = useState<string | null>(null);
  const [loader, setLoader] = useState(false);
  // const [user, setUser] = useState<IUser | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    bio: "",
    story: "",
    location: "",
  });
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  const { user } = useAppSelector(state => state.userReducer);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   setToken(token);
  // }, []);

  // useEffect(() => {
  //   async function getUser() {
  //     try {
  //       const response = await api.get(GET_OWN_PROFILE);
  //       setUser(response.data.data);
  //     } catch (error) {
  //       const uperror = error as AxiosError<{ msg: string }>;

  //       if (uperror.response?.status === 401) {
  //         router.push("/auth/login");
  //       }
  //     }
  //   }

  //   getUser();
  // }, [router]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => {
        return {
          ...prev,
          fullName: user.fullName || "",
          username: user.username || "",
          bio: user.bio || "",
          story: user.story || "",
          location: prev.location,
        };
      });

      if (user.socialLinks) {
        const linksArray = Object.entries(user.socialLinks).map(
          ([platform, url]) => ({
            platform,
            url,
          })
        );

        setSocialLinks(linksArray);
      }
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (
    index: number,
    field: keyof SocialLink,
    value: string
  ) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index][field] = value;
    setSocialLinks(updatedLinks);
  };

  const handleRemoveSocialLink = (index: number) => {
    setSocialLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddSocialLink = () => {
    setSocialLinks((prev) => [...prev, { platform: "Instagram", url: "" }]);
  };

  const handleSubmit = async () => {
    if (formData.bio.length > 400) {
      toast.error("Bio cannot exceed 100 characters");
      return;
    }
    if (formData.story.length > 1000) {
      toast.error("Storyboard cannot exceed 500 characters");
      return;
    }

    setLoader(true);
    const data = { ...formData, socialLinks };

    try {
      const res = await api.put(UPDATE_PROFILE, data);
      if (res.status === 200) {
        router.push(`/profile/${user?.username}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-[Helvetica]">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Edit Profile</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar - Desktop only */}
          <div className="hidden lg:block lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                <nav className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left font-medium"
                  >
                    Profile Information
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left text-gray-500 dark:text-gray-400"
                  >
                    Account Settings
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left text-gray-500 dark:text-gray-400"
                  >
                    Privacy
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left text-gray-500 dark:text-gray-400"
                  >
                    Notifications
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* Mobile Tabs - Mobile only */}
            <div className="block lg:hidden mb-6">
              <Tabs defaultValue="profile">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="account">Account</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <Card>
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>

                  {/* Username */}
                  <div className="space-y-2">
                    <label htmlFor="username" className="text-sm font-medium">
                      Username
                    </label>
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>

                  {/* Email */}
                  {/* <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div> */}

                  {/* Location */}
                  {/* <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium">
                      Location
                    </label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div> */}
                </div>

                {/* Bio - Full width */}
                <div className="mt-6 space-y-2">
                  <label htmlFor="bio" className="text-sm font-medium">
                    Bio
                  </label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full min-h-20"
                    placeholder="Write a short bio"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <p>
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                    <span
                      className={`${
                        formData.bio.length > 400 ? "text-red-500" : "text-black"
                      }`}
                    >
                      {formData.bio.length}
                      <span className="text-black">/400</span>
                    </span>
                  </div>
                </div>

                {/* Story - Full width */}
                <div className="mt-6 space-y-2">
                  <label htmlFor="story" className="text-sm font-medium">
                    Story
                  </label>
                  <Textarea
                    id="story"
                    name="story"
                    value={formData.story}
                    onChange={handleInputChange}
                    className="w-full min-h-32"
                    placeholder="Tell your story"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <p>Share more about yourself and your work.</p>
                    <span
                      className={`${
                        formData.story.length > 1000
                          ? "text-red-500"
                          : "text-black"
                      }`}
                    >
                      {formData.story.length}
                      <span className="text-black">/1000</span>
                    </span>
                  </div>
                </div>

                <Separator className="my-8" />

                {/* Social Links */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Social Links</h3>
                    <Button
                      variant="outline"
                      onClick={handleAddSocialLink}
                      size="sm"
                      className="cursor-pointer"
                    >
                      Add Link
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {socialLinks.map((link, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row gap-3"
                      >
                        <Select
                          value={link.platform}
                          onValueChange={(value) =>
                            handleSocialLinkChange(index, "platform", value)
                          }
                        >
                          <SelectTrigger className="w-full sm:w-40">
                            <SelectValue placeholder="Platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem className="cursor-pointer" value="Instagram">Instagram</SelectItem>
                            <SelectItem className="cursor-pointer" value="Twitter">Twitter</SelectItem>
                            <SelectItem className="cursor-pointer" value="LinkedIn">LinkedIn</SelectItem>
                            {/* <SelectItem value="GitHub">GitHub</SelectItem> */}
                            <SelectItem className="cursor-pointer" value="Facebook">Facebook</SelectItem>
                            <SelectItem className="cursor-pointer" value="YouTube">YouTube</SelectItem>
                            <SelectItem className="cursor-pointer" value="TikTok">TikTok</SelectItem>
                            <SelectItem className="cursor-pointer" value="Pinterest">Pinterest</SelectItem>
                            <SelectItem className="cursor-pointer" value="Behance">Behance</SelectItem>
                          </SelectContent>
                        </Select>

                        <div className="flex-1 flex gap-2">
                          <Input
                            value={link.url}
                            onChange={(e) =>
                              handleSocialLinkChange(
                                index,
                                "url",
                                e.target.value
                              )
                            }
                            className="flex-1"
                            placeholder="URL (e.g., instagram.com/yourusername)"
                          />

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveSocialLink(index)}
                            className="h-10 w-10 shrink-0 cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    {socialLinks.length === 0 && (
                      <div className="text-center py-6 text-gray-500 bg-gray-50 dark:bg-gray-800 rounded-md">
                        No social links added yet
                      </div>
                    )}
                  </div>
                </div>

                {/* Save Button - For both desktop and mobile */}
                <div className="mt-8">
                  <Button
                    onClick={() => {
                      router.push(`/profile/${user && user.username}`);
                    }} // or any custom cancel logic
                    className="w-full mb-3 py-2 bg-gray-200 cursor-pointer text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="w-full bg-[#FAA21B] hover:bg-[#fa921b] cursor-pointer"
                    size="lg"
                    onClick={handleSubmit}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {loader ? "Saving" : "Save Changes"}
                    {loader && (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; 2025 Your Website. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
