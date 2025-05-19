"use client";

import FeatCarousel from "@/components/landingpagecomps/carousel";
import Footer from "@/components/landingpagecomps/footer";
import HeroSection from "@/components/landingpagecomps/herosection";
import Navbar from "@/components/landingpagecomps/navbar";
import SubFooter from "@/components/landingpagecomps/subfooter";
import Title from "@/components/landingpagecomps/title";
import useTokenCheck from "@/hooks/useTokenCheck";
import { HashLoader } from "react-spinners";

const HomeClient = () => {
  const { token, isLoading } = useTokenCheck();

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
