"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface CtaSectionProps {
  className?: string;
}

export default function CtaSection({ className }: CtaSectionProps) {
  return (
    <section
      className={cn(
        "py-16 bg-gradient-to-r from-[#E2725B] to-[#D4A373] text-white text-center",
        className
      )} // Maps to background: var(--gradient-primary); padding: 4rem 0 4.5rem 0
    >
      <div className="container mx-auto max-w-6xl px-4">
        <h2
          className="text-3xl md:text-4xl font-['Cormorant_Garamond',serif] font-bold mb-5 transition-all duration-300 hover:text-white hover:[text-shadow:0_2px_12px_rgba(226,114,91,0.25)] cursor-pointer"
        >
          Ready to bring your art to the world?
        </h2>
        <p className="text-lg text-white/90 mb-10">
          Join thousands of artists who are growing their audience, selling their
          work, and
          <br />
          building sustainable creative careers with Acrilc.
        </p>
        <div className="cta-buttons flex flex-wrap justify-center gap-6">
          <Link href={"/auth/signup"}>
            <button
            className="cta-btn-main bg-white text-[#E2725B] border-2 border-[#E2725B] text-lg font-bold py-3 px-8 rounded-full shadow-none transition-all duration-200 hover:bg-[#E2725B] hover:text-white"
          >
            Create Your Profile — Free
          </button>
          </Link>
          <button
            className="cta-btn-outline bg-[#E2725B] text-white border-2 border-[#E2725B] text-lg font-bold py-3 px-8 rounded-full shadow-none transition-all duration-200 hover:bg-white hover:text-[#E2725B]"
          >
            Browse the Marketplace
          </button>
        </div>
      </div>
    </section>
  );
}