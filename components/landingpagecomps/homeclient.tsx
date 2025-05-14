"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HashLoader } from "react-spinners";
import Navbar from "./navbar";
import HeroSection from "./herosection";
import Title from "./title";
import FeatCarousel from "./carousel";
import SubFooter from "./subfooter";
import Footer from "./footer";
import api, { GET_FEATURED_ARTISTS } from "@/apis/api";
import { IUser } from "@/types/types";

const HomeClient = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<IUser[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token && !isLoading) {
      router.push("/auth/login");
    }
  }, [token, router, isLoading]);

  useEffect(() => {
    const getFeaturedArtists = async () => {
      try {
        const res = await api.get(GET_FEATURED_ARTISTS);

        setUsers(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFeaturedArtists();
  }, []);

  if (isLoading || !users) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <HashLoader color="#FAA21B" size={200} />
      </div>
    );
  }

  if (!token) {
    return (
      <div className="font-[Helvetica] overflow-x-hidden">
        <Navbar />
        <main className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeroSection />
          <div className="">
            <Title title={"Featured Artists"} />
            <div className="w-full overflow-hidden">
              <FeatCarousel users={users} />
            </div>
          </div>
          <div className="my-8 sm:my-12 md:my-16">
            <Title title={"Art Movements"} />
            {/* Add responsive art movements section here */}
          </div>
          <SubFooter />
        </main>
        <Footer />
      </div>
    );
  }

  return <div className="hidden"></div>;
};

export default HomeClient;
