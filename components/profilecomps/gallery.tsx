"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import MarketPlace from "./marketplace";
import Showcase from "./showcase";
import Storyboard from "./storyboard";

const tabs = [
  { label: "Showcase", value: "showcase" },
  { label: "Storyboard", value: "storyboard" },
  { label: "Marketplace", value: "marketplace" },
];

const GallerySection = () => {
  const [activeTab, setActiveTab] = useState("showcase");
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const updateUnderline = useCallback(() => {
    const currentTab = tabRefs.current[activeTab];
    if (currentTab) {
      const { offsetLeft, offsetWidth } = currentTab;
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

  useEffect(() => {
    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [updateUnderline]);

  return (
    <div className="max-w-6xl mx-auto px-2 py-8">
      <Tabs defaultValue="showcase" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="relative">
          <TabsList className="flex w-full justify-between md:justify-evenly mb-6 relative cursor-pointer">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                ref={(el) => (tabRefs.current[tab.value] = el)}
                className={`relative px-4 py-2 text-sm sm:text-base font-medium text-gray-600 transition-colors ${
                  activeTab === tab.value ? "text-black font-bold" : ""
                }`}
              >
                {tab.label} 
              </TabsTrigger>
            ))}

            {/* Animated Underline */}
            <motion.div
              className="absolute bottom-0 h-[2px] bg-black"
              animate={{ left: underlineStyle.left, width: underlineStyle.width }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </TabsList>
        </div>

        {/* Tab Content */}
        <TabsContent value="showcase">
          <Showcase />
        </TabsContent>
        <TabsContent value="storyboard">
          <Storyboard />
        </TabsContent>
        <TabsContent value="marketplace">
          <MarketPlace />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GallerySection;
