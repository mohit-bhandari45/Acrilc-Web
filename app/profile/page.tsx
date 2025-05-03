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

const Profile = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const getUser = async () => {
    const response = await api.get(GET_OWN_PROFILE);

    if (response.status === 200) {
      dispatch(setUser(response.data.data));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null; // Or show a loading spinner
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
