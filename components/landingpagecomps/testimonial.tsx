"use client";

import { cn } from "@/lib/utils";

interface TestimonialsSectionProps {
  className?: string;
}

export default function TestimonialsSection({ className }: TestimonialsSectionProps) {
  return (
    <section
      id="testimonials"
      className={cn(
        "py-24 bg-gradient-to-b from-[#F5E6D3] to-white", // Maps to --accent-cream to #fff
        className
      )}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <h2
          className="text-center text-4xl md:text-5xl font-bold font-['Cormorant_Garamond',serif] text-[#2C3E50] mb-10 transition-colors duration-300 hover:text-[#E2725B] cursor-pointer"
        >
          Why Artists Love Acrilc?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#7D9F8A]/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(125,159,138,0.15)] hover:border-[#7D9F8A]"
          >
            <p className="text-[#4A4A4A] mb-6 text-lg">
              &quot;Acrilc has transformed how I connect with art lovers worldwide.
              The AI-powered features are incredible!&quot;
            </p>
            <h4 className="text-xl font-['Cormorant_Garamond',serif] font-semibold text-[#2C3E50] mb-2">
              Sarah Chen
            </h4>
            <p className="text-[#4A4A4A] text-base">Ceramic Artist</p>
          </div>

          <div
            className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#7D9F8A]/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(125,159,138,0.15)] hover:border-[#7D9F8A]"
          >
            <p className="text-[#4A4A4A] mb-6 text-lg">
              &quot;Finally, a platform that understands the needs of handcrafted
              artists. My sales have doubled!&quot;
            </p>
            <h4 className="text-xl font-['Cormorant_Garamond',serif] font-semibold text-[#2C3E50] mb-2">
              Michael Rodriguez
            </h4>
            <p className="text-[#4A4A4A] text-base">Woodworker</p>
          </div>

          <div
            className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#7D9F8A]/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(125,159,138,0.15)] hover:border-[#7D9F8A]"
          >
            <p className="text-[#4A4A4A] mb-6 text-lg">
              &quot;The community and support here are unmatched. It&apos;s more than just
              a marketplace.&quot;
            </p>
            <h4 className="text-xl font-['Cormorant_Garamond',serif] font-semibold text-[#2C3E50] mb-2">
              Emma Thompson
            </h4>
            <p className="text-[#4A4A4A] text-base">Textile Artist</p>
          </div>
        </div>
      </div>
    </section>
  );
}