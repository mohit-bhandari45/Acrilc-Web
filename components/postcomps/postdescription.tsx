"use client";

import IPost from "@/types/post";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  ThumbsUp,
  MoreVertical,
  Edit2,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import CreateContent from "./createcontent";
import api, { DELETE_POST } from "@/apis/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const PostDescription = ({ post }: { post: IPost | null }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [type, setType] = useState<string | null>("");
  const router = useRouter();

  useEffect(() => {
    setType("post");
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [edit]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const prevImage = () => {
    if (post) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? post.media.length - 1 : prev - 1
      );
    }
  };

  const nextImage = () => {
    if (post) {
      setCurrentImageIndex((prev) =>
        prev === post.media.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handlerDelete = async () => {
    const res = await api.delete(`${DELETE_POST}/${post?._id}`);

    if(res.status===200){
      router.push("/profile");
      toast.success("Post Deleted Successfully");
    }
  };

  if (!post) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <HashLoader color="#FAA21B" size={200} />
      </div>
    );
  }

  return (
    <>
      {!edit ? (
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Image Carousel with Dropdown */}
          <div className="relative rounded-lg overflow-hidden bg-stone-300 mb-6">
            {/* Dropdown menu (top right) */}
            <div className="absolute top-3 right-3 z-20">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition"
              >
                <MoreVertical size={20} className="text-white" />
              </button>

              {menuOpen && (
                <div className="absolute cursor-pointer transition duration-500 ease-in-out right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 text-sm z-30">
                  <button
                    className="w-full flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    onClick={() => setEdit(true)}
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    className="w-full flex cursor-pointer items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100"
                    onClick={handlerDelete}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              )}
            </div>

            <div className="aspect-[3/2] w-full relative">
              {post.media.length && (
                <Image
                  src={post.media[currentImageIndex].url}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {post.media.length > 1 && (
              <>
                {/* Navigation arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 cursor-pointer -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/70 transition"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 cursor-pointer -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white/70 transition"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Dots indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {post.media.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Artwork Info */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="text-lg text-gray-700">{post.subtitle}</p>
            <p className="text-lg text-gray-700">{post.size}</p>

            <div className="py-2">
              <h2 className="text-xl font-semibold">Story of the Art</h2>
              <p className="mt-2 text-gray-700">{post.story}</p>
            </div>

            {/* Action buttons */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <button className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-md">
                <ThumbsUp className="mr-2" size={20} />
                <span>Applauds</span>
              </button>

              <button className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-md">
                <MessageCircle className="mr-2" size={20} />
                <span>Comment</span>
              </button>

              <button className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-md">
                <Heart className="mr-2" size={20} />
                <span>Appreciate</span>
              </button>
            </div>

            {/* Marketplace button */}
            <button className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-md mt-4">
              Move to Marketplace
            </button>
          </div>
        </div>
      ) : (
        <CreateContent
          type={type}
          setType={setType}
          isCreate={false}
          data={post}
          setEdit={setEdit}
        />
      )}
    </>
  );
};

export default PostDescription;
