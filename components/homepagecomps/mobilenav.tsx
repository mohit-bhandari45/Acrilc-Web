"use client";

import useHandleNavigation from "@/hooks/useHandleNavigation";
import { cn } from "@/lib/utils";
import { IUser } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export default function HomePageMobileNavBar({ user }: { user: IUser | null }) {
  const handleNavigation = useHandleNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const backgroundImage =
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="md:hidden relative">
      {/* Mobile Header */}
      <header
        className={cn(
          "header fixed top-0 left-0 right-0 z-[1000] transition-all duration-300",
          "flex flex-col px-4 py-4",
          isScrolled
            ? "bg-white shadow-[0_2px_10px_rgba(0,0,0,0.07)]"
            : "bg-transparent"
        )}
      >
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <Button
            onClick={() => scrollToSection("hero")}
            className={cn(
              "logo font-bold text-2xl transition-all duration-300 cursor-pointer ease-out no-underline",
              "font-[Poppins,sans-serif]",
              isScrolled
                ? "text-[#1A1A1A]"
                : "text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.18)]"
            )}
          >
            acrilc
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "text-2xl focus:outline-none focus:ring-2 focus:ring-[#E2725B] rounded",
              isScrolled ? "text-[#1A1A1A]" : "text-white"
            )}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[998]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Right-to-left Slide-in Menu */}
      <nav
        className={cn(
          "fixed top-0 pt-16 right-0 h-full w-3/4 max-w-xs z-[999] pr-6 pb-6 pl-6 flex flex-col gap-4 shadow-lg transition-transform duration-300 ease-in-out",
          isScrolled ? "bg-white" : "bg-black/80",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button
          onClick={() => scrollToSection("artists")}
          className={cn(
            "text-left font-medium text-base transition-colors duration-300 py-2",
            isScrolled
              ? "text-[#1A1A1A] hover:text-[#E2725B]"
              : "text-white hover:text-[#E2725B]"
          )}
        >
          Artists
          {isScrolled}
        </button>
        <button
          onClick={() => scrollToSection("artworks")}
          className={cn(
            "text-left font-medium text-base transition-colors duration-300 py-2",
            isScrolled
              ? "text-[#1A1A1A] hover:text-[#E2725B]"
              : "text-white hover:text-[#E2725B]"
          )}
        >
          Artworks
        </button>
        <button
          onClick={() => scrollToSection("marketplace")}
          className={cn(
            "text-left font-medium text-base transition-colors duration-300 py-2",
            isScrolled
              ? "text-[#1A1A1A] hover:text-[#E2725B]"
              : "text-white hover:text-[#E2725B]"
          )}
        >
          Marketplace
        </button>
        <button
          onClick={() => scrollToSection("blog")}
          className={cn(
            "text-left font-medium text-base transition-colors duration-300 py-2",
            isScrolled
              ? "text-[#1A1A1A] hover:text-[#E2725B]"
              : "text-white hover:text-[#E2725B]"
          )}
        >
          Blog
        </button>
        {user ? (
          <div
            onClick={() => handleNavigation(`/profile/${user.username}`)}
            className="no-underline"
          >
            <button className="flex items-center gap-3 px-4 py-2 border-2 border-[#E2725B] text-[#E2725B] rounded-full bg-white hover:bg-[#E2725B] hover:text-white transition-all duration-300">
              {/* Profile Image */}
              <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full overflow-hidden bg-black relative">
                {user.profilePicture ? (
                  <Image
                    src={user.profilePicture!}
                    alt="Profile"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="50" fill="#e5e7eb" />

                    <circle cx="50" cy="35" r="18" fill="#9ca3af" />

                    <path
                      d="M20 85 Q20 65 35 58 Q42.5 55 50 55 Q57.5 55 65 58 Q80 65 80 85 L80 100 L20 100 Z"
                      fill="#9ca3af"
                    />
                  </svg>
                )}
              </div>

              {/* Text */}
              <span className="text-sm sm:text-base font-medium">
                Go to profile
              </span>

              {/* Right Arrow Icon */}
              <style jsx>{`
                @keyframes wiggleX {
                  0%,
                  100% {
                    transform: translateX(0);
                  }
                  25% {
                    transform: translateX(4px);
                  }
                  50% {
                    transform: translateX(-4px);
                  }
                  75% {
                    transform: translateX(2px);
                  }
                }
                .animate-wiggleX {
                  animation: wiggleX 0.8s ease-in-out infinite;
                }
              `}</style>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5 animate-wiggleX"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        ) : (
          <button
            className={cn(
              "bg-white text-[#E2725B] border-2 border-[#E2725B] px-6 py-3 rounded-[50px] font-medium transition-all duration-300",
              "hover:bg-[#E2725B] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(226,114,91,0.2)]"
            )}
            onClick={() => console.log("Sign in clicked")}
          >
            Sign In
          </button>
        )}
      </nav>

      {/* Mobile Hero Section */}
      <section
        id="hero"
        className="hero min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-cover bg-center bg-no-repeat"
      >
        <div
          className="hero-background absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-0 animate-[zoomEffect_20s_ease-out_forwards]"
          style={{
            backgroundImage: `url('${
              backgroundImage || "/images/fallback.jpg"
            }')`,
          }}
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-10 pointer-events-none" />

        <div className="hero-content relative z-20 text-center px-8 transition-transform duration-300 ease-out text-white flex flex-col items-center justify-center">
          <h1 className="font-playfair text-4xl font-bold mb-5 leading-tight drop-shadow-lg">
            Empowering Handcrafted Artists
          </h1>
          <p className="text-md leading-relaxed mb-12 max-w-2xl text-gray-200 drop-shadow-md">
            Discover, connect, and support talented artists from around the
            world on our AI-enabled social-commerce platform
          </p>
          <button className="px-8 py-4 text-lg font-medium border-2 border-white rounded-full transition transform hover:bg-white hover:text-gray-800 hover:scale-105 duration-500 hover:shadow-md">
            Join Our Community
          </button>
        </div>
      </section>
    </div>
  );
}
