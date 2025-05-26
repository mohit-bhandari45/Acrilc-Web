"use client";

import { cn } from "@/lib/utils";
import {
  faDollarSign,
  faImage,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FeaturesSectionProps {
  className?: string;
}

export default function FeaturesSection({ className }: FeaturesSectionProps) {
  return (
    <section
      id="features"
      className={cn(
        "py-24 bg-gradient-to-b from-white to-[#F5E6D3]", // Maps to --accent-cream
        className
      )}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-center text-4xl md:text-5xl font-bold font-['Cormorant_Garamond',serif] text-[#2C3E50] mb-10 transition-colors duration-300 hover:text-[#E2725B] cursor-pointer">
          What is Acrilc?
        </h2>
        <p className="text-lg text-[#4A4A4A] mb-12 text-center max-w-3xl mx-auto">
          Acrilc is an AI-powered social-commerce platform built exclusively for
          handcrafted artists—painters, sculptors, designers, and artisans. It
          offers a dedicated digital space to showcase creations, connect with a
          global community, and monetize art through brand collaborations,
          premium tools, and authentic networking. With its intuitive features
          and artist-first approach, Acrilc empowers creativity and helps turn
          passion into sustainable livelihoods.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#E2725B]/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(226,114,91,0.15)] hover:border-[#E2725B]">
            <div className="text-[#E2725B] text-4xl mb-6">
              <FontAwesomeIcon icon={faImage} />
            </div>
            <h3 className="text-xl font-['Cormorant_Garamond',serif] font-semibold text-[#2C3E50] mb-4">
              Showcase
            </h3>
            <p className="text-[#4A4A4A]">
              Your personalized digital portfolio, powered by AI. Present your
              work in a stunning, customizable space that highlights your unique
              artistic vision.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#E2725B]/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(226,114,91,0.15)] hover:border-[#E2725B]">
            <div className="text-[#E2725B] text-4xl mb-6">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <h3 className="text-xl font-['Cormorant_Garamond',serif] font-semibold text-[#2C3E50] mb-4">
              Collaborate
            </h3>
            <p className="text-[#4A4A4A]">
              Connect with brands, patrons, and other creators. Build meaningful
              relationships that inspire new work and open doors to exciting
              opportunities.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#E2725B]/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(226,114,91,0.15)] hover:border-[#E2725B]">
            <div className="text-[#E2725B] text-4xl mb-6">
              <FontAwesomeIcon icon={faDollarSign} />
            </div>
            <h3 className="text-xl font-['Cormorant_Garamond',serif] font-semibold text-[#2C3E50] mb-4">
              Monetize
            </h3>
            <p className="text-[#4A4A4A]">
              Sell art, grow your fanbase, and earn from your passion. Our
              AI-powered tools help you price your work, find your audience, and
              maximize your creative income.
            </p>
          </div>
        </div>

        {/* Video Testimonial Block */}
        <div className="flex flex-col items-center mt-14">
          <div className="w-full max-w-[700px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-[18px] overflow-hidden relative">
            <video
              id="acrilcTestimonialVideo"
              className="w-full h-auto bg-[#EEE]"
              poster="https://i.ibb.co/ks2FNyCV/Phone-profile-section.jpg"
              controls
            >
              <iframe
                src="https://player.vimeo.com/video/1087759368?h=1d69b048ba"
                width="640"
                height="360"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
              Your browser does not support the video tag.
            </video>
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-transparent p-2 md:p-4">
              <span className="text-white font-['Cormorant_Garamond',serif] text-lg md:text-xl font-semibold">
                Acrilc App Promo: Coming Soon!
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
