"use client";

import api, { GET_FEATURED_POSTS } from "@/apis/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IPost, IUser } from "@/types/types";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

interface GalleryProps {
  title?: string;
  subtitle?: string;
  items?: IPost[];
  categories?: string[];
  itemsPerPage?: number;
  user: IUser;
}

const Gallery: React.FC<GalleryProps> = ({
  user,
  title = "Gallery",
  subtitle = "A curated collection of my ceramic works, exploring form, function, and the beauty of handmade objects.",
  itemsPerPage = 6,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [visibleItems, setVisibleItems] = useState<number>(itemsPerPage);
  const [, setSelectedImage] = useState<IPost | null>(null);
  const [posts, setPosts] = useState<IPost[] | null>(null);

  useEffect(() => {
    const getPosts = async () => {
      const res = await api.get(`${GET_FEATURED_POSTS}/${user._id}/featured-posts`);

      if (res.status === 200) {
        setPosts(res.data.data);
      }
    };

    getPosts();
  }, [user._id]);

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    if (!posts) return null;
    if (activeFilter === "All") {
      return posts;
    }
    return posts!.filter((item) => item.forte === activeFilter);
  }, [activeFilter, posts]);

  // Get visible items for pagination
  if (!filteredItems || !user) return null;

  const displayedItems = filteredItems!.slice(0, visibleItems);

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    setVisibleItems(itemsPerPage); // Reset pagination when filter changes
  };

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + itemsPerPage);
  };

  const hasMoreItems = visibleItems < filteredItems!.length;

  return (
    <section id="gallery" className="min-h-screen py-20 px-6 lg:px-10 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-serif font-normal mb-5 text-gray-900">
            {title}
          </h2>
          <p className="text-gray-600 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {["All", ...user.preferences!].map((category) => (
            <Badge
              key={category}
              variant={activeFilter === category ? "default" : "outline"}
              className={`
                cursor-pointer px-5 py-2 text-sm font-medium rounded-full transition-all duration-300
                ${
                  activeFilter === category
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-50 text-gray-600 hover:bg-black hover:text-white border-gray-200"
                }
              `}
              onClick={() => handleFilterChange(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Gallery Grid - Masonry Style */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5 mb-12">
          {displayedItems.map((item) => (
            <Dialog key={item._id}>
              <DialogTrigger asChild>
                <div
                  className="break-inside-avoid cursor-pointer group"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group-hover:transform group-hover:scale-[1.02]">
                    <div className="relative overflow-hidden">
                      <Image
                        src={item.media[0].url}
                        alt={item.title}
                        width={300}
                        height={400}
                        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-4">
                          <h3 className="font-semibold text-lg mb-1">
                            {item.title}
                          </h3>
                          {/* {item.dimensions && (
                            <p className="text-sm opacity-90">
                              {item.dimensions}
                            </p>
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogTrigger>

              <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative aspect-square md:aspect-auto">
                    <Image
                      src={item.media[0].url}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="space-y-4">
                      <Badge variant="outline" className="w-fit">
                        {item.forte}
                      </Badge>
                      <h3 className="text-2xl font-serif font-normal text-gray-900">
                        {item.title}
                      </h3>
                      {item.story && (
                        <p className="text-gray-600 leading-relaxed">
                          {item.story}
                        </p>
                      )}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                        {/* {item.dimensions && (
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Dimensions
                            </p>
                            <p className="text-sm text-gray-600">
                              {item.dimensions}
                            </p>
                          </div>
                        )} */}
                        {/* {item.year && (
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Year
                            </p>
                            <p className="text-sm text-gray-600">{item.year}</p>
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Load More Button */}
        {hasMoreItems && (
          <div className="text-center">
            <Button
              variant="outline"
              onClick={handleLoadMore}
              className="px-8 py-3 border-gray-300 hover:bg-black hover:text-white hover:border-black transition-all duration-300 rounded-full font-medium"
            >
              Load More
            </Button>
          </div>
        )}

        {/* No Items Message */}
        {filteredItems!.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No items found in the &quot;{activeFilter}&quot; category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
