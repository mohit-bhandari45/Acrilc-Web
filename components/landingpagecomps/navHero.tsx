"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { heroImages } from "./data";
import Image from "next/image";
import { Button } from "../ui/button";

interface HeaderHeroProps {
  className?: string;
}

export default function HeaderHero({ className }: HeaderHeroProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");

  // Set random background image on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * heroImages.length);
    setBackgroundImage(heroImages[randomIndex]);
  }, []); // Empty dependency array ensures this runs only on mount

  // Handle scroll for header
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
    }
  };

  return (
    <div className={cn("relative", className)} id="navbar">
      {/* Header */}
      <header
        className={cn(
          "header fixed top-0 left-0 right-0 z-[1000] transition-all duration-300",
          "flex justify-between items-center px-8 py-6",
          isScrolled
            ? "bg-white shadow-[0_2px_10px_rgba(0,0,0,0.07)]"
            : "bg-transparent"
        )}
      >
        {/* Logo */}
        <Button
          onClick={() => scrollToSection("navbar")}
          className={cn(
            "logo font-bold text-3xl transition-all cursor-pointer duration-300 ease-out no-underline",
            "font-poppins",
            isScrolled
              ? "text-[#1A1A1A]"
              : "text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.18)]"
          )}
        >
          acrilc
        </Button>

        {/* Navigation */}
        <nav className="nav-links flex items-center gap-8">
          <button
            onClick={() => scrollToSection("features")}
            className={cn(
              "nav-link font-medium text-base transition-colors duration-300 ease-out",
              "relative py-2 no-underline",
              isScrolled
                ? "text-[#1A1A1A] hover:text-[#E2725B]"
                : "text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.18)] hover:text-[#E2725B]"
            )}
          >
            Features
          </button>

          <button
            onClick={() => scrollToSection("testimonials")}
            className={cn(
              "nav-link font-medium text-base transition-colors duration-300 ease-out",
              "relative py-2 no-underline",
              isScrolled
                ? "text-[#1A1A1A] hover:text-[#E2725B]"
                : "text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.18)] hover:text-[#E2725B]"
            )}
          >
            Testimonials
          </button>

          <button
            onClick={() => scrollToSection("how-it-works")}
            className={cn(
              "nav-link font-medium text-base transition-colors duration-300 ease-out",
              "relative py-2 no-underline",
              isScrolled
                ? "text-[#1A1A1A] hover:text-[#E2725B]"
                : "text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.18)] hover:text-[#E2725B]"
            )}
          >
            How It Works
          </button>

          <button
            onClick={() => scrollToSection("gallery")}
            className={cn(
              "nav-link font-medium text-base transition-colors duration-300 ease-out",
              "relative py-2 no-underline",
              isScrolled
                ? "text-[#1A1A1A] hover:text-[#E2725B]"
                : "text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.18)] hover:text-[#E2725B]"
            )}
          >
            Gallery
          </button>

          {/* Sign In Button */}
          <Link href={"/auth/signup"}>
            <button
              className={cn(
                "btn btn-secondary btn-signin px-8 py-4 rounded-[50px] font-medium no-underline",
                "transition-all duration-300 ease-out border-2",
                "hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(226,114,91,0.2)]",
                isScrolled
                  ? "bg-white text-[#E2725B] border-[#E2725B] hover:bg-[#E2725B] hover:text-white hover:border-[#E2725B]"
                  : "bg-white text-[#E2725B] border-[#E2725B] hover:bg-[#E2725B] hover:text-white hover:border-[#E2725B]"
              )}
              onClick={() => {
                console.log("Sign in clicked");
              }}
            >
              Sign Up
            </button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-cover bg-center bg-no-repeat transition-[background-image] duration-500 ease-in-out">
        {/* Hero Background */}
        <div
          className="hero-background absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat animate-[zoomEffect_20s_ease-out_forwards] z-0"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />

        {/* Overlay */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-10 pointer-events-none" />

        {/* Hero Content */}
        <div className="hero-content relative z-20 max-w-3xl mx-auto text-center px-8 transition-transform duration-300 ease-out text-white flex flex-col items-center justify-center">
          <h1 className="hero-logo font-poppins font-bold text-6xl text-white mb-2 inline-block">
            acrilc
          </h1>

          <p className="hero-subheading font-[Cormorant_Garamond,serif] text-4xl font-bold text-white mb-4 tracking-[0.01em]">
            Empowering Artisans. Inspiring the World.
          </p>

          <p className="hero-description text-lg text-white mb-8 text-center whitespace-normal overflow-visible">
            Acrilc is the AI-powered platform where handcrafted art finds its
            voice, value, and global audience.
          </p>

          {/* CTA Buttons */}
          <div className="cta-buttons flex gap-4 justify-center">
            <Link
              href="/auth/login"
              className="btn btn-primary px-8 py-4 rounded-[50px] font-medium no-underline transition-all duration-300 ease-out bg-gradient-to-r from-[#E2725B] to-[#D4A373] text-white border-none hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(226,114,91,0.3)]"
            >
              Join as an Artist
            </Link>

            <Link
              href="/coming"
              className="btn btn-secondary bg-white text-[#E2725B] border-2 border-[#E2725B] px-8 py-4 rounded-[50px] font-medium no-underline transition-all duration-300 ease-out hover:bg-[#E2725B] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(226,114,91,0.2)]"
            >
              Create Your Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
