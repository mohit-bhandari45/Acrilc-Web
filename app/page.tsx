"use client";

import CtaSection from "@/components/landingpagecomps/ctasection";
import FeaturedArtworks from "@/components/landingpagecomps/featured";
import Footer from "@/components/landingpagecomps/footer";
import CompareSection from "@/components/landingpagecomps/howitwork2";
import FeaturesSection from "@/components/landingpagecomps/howitworks";
import HowItWorksMain from "@/components/landingpagecomps/mainhow";
import MobileHeaderHero from "@/components/landingpagecomps/mobilenavhero";
import HeaderHero from "@/components/landingpagecomps/navHero";
import TestimonialsSection from "@/components/landingpagecomps/testimonial";

const Main = () => {
  return (
    <div className="min-h-screen">
      {/* Desktop Header and Hero */}
      <div className="hidden md:block">
        <HeaderHero />
      </div>

      {/* Mobile Header and Hero */}
      <MobileHeaderHero />
      <FeaturesSection/>
      <TestimonialsSection/>
      <CompareSection/>
      <HowItWorksMain/>
      <FeaturedArtworks/>
      <CtaSection/>
      <Footer/>
    </div>
  );
};

export default Main;
