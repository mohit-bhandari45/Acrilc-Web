"use client";

import { cn } from "@/lib/utils";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FormEvent, useState } from "react";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    console.log("Subscribed with email:", email);
    setEmail(""); // Reset form after submission
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <footer className={cn("bg-[#2C3E50] text-white py-16", className)}>
        <div className="container mx-auto max-w-7xl px-4 flex gap-12">
          <div className="newsletter rounded-xl w-[40%]">
            <h3 className="text-xl md:text-2xl font-['Cormorant_Garamond',serif] font-semibold text-white mb-3">
              Stay Inspired
            </h3>
            <p className="text-white/80 text-base mb-5">
              Art is better with company — get inspired with us.
            </p>
            <form
              className="newsletter-form flex flex-col sm:flex-row gap-3"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="w-full sm:w-auto flex-1 px-4 py-2.5 rounded-full border-[1.5px] border-white/20 text-white text-base focus:outline-none focus:border-[#E2725B] focus:ring-2 focus:ring-[#E2725B]/20 transition-all duration-200 bg-transparent placeholder-white/50"
                aria-label="Email address for newsletter subscription"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#E2725B] text-white font-medium text-base border-[1.5px] border-[#E2725B] hover:bg-[#D4A373] hover:border-[#D4A373] transition-all duration-200"
              >
                Subscribe
              </button>
            </form>
            {error && <p className="text-[#E2725B] text-sm mt-3">{error}</p>}
          </div>
          <div className="footer-grid w-[60%] grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="footer-column">
              <h3 className="text-xl font-['Cormorant_Garamond',serif] font-semibold mb-4">
                About Acrilc
              </h3>
              <ul className="list-none">
                <li className="mb-2">
                  <Link
                    href="/about"
                    className="text-white/80 text-base hover:text-[#E2725B] transition-all duration-300"
                  >
                    Our Story
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/about"
                    className="text-white/80 text-base hover:text-[#E2725B] transition-all duration-300"
                  >
                    Team
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="text-xl font-['Cormorant_Garamond',serif] font-semibold mb-4">
                For Artists
              </h3>
              <ul className="list-none">
                <li className="mb-2">
                  <button
                    onClick={() => scrollToSection("how-it-works")}
                    className="text-white/80 text-base hover:text-[#E2725B] transition-all duration-300"
                  >
                    How It Works
                  </button>
                </li>
                <li className="mb-2">
                  <button
                    onClick={() => scrollToSection("testimonials")}
                    className="text-white/80 text-base hover:text-[#E2725B] transition-all duration-300"
                  >
                    Success Stories
                  </button>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="text-xl font-['Cormorant_Garamond',serif] font-semibold mb-4">
                Help Center
              </h3>
              <ul className="list-none">
                <li className="mb-2">
                  <Link
                    href="/terms"
                    className="text-white/80 text-base hover:text-[#E2725B] transition-all duration-300"
                  >
                    Terms of Service
                  </Link>
                </li>
                {/* <li className="mb-2">
                  <a
                    href="#"
                    className="text-white/80 text-base hover:text-[#E2725B] transition-all duration-300"
                  >
                    Contact
                  </a>
                </li> */}
                <li>
                  <Link
                    href="/coming"
                    className="text-white/80 text-base hover:text-[#E2725B] transition-all duration-300"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="text-xl font-['Cormorant_Garamond',serif] font-semibold mb-4">
                Connect
              </h3>
              <div className="social-icons flex gap-4 mt-4">
                <a
                  href="https://www.instagram.com/theacrilc?igsh=NjRndzAydDdqcnF0"
                  target="_blank"
                  className="text-white/80 text-xl hover:text-[#E2725B] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  href="https://pin.it/2LBlIjfr6"
                  target="_blank"
                  className="text-white/80 text-xl hover:text-[#E2725B] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faPinterest} />
                </a>
                <a
                  href="https://www.linkedin.com/company/106374767/admin/dashboard"
                  target="_blank"
                  className="text-white/80 text-xl hover:text-[#E2725B] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a
                  href="https://www.facebook.com/share/16CThH4ZMU/"
                  target="_blank"
                  className="text-white/80 text-xl hover:text-[#E2725B] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div
        className={cn(
          "bg-[#2C3E50] text-white py-10 footer-copyright text-center border-t-[0.5px] border-white",
          className
        )}
      >
        <p>&copy; 2025 Acrilc. All rights reserved.</p>
      </div>
    </>
  );
}
