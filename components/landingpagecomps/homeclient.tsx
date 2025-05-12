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

const HomeClient = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-40 w-40 border-t-2 border-b-2 border-primary"></div>
  //     </div>
  //   );
  // }
  if (isLoading) {
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
              <FeatCarousel />
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
