"use client";

import api, { ADD_Banner_PIC, ADD_PROFILE_PIC } from "@/apis/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UploadService from "@/service/service";
import { IUser } from "@/types/types";
import { Camera, MapPin } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  FaBehance,
  FaFacebook,
  FaInstagram,
  FaLink,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { GridLoader } from "react-spinners";

interface ArtistProfileProps {
  user: IUser;
  isSame: boolean;
}

const ArtistProfile: React.FC<ArtistProfileProps> = ({
  user,
  isSame,
}: ArtistProfileProps) => {
  const [bpLoader, setBpLoader] = useState(false);
  const [ppLoader, setPpLoader] = useState(false);

  const handleProfileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const profilePic = event.target.files?.[0];
    setPpLoader(true);

    if (profilePic) {
      try {
        const url = await UploadService.uploadToImgBB(profilePic);

        const response = await api.post(ADD_PROFILE_PIC, { imageURL: url });

        if (response.status === 200) {
          toast.success("Profile Pic Updated!");
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong. Please Try again!");
      } finally {
        window.location.reload();
      }
    }
  };

  const handleBannerChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const bannerPic = event.target.files?.[0];
    console.log(bannerPic);
    setBpLoader(true);

    if (bannerPic) {
      try {
        const url = await UploadService.uploadToImgBB(bannerPic);

        const response = await api.post(ADD_Banner_PIC, {
          bannerURL: url,
        });

        console.log(response.status);

        if (response.status === 200) {
          toast.success("Banner Pic Updated!");
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong. Please Try again!");
      } finally {
        window.location.reload();
      }
    }
  };

  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <FaInstagram />;
      case "twitter":
        return <FaTwitter />;
      case "linkedin":
        return <FaLinkedin />;
      case "facebook":
        return <FaFacebook />;
      case "youtube":
        return <FaYoutube />;
      case "pinterest":
        return <FaPinterest />;
      case "behance":
        return <FaBehance />;
      default:
        return <FaLink />;
    }
  };

  return (
    <>
      {(bpLoader || ppLoader) && (
        <div className="fixed inset-0 flex flex-col gap-4 sm:gap-8 justify-center z-60 items-center bg-[#171617cc] p-4">
          <GridLoader
            color="#FAA21B"
            size={50}
            speedMultiplier={1.1}
            className="hidden sm:block"
          />
          <div className="font-bold text-lg sm:text-2xl text-white text-center">
            {bpLoader ? "Updating Banner Pic..." : "Updating Profile Pic..."}
          </div>
        </div>
      )}

      <div className="w-full max-w-6xl mx-auto p-3 sm:p-5 mt-22 lg:mt-25">
        <Card className="relative overflow-hidden shadow-lg mb-4 sm:mb-8 border-0">
          {/* Banner Section */}
          <div className="relative h-32 sm:h-40 md:h-48 rounded-t-lg overflow-hidden cursor-pointer z-10">
            {/* Banner Background Image or Gradient */}
            <div
              className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300"
              style={{
                backgroundImage: user.bannerPicture
                  ? `url(${user.bannerPicture})`
                  : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            {/* Black overlay with pencil icon */}
            {isSame && (
              <>
                <div className="absolute inset-0 bg-black/50 border-white border-[0.5px] rounded-t-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-20">
                  <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
                    onChange={(e) => handleBannerChange(e)}
                  />
                </div>
              </>
            )}
          </div>

          {/* Profile Image - Responsive positioning */}
          <div className="absolute top-16 sm:top-20 md:top-24 left-4 sm:left-8 md:left-16 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 z-40">
            <label className="relative cursor-pointer group w-full h-full">
              {/* Outer border wrapper */}
              <div className="w-full h-full rounded-full border-2 sm:border-4 border-white shadow-lg overflow-hidden relative z-40">
                {/* Avatar and fallback */}
                <Avatar className="w-full h-full">
                  <AvatarImage
                    src={user.profilePicture}
                    alt={user.fullName}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gray-300 text-gray-600 text-sm sm:text-lg md:text-2xl font-semibold">
                    {user.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                {isSame && (
                  <>
                    {/* Black film over the image only */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                      <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </>
                )}
              </div>

              {/* Profile Image Upload Input */}
              {isSame && (
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfileChange}
                />
              )}
            </label>
          </div>

          {/* Content Section */}
          <div className="pt-12 sm:pt-16 md:pt-20 pb-4 sm:pb-6 md:pb-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 md:px-8">
              {/* Profile Info Block */}
              <div className="xl:col-span-2">
                <Card className="h-full">
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="space-y-4 sm:space-y-6">
                      {/* Basic Info */}
                      <div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                          {user.fullName}
                        </h1>
                        {user.location && (
                          <div className="flex items-center text-gray-600 mb-3 sm:mb-4">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            <span className="text-sm sm:text-base">
                              {user.location}
                            </span>
                          </div>
                        )}
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6">
                          {user.bio}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        {isSame ? (
                          <Link
                            className="cursor-pointer flex-1 sm:flex-none"
                            href={"/profile/edit"}
                          >
                            <Button className="w-full sm:w-auto bg-black cursor-pointer hover:bg-gray-800 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base transition-all duration-200 hover:-translate-y-1">
                              Edit Profile
                            </Button>
                          </Link>
                        ) : (
                          <Button className="w-full sm:w-auto bg-black cursor-pointer hover:bg-gray-800 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base transition-all duration-200 hover:-translate-y-1">
                            Support
                          </Button>
                        )}
                        {isSame ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full sm:w-auto border-black cursor-pointer text-black hover:bg-gray-50 px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base transition-all duration-200 hover:-translate-y-1"
                              >
                                Share Profile
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="mx-4 sm:mx-0 w-[calc(100vw-2rem)] sm:w-full max-w-md">
                              <DialogHeader>
                                <DialogTitle className="text-lg sm:text-xl">
                                  Share Your Profile
                                </DialogTitle>
                                <DialogDescription className="text-sm sm:text-base">
                                  Choose how you&apos;d like to share this
                                  artist&apos;s profile.
                                </DialogDescription>
                              </DialogHeader>

                              {/* Share via Web Share API if supported */}
                              <Button
                                onClick={() => {
                                  const shareData = {
                                    title: `${user.fullName}'s Profile`,
                                    text: "Check out this artist profile!",
                                    url:
                                      typeof window !== "undefined"
                                        ? window.location.href
                                        : "",
                                  };

                                  if (navigator.share) {
                                    navigator
                                      .share(shareData)
                                      .catch((err) =>
                                        console.error("Share failed:", err)
                                      );
                                  } else {
                                    toast.error(
                                      "Sharing is not supported on this device."
                                    );
                                  }
                                }}
                                className="w-full bg-black hover:bg-black cursor-pointer text-white rounded-lg transition-all duration-200 text-sm sm:text-base"
                              >
                                Share via Apps
                              </Button>

                              {/* Copy Link Option */}
                              <Button
                                variant="outline"
                                onClick={() => {
                                  const profileUrl =
                                    typeof window !== "undefined"
                                      ? window.location.href
                                      : "";
                                  navigator.clipboard.writeText(profileUrl);
                                  toast.success("Profile link copied!");
                                }}
                                className="w-full mt-2 cursor-pointer text-sm sm:text-base"
                              >
                                Copy Link
                              </Button>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <Button
                            variant="outline"
                            className="w-full sm:w-auto border-black cursor-pointer text-black hover:bg-gray-50 px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base transition-all duration-200 hover:-translate-y-1"
                          >
                            Message
                          </Button>
                        )}
                      </div>

                      {/* Story Section */}
                      <div className="pt-4 sm:pt-6 border-t border-gray-100">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                          Story of the Artist
                        </h3>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          {user.story}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Stats and Social */}
              <div className="space-y-4 sm:space-y-6">
                <Card>
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    {/* Stats */}
                    <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
                      <div className="text-center">
                        <div className="text-lg sm:text-xl font-bold text-gray-900">
                          {user.totalFollowers}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                          Supporters
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg sm:text-xl font-bold text-gray-900">
                          {user.totalFollowing}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                          Supporting
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg sm:text-xl font-bold text-gray-900">
                          {user.posts}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                          Posts
                        </div>
                      </div>
                    </div>

                    {/* Social Links - Commented out in original */}
                    {user?.socialLinks && (
                      <div className="flex justify-center gap-4 mb-8">
                        {Object.entries(user.socialLinks).map(
                          ([platform, url], index) => (
                            <a
                              key={index}
                              href={url}
                              className="text-gray-600 hover:text-black transition-colors duration-200"
                              aria-label={platform}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {getIcon(platform)}
                            </a>
                          )
                        )}
                      </div>
                    )}

                    {/* Forte Section - Commented out in original */}
                   {/* Forte Section */}
<div className="mb-6 sm:mb-8">
  <h3 className="text-base sm:text-lg font-bold text-center text-gray-900 mb-3 sm:mb-4">
    Forte
  </h3>
  <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
    {user.preferences &&
      user.preferences.map((forte, index) => (
        <div
          key={index}
          className="group relative flex flex-col items-center text-center bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-gray-300 rounded-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 w-[110px]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19l7-7 3 3-7 7-3-3z" />
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
            <path d="M2 2l7.586 7.586" />
            <circle cx="11" cy="11" r="2" />
          </svg>

          <h4 className="font-semibold text-gray-800 text-xs sm:text-sm leading-tight group-hover:text-gray-900 transition-colors duration-300 mt-2">
            {forte}
          </h4>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full"></div>
        </div>
      ))}
  </div>
</div>

                    {/* Portfolio Button */}
                    <div className="text-center">
                      <Link href={`/portfolio/${user?.username}`}>
                        <Button className="w-full sm:w-auto bg-black cursor-pointer hover:bg-gray-800 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-sm sm:text-base lg:text-lg font-semibold transition-all duration-200 hover:-translate-y-1">
                          View Portfolio
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ArtistProfile;
