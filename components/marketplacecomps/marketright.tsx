"use client";

import { IMarketplace } from "@/types/marketplace";
import { Link2, MessageCircle, MoreHorizontal, Truck } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const MarketRight = ({ data }: { data: IMarketplace }) => {
  const [selectedSize, setSelectedSize] = useState<string>(
    data.pricingOptions.sizesAndPrices[0]?.size || ""
  );
  const [currentPrice, setCurrentPrice] = useState<number>(
    data.pricingOptions.sizesAndPrices[0]?.price || 0
  );

  const handleSizeChange = (size: string) => {
    const matched = data.pricingOptions.sizesAndPrices.find(s => s.size === size);
    if (matched) { setSelectedSize(size); setCurrentPrice(matched.price); }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank"); break;
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(`${data.title} - ${url}`)}`, "_blank"); break;
      case "copy":
        navigator.clipboard.writeText(url); toast.success("Link copied!"); break;
    }
  };

  return (
    <div className="flex-1 max-w-lg">
      {/* Title */}
      <h1 className="text-2xl font-bold text-[#2e1f14] mb-1">{data.title}</h1>

      {/* Price */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl font-bold text-[#834C3D]">{formatPrice(currentPrice)}</span>
        <div className="flex items-center gap-1 text-sm text-[#9a8578]">
          <Truck size={14} />
          <span>Free Shipping</span>
        </div>
      </div>

      {/* Size selector */}
      {data.pricingOptions.sizesAndPrices.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-semibold text-[#765240] uppercase tracking-wider mb-2">Select Size</p>
          <div className="flex flex-wrap gap-2">
            {data.pricingOptions.sizesAndPrices.map((option, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSizeChange(option.size)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer
                  ${selectedSize === option.size
                    ? "bg-[#f5e2d8] border-[#834C3D] text-[#834C3D] ring-2 ring-[#834C3D]/20"
                    : "bg-white border-[#ead7c9] text-[#5e3c2f] hover:border-[#c98d68] hover:bg-[#fff7f2]"
                  }`}
              >
                {option.size}
              </button>
            ))}
          </div>
          <p className="text-xs text-[#9a8578] mt-2">
            <span className="font-bold">&apos;</span> = feet &nbsp;
            <span className="font-bold">&quot;</span> = inches
          </p>
        </div>
      )}

      {/* CTA */}
      <button
        type="button"
        className="w-full h-12 rounded-full border border-[#8f5b42]/10 bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] text-base font-semibold text-white shadow-[0_8px_20px_rgba(131,76,61,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(131,76,61,0.36)] flex items-center justify-center gap-2 cursor-pointer mb-4"
      >
        <MessageCircle size={18} />
        Chat Now
      </button>

      {/* Share */}
      <div className="flex items-center gap-2 pt-3 border-t border-[#f0ddd0]">
        <span className="text-xs text-[#9a8578] font-medium mr-1">Share</span>

        {/* Facebook */}
        <button type="button" onClick={() => handleShare("facebook")} title="Share on Facebook"
          className="w-8 h-8 rounded-full border border-[#ead7c9] bg-white flex items-center justify-center text-[#9a8578] hover:text-[#834C3D] hover:border-[#c98d68] transition cursor-pointer">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>

        {/* WhatsApp */}
        <button type="button" onClick={() => handleShare("whatsapp")} title="Share on WhatsApp"
          className="w-8 h-8 rounded-full border border-[#ead7c9] bg-white flex items-center justify-center text-[#9a8578] hover:text-[#834C3D] hover:border-[#c98d68] transition cursor-pointer">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </button>

        {/* Copy link */}
        <button type="button" onClick={() => handleShare("copy")} title="Copy link"
          className="w-8 h-8 rounded-full border border-[#ead7c9] bg-white flex items-center justify-center text-[#9a8578] hover:text-[#834C3D] hover:border-[#c98d68] transition cursor-pointer">
          <Link2 size={14} />
        </button>

        <button type="button" title="More"
          className="w-8 h-8 rounded-full border border-[#ead7c9] bg-white flex items-center justify-center text-[#9a8578] hover:text-[#834C3D] hover:border-[#c98d68] transition cursor-pointer">
          <MoreHorizontal size={14} />
        </button>
      </div>
    </div>
  );
};

export default MarketRight;
