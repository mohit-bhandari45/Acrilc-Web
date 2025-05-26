"use client";

import { cn } from "@/lib/utils";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CompareSectionProps {
  className?: string;
}

export default function CompareSection({ className }: CompareSectionProps) {
  return (
    <section
      id="compare"
      className={cn("py-12 bg-[#F7F7F8]", className)} // Maps to background: #f7f7f8; padding: 3rem 0
    >
      <div className="container mx-auto max-w-6xl px-4 flex flex-col items-center">
        <div
          className="w-full max-w-[900px] bg-white rounded-[14px] shadow-[0_4px_18px_rgba(0,0,0,0.08)] p-6 md:p-10 transition-all duration-300"
        >
          <h2
            className="text-center text-3xl md:text-4xl font-['Cormorant_Garamond',serif] font-semibold text-[#2C3E50] mb-8 transition-colors duration-300 hover:text-[#E2725B] cursor-pointer"
          >
            How Acrilc Compares
          </h2>
          <div className="flex flex-wrap justify-center gap-8 items-start">
            {/* Social Media Card */}
            <div
              className={cn(
                "social-media-card flex-1 min-w-[250px] bg-[#F1F1F3] rounded-[10px] p-6 border-2 border-transparent transition-all duration-300 cursor-pointer",
                "hover:border-[#E74C3C] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1"
              )}
            >
              <h3
                className="text-center text-lg font-['Cormorant_Garamond',serif] font-medium text-[#2C3E50] mb-5 transition-colors duration-300 hover:text-[#E74C3C]"
              >
                Traditional Social Media
              </h3>
              <ul className="list-none p-0 m-0">
                <li className="flex items-center mb-4">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="text-[#E74C3C] mr-3 text-lg"
                  />
                  <span className="text-[#4A4A4A]">
                    Algorithm prioritizes engagement, not art
                  </span>
                </li>
                <li className="flex items-center mb-4">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="text-[#E74C3C] mr-3 text-lg"
                  />
                  <span className="text-[#4A4A4A]">
                    Limited monetization options
                  </span>
                </li>
                <li className="flex items-center mb-4">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="text-[#E74C3C] mr-3 text-lg"
                  />
                  <span className="text-[#4A4A4A]">
                    No specialized tools for artists
                  </span>
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="text-[#E74C3C] mr-3 text-lg"
                  />
                  <span className="text-[#4A4A4A]">
                    Constant platform changes
                  </span>
                </li>
              </ul>
            </div>

            {/* Acrilc Platform Card */}
            <div
              className={cn(
                "acrilc-platform-card flex-1 min-w-[250px] bg-white rounded-[10px] p-6 border-2 border-transparent transition-all duration-300 cursor-pointer",
                "hover:border-[#27AE60] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1"
              )}
            >
              <h3
                className="text-center text-lg font-['Cormorant_Garamond',serif] font-medium text-[#2C3E50] mb-5 transition-colors duration-300 hover:text-[#27AE60]"
              >
                Acrilc Platform
              </h3>
              <ul className="list-none p-0 m-0">
                <li className="flex items-center mb-4">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-[#27AE60] mr-3 text-lg"
                  />
                  <span className="text-[#4A4A4A]">
                    AI-powered discovery for your specific art
                  </span>
                </li>
                <li className="flex items-center mb-4">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-[#27AE60] mr-3 text-lg"
                  />
                  <span className="text-[#4A4A4A]">
                    Multiple revenue streams built-in
                  </span>
                </li>
                <li className="flex items-center mb-4">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-[#27AE60] mr-3 text-lg"
                  />
                  <span className="text-[#4A4A4A]">
                    Custom portfolio and sales tools
                  </span>
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-[#27AE60] mr-3 text-lg"
                  />
                  <span className="text-[#4A4A4A]">
                    Artist-first platform design
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}