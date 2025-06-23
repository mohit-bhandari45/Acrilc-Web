"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { heroImages } from "./data";
import { Button } from "../ui/button";

export default function MobileHeaderHero() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * heroImages.length);
    setBackgroundImage(heroImages[randomIndex]);
  }, []);

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
          onClick={() => scrollToSection("features")}
          className={cn(
            "text-left font-medium text-base transition-colors duration-300 py-2",
            isScrolled
              ? "text-[#1A1A1A] hover:text-[#E2725B]"
              : "text-white hover:text-[#E2725B]"
          )}
        >
          Features
          {isScrolled}
        </button>
        <button
          onClick={() => scrollToSection("testimonials")}
          className={cn(
            "text-left font-medium text-base transition-colors duration-300 py-2",
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
            "text-left font-medium text-base transition-colors duration-300 py-2",
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
            "text-left font-medium text-base transition-colors duration-300 py-2",
            isScrolled
              ? "text-[#1A1A1A] hover:text-[#E2725B]"
              : "text-white hover:text-[#E2725B]"
          )}
        >
          Gallery
        </button>
        <button
          className={cn(
            "bg-white text-[#E2725B] border-2 border-[#E2725B] px-6 py-3 rounded-[50px] font-medium transition-all duration-300",
            "hover:bg-[#E2725B] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(226,114,91,0.2)]"
          )}
          onClick={() => console.log("Sign in clicked")}
        >
          Sign In
        </button>
      </nav>

      {/* Mobile Hero Section */}
      <section
        id="hero"
        className="hero min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-cover bg-center bg-no-repeat"
      >
        <div
          className="hero-background absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-0 animate-[zoomEffect_20s_ease-out_forwards]"
          style={{
            backgroundImage: `url('${backgroundImage || "/images/fallback.jpg"
              }')`,
          }}
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-10 pointer-events-none" />

        <div className="hero-content relative z-20 max-w-md mx-auto text-center px-4 text-white flex flex-col items-center justify-center">
          <h1 className="font-[Poppins,sans-serif] text-4xl font-bold text-white mb-2 inline-block">
            acrilc
          </h1>
          <p className="font-[Cormorant_Garamond,serif] text-2xl font-bold text-white mb-4 tracking-[0.01em]">
            Empowering Artisans. Inspiring the World.
          </p>
          <p className="text-base text-white mb-6 text-center whitespace-normal">
            Acrilc is the AI-powered platform where handcrafted art finds its
            voice, value, and global audience.
          </p>

          <div className="flex flex-col gap-4 items-center">
            <Link
              href="/auth/login"
              className="bg-gradient-to-r from-[#E2725B] to-[#D4A373] text-white px-6 py-3 rounded-[50px] font-medium no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(226,114,91,0.3)]"
            >
              Join as an Artist
            </Link>
            <Link
              href="#"
              className="bg-white text-[#E2725B] border-2 border-[#E2725B] px-6 py-3 rounded-[50px] font-medium no-underline transition-all duration-300 hover:bg-[#E2725B] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(226,114,91,0.2)]"
            >
              Explore Artworks
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
