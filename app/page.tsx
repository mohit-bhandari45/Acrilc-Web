"use client";

import { useEffect } from "react";
import CtaSection from "@/components/landingpagecomps/ctasection";
import FeaturedArtworks from "@/components/landingpagecomps/featured";
import Footer from "@/components/landingpagecomps/footer";
import CompareSection from "@/components/landingpagecomps/howitwork2";
import FeaturesSection from "@/components/landingpagecomps/howitworks";
import HowItWorksMain from "@/components/landingpagecomps/mainhow";
import MobileHeaderHero from "@/components/landingpagecomps/mobilenavhero";
import HeaderHero from "@/components/landingpagecomps/navHero";
import TestimonialsSection from "@/components/landingpagecomps/testimonial";
import MainLoader from "@/components/universalcomps/mainloader";
// import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

const Main = () => {
  // const router = useRouter();
  const { loading } = useAppSelector(state => state.userReducer);

  if (loading) {
    return <MainLoader msg="Loading, please wait" />;
  }

  return (
    <div className="min-h-screen">
      {/* Desktop Header and Hero */}
      <div className="hidden md:block">
        <HeaderHero />
      </div>

      {/* Mobile Header and Hero */}
      <MobileHeaderHero />
      <FeaturesSection />
      <TestimonialsSection />
      <CompareSection />
      <HowItWorksMain />
      <FeaturedArtworks />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Main;
