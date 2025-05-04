"use client";

import FeatCarousel from "@/components/homecomps/carousel";
import Footer from "@/components/homecomps/footer";
import HeroSection from "@/components/homecomps/herosection";
import Navbar from "@/components/homecomps/navbar";
import SubFooter from "@/components/homecomps/subfooter";
import Title from "@/components/homecomps/title";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (token) {
      router.push("/profile");
    }
  }, [token, router]);

  if (!token) {
    return (
      <div className="font-[Helvetica]">
        <Navbar />
        <HeroSection />
        <Title title={"Featured Artists"} />
        <FeatCarousel />
        <Title title={"Art Movements"} />
        <SubFooter />
        <Footer />
      </div>
    );
  }
};

export default Home;
