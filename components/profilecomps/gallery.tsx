"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IUser } from "@/types/types";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import MarketPlace from "./marketplace";
import Showcase from "./showcase";
import Storyboard from "./storyboard";
import { reverseTabMap, tabMap } from "./data";

interface ArtistProfileTabsProps {
  user: IUser;
  isSame: boolean;
  className?: string;
}

const ArtistProfileTabs: React.FC<ArtistProfileTabsProps> = ({
  user,
  isSame,
  className,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabsRef = useRef<HTMLDivElement>(null);

  const getTabFromUrl = (): string => {
    const tabParam = searchParams.get("tab");
    return tabMap[tabParam ?? ""] ?? "showcase";
  };

  const [tabValue, setTabValue] = useState(getTabFromUrl());

  useEffect(() => {
    const newTab = getTabFromUrl();
    setTabValue(newTab);
  }, [getTabFromUrl, searchParams]);

  useEffect(() => {
    if (searchParams.get("tab") && tabsRef.current) {
      tabsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchParams]);

  const handleTabChange = (newTab: string) => {
    setTabValue(newTab);
    const queryTab = reverseTabMap[newTab] ?? "gallery";
    router.replace(`?tab=${queryTab}`, { scroll: false });
  };

  return (
    <div
      ref={tabsRef}
      className={`bg-white rounded-xl shadow-lg mb-8 mx-auto max-w-6xl w-full ${
        className || ""
      }`}
    >
      <Tabs value={tabValue} onValueChange={handleTabChange} className="w-full">
        {/* Responsive Tabs List */}
        <div className="w-full border-b border-gray-200 px-4 sm:px-6 md:px-8 overflow-x-auto">
          <TabsList className="inline-flex flex-nowrap gap-2 sm:gap-4 bg-transparent rounded-none h-auto p-0">
            <TabsTrigger
              value="showcase"
              className="whitespace-nowrap rounded-none border-b-2 border-transparent data-[state=active]:border-b-black data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold text-gray-500 data-[state=active]:text-black hover:text-black transition-colors"
            >
              Showcase
            </TabsTrigger>
            <TabsTrigger
              value="storyboard"
              className="whitespace-nowrap rounded-none border-b-2 border-transparent data-[state=active]:border-b-black data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold text-gray-500 data-[state=active]:text-black hover:text-black transition-colors"
            >
              Storyboard
            </TabsTrigger>
            <TabsTrigger
              value="marketplace"
              className="whitespace-nowrap rounded-none border-b-2 border-transparent data-[state=active]:border-b-black data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold text-gray-500 data-[state=active]:text-black hover:text-black transition-colors"
            >
              Marketplace
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Contents */}
        <TabsContent value="showcase" className="p-4 sm:p-6 md:p-8 mt-0">
          <Showcase user={user} isSame={isSame} />
        </TabsContent>
        <TabsContent value="storyboard" className="p-4 sm:p-6 md:p-8 mt-0">
          <Storyboard user={user} isSame={isSame} />
        </TabsContent>
        <TabsContent value="marketplace" className="p-4 sm:p-6 md:p-8 mt-0">
          <MarketPlace />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArtistProfileTabs;
