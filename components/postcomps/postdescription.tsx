"use client";

import api, { DELETE_POST, LIKE_POST } from "@/apis/api";
import { IPost, IUser } from "@/types/types";
import {
  Bookmark,
  Calendar,
  Edit2,
  Heart,
  MessageCircle,
  MoreVertical,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ShareOption from "../utils/Share";

const PostDescription = ({
  user,
  post,
  getData,
}: {
  user: IUser;
  post: IPost | null;
  getData: () => Promise<void>;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showFullStory, setShowFullStory] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const router = useRouter();

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleLike = async () => {
    const res = await api.get(`${LIKE_POST}/${post?._id}/applaud`);

    if (res.status === 200) {
      toast.success(res.data.msg);
      getData();
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleDelete = async (id: string) => {
    const res = await api.delete(`${DELETE_POST}/${id}`);

    if (res.status === 200) {
      router.push(`/profile/${user.username}`);
      toast.success("Post Deleted Successfully");
    }
  };

  if (!post || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading post...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Image Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div
                className="aspect-[4/3] relative group cursor-pointer"
                onClick={() => setIsImageModalOpen(true)}
              >
                <img
                  src={post.media[0].url}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Author Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={post.author.profilePicture}
                    alt={post.author.fullName}
                    onClick={() => setIsImageOpen(true)}
                    className="w-12 h-12 rounded-full object-cover hover:border-2 cursor-pointer"
                  />
                  <div>
                    <Link
                      href={`/profile/${post.author.username}`}
                      className="block"
                    >
                      <h3 className="font-semibold text-gray-900 origin-left hover:scale-105 transition-all duration-500 ease-in-out">
                        {post.author.fullName}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600">
                      @{post.author.username}
                    </p>
                  </div>
                </div>

                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <MoreVertical size={18} className="text-gray-600" />
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-30 border border-gray-200">
                      {user._id === post.author._id && (
                        <button
                          onClick={() => {
                            router.push(`/content/edit/${post._id}?type=post`);
                          }}
                          className="w-full cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left text-sm"
                        >
                          <Edit2 size={16} className="text-blue-600" />
                          <span>Edit Artwork</span>
                        </button>
                      )}

                      <ShareOption user={user} />

                      {user._id === post.author._id && (
                        <>
                          <hr className="my-2" />
                          <button
                            onClick={() => handleDelete(post._id)}
                            className="w-full cursor-pointer flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition-colors text-left text-sm text-red-600"
                          >
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={handleLike}
                  className={`flex flex-col items-center cursor-pointer justify-center p-3 rounded-lg transition-all ${
                    post.applauds.some((applaud) => applaud._id === user._id)
                      ? "bg-red-50 text-red-600 border border-red-200"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <Heart
                    size={18}
                    className={`mb-1 ${
                      post.applauds.some((applaud) => applaud._id === user._id)
                        ? "fill-current"
                        : ""
                    }`}
                  />
                  <span className="text-xs font-medium">
                    {post.applauds.length}
                  </span>
                </button>

                <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-700 transition-all">
                  <MessageCircle size={18} className="mb-1" />
                  <span className="text-xs font-medium">
                    {post.comments.length}
                  </span>
                </button>

                <button
                  onClick={handleBookmark}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
                    isBookmarked
                      ? "bg-yellow-50 text-yellow-600 border border-yellow-200"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <Bookmark
                    size={18}
                    className={`mb-1 ${isBookmarked ? "fill-current" : ""}`}
                  />
                  <span className="text-xs font-medium">Save</span>
                </button>
              </div>
            </div>

            {/* Artwork Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {post.title}
              </h1>
              <p className="text-gray-600 mb-4">{post.story.split(".")[0]}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar size={16} />
                    <span>Year</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>Dimensions</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {post.size}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.hashTags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#ffffff] text-[#ff8904] border-[0.5] hover:scale-105 cursor-pointer transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Marketplace Button */}
            {user._id === post.author._id && (
              <button className="w-full py-3 bg-[#ff8904] hover:bg-[#ff7575] cursor-pointer text-white font-semibold rounded-xl transition-colors">
                Move to Marketplace
              </button>
            )}
          </div>
        </div>

        {/* Story Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            Story Behind the Art
          </h2>
          <div className="prose prose-gray max-w-none">
            <p
              className={`text-gray-700 leading-relaxed ${
                !showFullStory && post.story.length > 300 ? "line-clamp-3" : ""
              }`}
            >
              {post.story}
            </p>
            {post.story.length > 300 && (
              <button
                onClick={() => setShowFullStory(!showFullStory)}
                className="mt-3 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
              >
                {showFullStory ? "Show less" : "Read more..."}
              </button>
            )}
          </div>
        </div>
      </div>

      {isImageOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center"
          onClick={() => setIsImageOpen(false)}
        >
          <div
            className="relative p-4 rounded-xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={post.author.profilePicture}
              alt={post.title}
              className="w-80 h-80 object-cover rounded-full"
            />
          </div>
        </div>
      )}

      {/* Full-screen image modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full">
            <img
              src={post.media[0].url}
              alt={post.title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition-all duration-200"
            >
              <X size={24} className="text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDescription;
