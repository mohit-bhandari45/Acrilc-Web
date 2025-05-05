"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FeatCarousel from "@/components/homecomps/carousel";
import Footer from "@/components/homecomps/footer";
import HeroSection from "@/components/homecomps/herosection";
import Navbar from "@/components/homecomps/navbar";
import SubFooter from "@/components/homecomps/subfooter";
import Title from "@/components/homecomps/title";

const Home = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for token in localStorage only on client side
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
    // Redirect to profile if authenticated
    if (token && !isLoading) {
      router.push("/profile");
    }
  }, [token, router, isLoading]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Only render the home page if not authenticated
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
            {/* You can add responsive art movements section here */}
          </div>
          
          <SubFooter />
        </main>
        <Footer />
      </div>
    );
  }

  // Return empty div if token exists (page will redirect)
  return <div className="hidden"></div>;
};

export default Home;