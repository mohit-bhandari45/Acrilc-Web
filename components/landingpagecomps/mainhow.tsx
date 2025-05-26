"use client";

import { cn } from "@/lib/utils";
import { faDollarSign, faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface HowItWorksMainProps {
  className?: string;
}

export default function HowItWorksMain({ className }: HowItWorksMainProps) {
  return (
    <section
      id="how-it-works"
      className={cn("py-16 bg-[#FAFAF9]", className)} // Maps to padding: 4rem 0; background: #fafaf9
    >
      <div className="container mx-auto max-w-6xl px-4">
        <h2
          className="text-center text-3xl md:text-4xl font-['Cormorant_Garamond',serif] font-semibold text-[#2C3E50] mb-10 transition-colors duration-300 hover:text-[#E2725B] cursor-pointer"
        >
          How It Works
        </h2>
        <div className="how-it-works-cards grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div
            className="how-it-works-card bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(34,34,34,0.08)] border-[1.5px] border-[#ECECEC] text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(212,165,165,0.15)] hover:border-[#D4A5A5]"
          >
            <div className="text-5xl text-[#222] mb-5">
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <div className="font-['Cormorant_Garamond',serif] text-xl font-bold text-[#2C3E50] mb-2">
              Create your portfolio
            </div>
            <div className="text-[#444] text-base">
              Sign up and build your personalized digital space with our intuitive
              tools. No design skills needed.
            </div>
          </div>
          {/* Card 2 */}
          <div
            className="how-it-works-card bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(34,34,34,0.08)] border-[1.5px] border-[#ECECEC] text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(212,165,165,0.15)] hover:border-[#D4A5A5]"
          >
            <div className="text-5xl text-[#222] mb-5">
              <FontAwesomeIcon icon={faUpload} />
            </div>
            <div className="font-['Cormorant_Garamond',serif] text-xl font-bold text-[#2C3E50] mb-2">
              Upload your art
            </div>
            <div className="text-[#444] text-base">
              Add your creations and let our AI help organize, tag, and optimize
              them for discovery by the right audience.
            </div>
          </div>
          {/* Card 3 */}
          <div
            className="how-it-works-card bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(34,34,34,0.08)] border-[1.5px] border-[#ECECEC] text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(212,165,165,0.15)] hover:border-[#D4A5A5]"
          >
            <div className="text-5xl text-[#222] mb-5">
              <FontAwesomeIcon icon={faDollarSign} />
            </div>
            <div className="font-['Cormorant_Garamond',serif] text-xl font-bold text-[#2C3E50] mb-2">
              Sell, collaborate, and grow
            </div>
            <div className="text-[#444] text-base">
              Connect with buyers, collaborate with other artists, and watch your
              creative business flourish.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}