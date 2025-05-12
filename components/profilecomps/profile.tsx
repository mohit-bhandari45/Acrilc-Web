import api, { UPLOAD_PROFILE_PIC } from "@/apis/api";
import { setUser } from "@/store/features/userSlice";
import { useAppDispatch } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";
import React, { SetStateAction, useRef } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { HashLoader } from "react-spinners";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { IUser } from "@/types/types";

type Props = {
  loader?: boolean; // ✅ optional
  setLoader: React.Dispatch<SetStateAction<boolean>>; // ✅ optional
  isSame: boolean;
  user: IUser;
};

const ProfilePage = ({ loader, setLoader, isSame, user }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  /* Changing Images */
  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const profilePic = event.target.files?.[0];
    setLoader(true);

    if (profilePic) {
      const formData = new FormData();
      formData.append("profilePic", profilePic);

      try {
        const response = await api.put(UPLOAD_PROFILE_PIC, formData);

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

  console.log(user);

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
                <Image
                  src="/assets/homepageassets/cardimage1.png"
                  alt="Profile Cover"
                  layout="fill"
                  objectFit="cover"
                  priority
                  className="opacity-50"
                />

                {/* Edit Icon */}
                {isSame && (
                  <>
                    <button
                      onClick={handleEditClick}
                      aria-label="Edit profile picture"
                      className="absolute top-0 right-0 z-20 cursor-pointer p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition shadow-md opacity-0 group-hover:opacity-100"
                    >
                      <FaPencilAlt size={13} />
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
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
                        src="/assets/empty.png"
                        alt="Profile Avatar"
                        width={100}
                        height={100}
                        className="object-cover"
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
                          />
                        )}
                      </>
                    )}
                  </div>
                  {isSame && (
                    <>
                      <button
                        onClick={handleEditClick}
                        aria-label="Edit profile picture"
                        className="absolute top-0 right-0 z-20 cursor-pointer p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition shadow-md opacity-0 group-hover:opacity-100"
                      >
                        <FaPencilAlt size={13} />
                      </button>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
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
              <div className="border-2 border-black opacity-40"></div>
              {/* Social Links */}
              <div className="mt-2">
                <h3 className="text-base sm:text-lg mb-3 ml-4 font-bold">
                  Social URLs
                </h3>
                <div className="flex flex-wrap gap-4 sm:gap-6 justify-center items-center">
                  <a href="#" className="text-gray-800 hover:text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-800 hover:text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-800 hover:text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    >
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-800 hover:text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    >
                      <path
                        d="M22 7h-7v-2h7v2zm1

.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"
                      />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-800 hover:text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    >
                      <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s primi-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-800 hover:text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </a>
                </div>
              </div>
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
                    <button className="bg-[#FAA21B] hover:bg-[#fa921b] cursor-pointer text-white font-medium py-2 px-4 sm:px-6 w-full sm:w-[80%] rounded-lg">
                      <Link href={`/profile/edit`}>Edit Profile</Link>
                    </button>
                    <button onClick={()=>{
                      navigator.clipboard.writeText(`${window.location.host}/profile/${user.username}`);
                      toast.success("Link Copied");
                    }} className="bg-[#FAA21B] hover:bg-[#fa921b] cursor-pointer text-white font-medium py-2 px-4 sm:px-6 w-full sm:w-[80%] rounded-lg">
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
