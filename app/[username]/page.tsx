/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ArtworkCarousel from "@/components/profilecomps/collection";
import GallerySection from "@/components/profilecomps/gallery";
import Navbar from "@/components/profilecomps/navbar";
import ProfilePage from "@/components/profilecomps/profile";

/* Redux */
import api, { GET_OWN_PROFILE } from "@/apis/api";
import { setUser } from "@/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { useParams } from "next/navigation";

const Profile = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const getUser = async () => {
      if (!localStorage.getItem("token")) {
        router.push("/auth/login");
      }

      try {
        const response = await api.get(GET_OWN_PROFILE);

        if (response.status === 200) {
          dispatch(setUser(response.data.data));
        }
      } catch (error: any) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          router.push("/auth/login");
        }
      }
    };

    getUser();
  }, [dispatch, router]);

  if (!user) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <HashLoader color="#FAA21B" size={200} />
      </div>
    );
  }

  return (
    <div className="font-[Helvetica]">
      <Navbar />
      <ProfilePage />
      <ArtworkCarousel />

      {/* Main Three Sections */}
      <GallerySection />
    </div>
  );
};

export default Profile;
