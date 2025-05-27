import api, { ADD_Banner_PIC, ADD_PROFILE_PIC } from "@/apis/api";
import UploadService from "@/service/service";
import { setUser } from "@/store/features/userSlice";
import { useAppDispatch } from "@/store/hooks";
import { IUser } from "@/types/types";
import * as Icons from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaPencilAlt } from "react-icons/fa";
import { HashLoader } from "react-spinners";
import { Button } from "../ui/button";
import { defaultImages } from "@/assets/assets";

type Props = {
  loader?: boolean; // ✅ optional
  setLoader: React.Dispatch<SetStateAction<boolean>>; // ✅ optional
  isSame: boolean;
  user: IUser;
};

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const ProfilePage = ({ loader, setLoader, isSame, user }: Props) => {
  const profileInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [bploader, setBpLoader] = useState(false);

  /* Changing Images */
  const handlerProfileEditClick = () => {
    if (profileInputRef.current) {
      profileInputRef.current.click();
    }
  };

  const handleBannerEditClick = () => {
    if (bannerInputRef.current) {
      bannerInputRef.current.click();
    }
  };

  const handleProfileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const profilePic = event.target.files?.[0];
    setLoader(true);

    if (profilePic) {
      try {
        const url = await UploadService.uploadToImgBB(profilePic);

        const response = await api.post(ADD_PROFILE_PIC, { imageURL: url });

        if (response.status === 200) {
          dispatch(setUser(response.data.data));
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
    setBpLoader(true);

    if (bannerPic) {
      try {
        const url = await UploadService.uploadToImgBB(bannerPic);

        const response = await api.post(ADD_Banner_PIC, {
          bannerURL: url,
        });

        if (response.status === 200) {
          dispatch(setUser(response.data.data));
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong. Please Try again!");
      } finally {
        window.location.reload();
      }
    }
  };

  return (
    <div className="bg-white min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8">
      {/* Main profile content */}
      <div className="max-w-6xl w-full mx-auto px-2 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left column */}
          <div className="w-full lg:w-2/5">
            {/* Profile Image Section */}
            <div className="relative rounded-t-lg overflow-hidden bg-gray-100">
              {/* Cover Image */}
              <div className="relative h-56 sm:h-72 lg:h-80 w-full bg-black">
                {!user?.bannerPicture ? (
                  <Image
                    src={defaultImages.BANNER}
                    alt="Banner Avatar"
                    className="object-cover"
                    priority
                    fill
                  />
                ) : (
                  <>
                    {bploader ? (
                      <HashLoader
                        color="white"
                        size={20}
                        className="relative left-[50%] top-[50%]"
                      />
                    ) : (
                      <Image
                        src={user.bannerPicture!}
                        alt="Profile Avatar"
                        fill
                        unoptimized
                        className="object-cover"
                        priority
                      />
                    )}
                  </>
                )}

                {/* Edit Icon */}
                {isSame && (
                  <>
                    <button
                      onClick={handleBannerEditClick}
                      aria-label="Edit profile picture"
                      className="absolute top-1 right-1 z-20 cursor-pointer p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition shadow-md"
                    >
                      <FaPencilAlt size={13} />
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={bannerInputRef}
                      onChange={handleBannerChange}
                      className="hidden"
                    />
                  </>
                )}
              </div>

              {/* Profile Avatar */}
              <div className="absolute left-4 bottom-0 transform translate-y-1/2">
                <div className="group relative h-24 w-24 bottom-15 border-4 border-white rounded-full">
                  <div className="overflow-hidden bg-black rounded-full h-full w-full flex justify-center items-center relative">
                    {!user?.profilePicture ? (
                      <Image
                        src={defaultImages.PROFILE}
                        alt="Profile Avatar"
                        width={100}
                        height={100}
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <>
                        {loader ? (
                          <HashLoader color="white" size={20} />
                        ) : (
                          <Image
                            src={user.profilePicture}
                            alt="Profile Avatar"
                            fill
                            unoptimized
                            className="object-cover"
                            priority
                          />
                        )}
                      </>
                    )}
                  </div>
                  {isSame && (
                    <>
                      <button
                        onClick={handlerProfileEditClick}
                        aria-label="Edit profile picture"
                        className="absolute top-[-3] right-[-4] z-20 cursor-pointer p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition shadow-md"
                      >
                        <FaPencilAlt size={13} />
                      </button>
                      <input
                        type="file"
                        accept="image/*"
                        ref={profileInputRef}
                        onChange={handleProfileChange}
                        className="hidden"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-orange-50 rounded-lg p-4 sm:p-6 flex flex-col gap-5">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                <div className="flex flex-col">
                  <span className="text-gray-600 text-xs sm:text-sm">
                    Supporters
                  </span>
                  <span className="font-bold text-xl sm:text-2xl">
                    {user?.totalFollowers?.toLocaleString() || 0}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-600 text-xs sm:text-sm">
                    Supporting
                  </span>
                  <span className="font-bold text-xl sm:text-2xl">
                    {user?.totalFollowing?.toLocaleString() || 0}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-600 text-xs sm:text-sm">
                    Posts
                  </span>
                  <span className="font-bold text-xl sm:text-2xl">
                    {user?.posts?.toLocaleString() || 0}
                  </span>
                </div>
              </div>
              {/* Social Links */}
              {user.socialLinks && (
                <>
                  <div className="border-2 border-black opacity-40"></div>
                  <div className="mt-2">
                    <h3 className="text-base sm:text-lg mb-3 ml-4 font-bold">
                      Social URLs
                    </h3>
                    <div className="flex flex-wrap gap-4 sm:gap-6 justify-center items-center">
                      {Object.entries(user.socialLinks).map(
                        ([platform, url]) => {
                          const iconName = capitalizeFirstLetter(platform); // e.g., "github" => "Github"
                          const IconComponent = Icons[
                            iconName as keyof typeof Icons
                          ] as React.FC<{ className?: string }>;

                          return (
                            <a
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 hover:text-black transition"
                            >
                              {IconComponent ? (
                                <IconComponent className="w-6 h-6" />
                              ) : (
                                <span className="capitalize underline">
                                  {platform}
                                </span>
                              )}
                            </a>
                          );
                        }
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="w-full lg:w-3/5">
            {/* Artist Info */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                {user?.fullName}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed break-words">
                {user?.bio}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
                {isSame ? (
                  <>
                    <button
                      onClick={() => {
                        router.push(`/profile/edit`);
                      }}
                      className="bg-[#FAA21B] hover:bg-[#fa921b] cursor-pointer text-white font-medium py-2 px-4 sm:px-6 w-full sm:w-[80%] rounded-lg"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.host}/profile/${user.username}`
                        );
                        toast.success("Link Copied");
                      }}
                      className="bg-[#FAA21B] hover:bg-[#fa921b] cursor-pointer text-white font-medium py-2 px-4 sm:px-6 w-full sm:w-[80%] rounded-lg"
                    >
                      Share Profile
                    </button>
                  </>
                ) : (
                  <>
                    <button className="bg-[#FAA21B] hover:bg-[#fa921b] cursor-pointer text-white font-medium py-2 px-4 sm:px-6 w-full sm:w-[80%] rounded-lg">
                      Support
                    </button>
                    <button className="bg-[#FAA21B] hover:bg-[#fa921b] cursor-pointer text-white font-medium py-2 px-4 sm:px-6 w-full sm:w-[80%] rounded-lg">
                      Message
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Forte Section */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Forte</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {user?.preferences?.map((category: string, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-lg p-3 sm:p-4"
                  >
                    <p className="text-black text-sm">{category}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Story Section */}
            {user?.story && (
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">
                  Story of the Artist
                </h2>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed break-words">
                  {user?.story}
                </p>
              </div>
            )}

            {/* View Portfolio Button */}
            <div className="mt-6 sm:mt-8">
              <Link href={`/portfolio/${user?.username}`}>
                <Button className="w-full bg-[#FAA21B] hover:bg-[#fa921b] cursor-pointer text-white font-bold text-lg py-6 px-6 rounded-lg">
                  View Portfolio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
