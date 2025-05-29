"use client";

import { IMarketplace } from "@/types/marketplace";
import {
  Facebook,
  Instagram,
  Link2,
  MessageCircle,
  MoreHorizontal,
  Star,
  Truck,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

const MarketRight = ({ data }: { data: IMarketplace }) => {
    console.log(data);
  const [selectedSize, setSelectedSize] = useState<string>(
    data.pricingOptions.sizesAndPrices[0]?.size || ""
  );
  const [currentPrice, setCurrentPrice] = useState<number>(
    data.pricingOptions.sizesAndPrices[0]?.price || 0
  );

  const handleSizeChange = (size: string) => {
    const matched = data.pricingOptions.sizesAndPrices.find(
      (s) => s.size === size
    );
    if (matched) {
      setSelectedSize(size);
      setCurrentPrice(matched.price);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

//   const priceRange = `${formatPrice(
//     Math.min(...data.pricingOptions.sizesAndPrices.map((s) => s.price))
//   )} – ${formatPrice(
//     Math.max(...data.pricingOptions.sizesAndPrices.map((s) => s.price))
//   )}`;

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = `Check out "${data.title}"`;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
          "_blank"
        );
        break;
      case "instagram":
        window.open("https://instagram.com/", "_blank");
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex-1 max-w-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.title}</h1>

      {/* Rating */}
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={20} className="text-gray-300" />
        ))}
      </div>

      {/* Price Display */}
      <div className="flex items-center space-x-2 mb-4">
        <span className="text-2xl font-bold text-gray-900">
          {formatPrice(currentPrice)}
        </span>
        <div className="flex items-center text-gray-600 font-medium ml-2">
          <Truck size={16} className="mr-1" />
          Free Shipping
        </div>
      </div>

      {/* Size Selector */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {data.pricingOptions.sizesAndPrices.map((option, idx) => (
          <Button
            key={idx}
            onClick={() => handleSizeChange(option.size)}
            className={`px-6 py-6 rounded-full hover:bg-black/90 transition duration-500 hover:scale-105 cursor-pointer border font-semibold h-auto whitespace-pre-line ${
              selectedSize === option.size
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
            }`}
          >
            {option.size}
          </Button>
        ))}
      </div>

      {/* Chat Now Button */}
      <Button
        size="lg"
        className="w-full bg-black text-white py-6 rounded-full font-bold text-lg shadow hover:bg-gray-900 mb-4 transition-transform duration-200 transform hover:scale-105 hover:shadow-2xl"
      >
        <MessageCircle className="mr-2" size={20} />
        Chat Now
      </Button>

      {/* Dimension Guide */}
      <div className="text-xs text-gray-500 mb-4">
        Dimension Guide
        <br />
        <span className="font-bold">&apos;</span> denotes feet &nbsp;
        <span className="font-bold">&quot;</span> denotes inches
      </div>

      {/* Share Icons */}
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleShare("facebook")}
          className="text-gray-500 hover:text-black"
          title="Share on Facebook"
        >
          <Facebook size={20} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleShare("whatsapp")}
          className="text-gray-500 hover:text-black"
          title="Share on WhatsApp"
        >
          <MessageCircle size={20} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleShare("instagram")}
          className="text-gray-500 hover:text-black"
          title="Instagram"
        >
          <Instagram size={20} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleShare("copy")}
          className="text-gray-500 hover:text-black"
          title="Copy Link"
        >
          <Link2 size={20} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-black"
          title="More"
        >
          <MoreHorizontal size={20} />
        </Button>
      </div>
    </div>
  );
};

export default MarketRight;
