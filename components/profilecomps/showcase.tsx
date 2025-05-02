"use client";

import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MoreHorizontal } from "lucide-react";

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
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="relative w-full overflow-hidden rounded-xl"
              >
                <Image
                  src={item.src}
                  alt={`Artwork ${item.id}`}
                  width={400}
                  height={500}
                  className="w-full rounded-xl"
                />
                {item.label && (
                  <div className="absolute top-2 left-2 bg-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                    {item.label}
                  </div>
                )}
                {item.showMenu && (
                  <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                    <MoreHorizontal size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="storyboard">
          <p className="text-center text-gray-500 py-10">
            Storyboard content goes here.
          </p>
        </TabsContent>

        <TabsContent value="marketplace">
          <p className="text-center text-gray-500 py-10">
            Marketplace content goes here.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GallerySection;
