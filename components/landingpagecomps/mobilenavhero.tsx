"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { heroImages } from "./data";

export default function MobileHeaderHero() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    // Set random background image on component mount
    const randomIndex = Math.floor(Math.random() * heroImages.length);
    setBackgroundImage(heroImages[randomIndex]);
  }, []); // Empty dependency array ensures this runs only on mount (page load/reload)

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
    <div className="md:hidden">
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
          <Link
            href="#"
            onClick={() => scrollToSection("hero")} // Ensure logo scrolls to hero section
            className={cn(
              "logo font-bold text-2xl transition-all duration-300 ease-out no-underline",
              "font-[Poppins,sans-serif]",
              isScrolled
                ? "text-[#1A1A1A]"
                : "text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.18)]"
            )}
          >
            acrilc
          </Link>

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

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav
            className={cn(
              "nav-links flex flex-col gap-4 mt-4 w-full pb-4",
              isScrolled ? "bg-white" : "bg-black/50"
            )}
          >
            <button
              onClick={() => scrollToSection("features")}
              className={cn(
                "nav-link text-left font-medium text-base transition-colors duration-300 py-2",
                isScrolled
                  ? "text-[#1A1A1A] hover:text-[#E2725B]"
                  : "text-white hover:text-[#E2725B]"
              )}
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className={cn(
                "nav-link text-left font-medium text-base transition-colors duration-300 py-2",
                isScrolled
                  ? "text-[#1A1A1A] hover:text-[#E2725B]"
                  : "text-white hover:text-[#E2725B]"
              )}
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className={cn(
                "nav-link text-left font-medium text-base transition-colors duration-300 py-2",
                isScrolled
                  ? "text-[#1A1A1A] hover:text-[#E2725B]"
                  : "text-white hover:text-[#E2725B]"
              )}
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className={cn(
                "nav-link text-left font-medium text-base transition-colors duration-300 py-2",
                isScrolled
                  ? "text-[#1A1A1A] hover:text-[#E2725B]"
                  : "text-white hover:text-[#E2725B]"
              )}
            >
              Gallery
            </button>
            <button
              className={cn(
                "btn btn-secondary bg-white text-[#E2725B] border-2 border-[#E2725B] px-6 py-3 rounded-[50px] font-medium self-start transition-all duration-300",
                "hover:bg-[#E2725B] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(226,114,91,0.2)]"
              )}
              onClick={() => console.log("Sign in clicked")}
            >
              Sign In
            </button>
          </nav>
        )}
      </header>

      {/* Mobile Hero Section */}
      <section
        id="hero"
        className="hero min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-cover bg-center bg-no-repeat"
      >
        <div
          className="hero-background absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-0 animate-[zoomEffect_20s_ease-out_forwards]"
          style={{ backgroundImage: `url('${backgroundImage || "/images/fallback.jpg"}')` }}
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-10 pointer-events-none" />

        <div className="hero-content relative z-20 max-w-md mx-auto text-center px-4 text-white flex flex-col items-center justify-center">
          <h1 className="hero-logo font-[Poppins,sans-serif] text-4xl font-bold text-white mb-2 inline-block">
            acrilc
          </h1>
          <p className="hero-subheading font-[Cormorant_Garamond,serif] text-2xl font-bold text-white mb-4 tracking-[0.01em]">
            Empowering Artisans. Inspiring the World.
          </p>
          <p className="hero-description text-base text-white mb-6 text-center whitespace-normal">
            Acrilc is the AI-powered platform where handcrafted art finds its voice, value, and global audience.
          </p>

          <div className="cta-buttons flex flex-col gap-4 items-center">
            <Link
              href="#"
              className="btn btn-primary bg-gradient-to-r from-[#E2725B] to-[#D4A373] text-white px-6 py-3 rounded-[50px] font-medium no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(226,114,91,0.3)]"
            >
              Join as an Artist
            </Link>
            <Link
              href="#"
              className="btn btn-secondary bg-white text-[#E2725B] border-2 border-[#E2725B] px-6 py-3 rounded-[50px] font-medium no-underline transition-all duration-300 hover:bg-[#E2725B] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(226,114,91,0.2)]"
            >
              Explore Artworks
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}