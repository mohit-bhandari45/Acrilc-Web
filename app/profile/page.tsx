/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ArtworkCarousel from "@/components/profilecomps/collection";
import Footer from "@/components/profilecomps/footer";
import Navbar from "@/components/profilecomps/navbar";
import ProfilePage from "@/components/profilecomps/profile";
import GallerySection from "@/components/profilecomps/gallery";

/* Redux */
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/features/userSlice";
import { useEffect } from "react";
import api, { GET_OWN_PROFILE } from "@/apis/api";
import { HashLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const Profile = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const getUser = async () => {
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
      <Footer />
    </div>
  );
};

export default Profile;
