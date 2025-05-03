"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Showcase from "./showcase";
import Storyboard from "./storyboard";
import MarketPlace from "./marketplace";

const galleryItems = [
  {
    id: 1,
    src: "/assets/profileassets/first.png",
    label: "3D",
    showMenu: true,
  },
  { id: 2, src: "/assets/profileassets/second.png", showMenu: false },
  { id: 3, src: "/assets/profileassets/thirs.png", showMenu: true },
  { id: 4, src: "/assets/profileassets/four.png", showMenu: false },
  {
    id: 5,
    src: "/assets/profileassets/thirs.png",
    label: "3D",
    showMenu: false,
  },
  { id: 6, src: "/assets/profileassets/first.png", showMenu: true },
  { id: 7, src: "/assets/profileassets/four.png", showMenu: true },
  { id: 8, src: "/assets/profileassets/second.png", showMenu: false },
  { id: 9, src: "/assets/profileassets/four.png", showMenu: true },
];

const GallerySection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Tabs defaultValue="showcase" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-transparent">
          <TabsTrigger
            value="showcase"
            className="relative font-bold text-md cursor-pointer text-gray-700 data-[state=active]:text-black data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-28 data-[state=active]:after:w-[40%] data-[state=active]:after:h-[1px] data-[state=active]:after:bg-black"
          >
            Showcase
          </TabsTrigger>
          <TabsTrigger
            value="storyboard"
            className="relative font-bold text-md cursor-pointer text-gray-700 data-[state=active]:text-black data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-28 data-[state=active]:after:w-[40%] data-[state=active]:after:h-[1px] data-[state=active]:after:bg-black"
          >
            Storyboard
          </TabsTrigger>
          <TabsTrigger
            value="marketplace"
            className="relative font-bold text-md cursor-pointer text-gray-700 data-[state=active]:text-black data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-28 data-[state=active]:after:w-[40%] data-[state=active]:after:h-[1px] data-[state=active]:after:bg-black"
          >
            Marketplace
          </TabsTrigger>
        </TabsList>

        <TabsContent value="showcase">
          <Showcase gallery={galleryItems}/>
        </TabsContent>

        <TabsContent value="storyboard">
          <Storyboard/>
        </TabsContent>

        <TabsContent value="marketplace">
          <MarketPlace/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GallerySection;
