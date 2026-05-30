"use client";

import api, { DELETE_POST, LIKE_POST } from "@/apis/api";
import { IPost, IUser } from "@/types/types";
import { Calendar, Edit2, Heart, MessageCircle, MoreVertical, Bookmark, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ShareOption from "../utils/Share";

const PostDescription = ({ user, post, getData }: { user: IUser; post: IPost | null; getData: () => Promise<void> }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showFullStory, setShowFullStory] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleLike = async () => {
    const res = await api.get(`${LIKE_POST}/${post?._id}/applaud`);
    if (res.status === 200) { toast.success(res.data.msg); getData(); }
  };

  const handleDelete = async (id: string) => {
    const res = await api.delete(`${DELETE_POST}/${id}`);
    if (res.status === 200) { router.push(`/profile/${user.username}`); toast.success("Post Deleted"); }
  };

  if (!post || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 rounded-full border-4 border-[#ead7c9] border-t-[#834C3D] animate-spin" />
      </div>
    );
  }

  const isLiked = post.applauds.some(a => a._id === user._id);
  const isOwner = user._id === post.author._id;

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Image */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm overflow-hidden">
              <div className="aspect-[4/3] relative group cursor-pointer" onClick={() => setIsImageModalOpen(true)}>
                <img src={post.media[0].url} alt={post.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">

            {/* Author */}
            <div className="bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-[#ead7c9] cursor-pointer" onClick={() => setIsImageOpen(true)}>
                    {post.author.profilePicture ? (
                      <img src={post.author.profilePicture} alt={post.author.fullName} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)]">
                        <span className="text-xs font-bold text-white select-none">
                          {post.author.fullName?.trim().split(/\s+/).slice(0, 2).map(n => n[0].toUpperCase()).join("")}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <Link href={`/profile/${post.author.username}`} className="font-semibold text-[#2e1f14] text-sm hover:text-[#834C3D] transition-colors block">
                      {post.author.fullName}
                    </Link>
                    <p className="text-xs text-[#9a8578]">@{post.author.username}</p>
                  </div>
                </div>

                <div className="relative" ref={menuRef}>
                  <button onClick={() => setMenuOpen(!menuOpen)} className="p-1.5 rounded-lg hover:bg-[#f5ede6] transition-colors cursor-pointer">
                    <MoreVertical size={16} className="text-[#9a8578]" />
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-[0_8px_24px_rgba(89,59,43,0.12)] border border-[#e8d5c4] z-30 overflow-hidden py-1">
                      {isOwner && (
                        <button onClick={() => router.push(`/content/edit/${post._id}?type=post`)}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#f5ede6] transition-colors text-sm text-[#5e3c2f] cursor-pointer">
                          <Edit2 size={14} className="text-[#834C3D]" /> Edit Artwork
                        </button>
                      )}
                      <ShareOption user={user} />
                      {isOwner && (
                        <>
                          <hr className="my-1 border-[#f0ddd0]" />
                          <button onClick={() => handleDelete(post._id)}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-red-50 transition-colors text-sm text-red-500 cursor-pointer">
                            <Trash2 size={14} /> Delete
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-3 gap-2">
                <button onClick={handleLike}
                  className={`flex flex-col items-center justify-center py-2.5 rounded-xl transition-all cursor-pointer border text-xs font-medium gap-1
                    ${isLiked ? "bg-[#f5e2d8] text-[#834C3D] border-[#834C3D]/25" : "bg-white text-[#5e3c2f] border-[#ead7c9] hover:bg-[#f5e2d8] hover:border-[#c98d68]"}`}>
                  <Heart size={16} className={isLiked ? "fill-current" : ""} />
                  {post.applauds.length}
                </button>
                <button className="flex flex-col items-center justify-center py-2.5 rounded-xl bg-white text-[#5e3c2f] border border-[#ead7c9] hover:bg-[#f5e2d8] hover:border-[#c98d68] transition-all text-xs font-medium gap-1 cursor-pointer">
                  <MessageCircle size={16} />
                  {post.comments.length}
                </button>
                <button onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`flex flex-col items-center justify-center py-2.5 rounded-xl transition-all cursor-pointer border text-xs font-medium gap-1
                    ${isBookmarked ? "bg-[#f5e2d8] text-[#834C3D] border-[#834C3D]/25" : "bg-white text-[#5e3c2f] border-[#ead7c9] hover:bg-[#f5e2d8] hover:border-[#c98d68]"}`}>
                  <Bookmark size={16} className={isBookmarked ? "fill-current" : ""} />
                  Save
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm p-5">
              <h1 className="text-xl font-bold text-[#2e1f14] mb-2">{post.title}</h1>
              {post.story && <p className="text-sm text-[#7a5a49] mb-4 leading-relaxed">{post.story.split(".")[0]}.</p>}
              <div className="space-y-0">
                <div className="flex items-center justify-between py-2 border-b border-[#f0ddd0]">
                  <div className="flex items-center gap-2 text-xs text-[#9a8578]">
                    <Calendar size={13} /><span>Posted</span>
                  </div>
                  <span className="text-xs font-medium text-[#5e3c2f]">
                    {new Date(post.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "long" })}
                  </span>
                </div>
                {post.size && (
                  <div className="flex items-center justify-between py-2">
                    <span className="text-xs text-[#9a8578]">Dimensions</span>
                    <span className="text-xs font-medium text-[#5e3c2f]">{post.size}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {post.hashTags.length > 0 && (
              <div className="bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm p-5">
                <h3 className="text-sm font-semibold text-[#765240] mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.hashTags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center rounded-full bg-[#f5e2d8] border border-[#834C3D]/25 px-3 py-1 text-xs font-semibold text-[#834C3D] hover:-translate-y-0.5 transition-transform cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Move to marketplace */}
            {isOwner && (
              <button className="w-full h-11 rounded-full border border-[#8f5b42]/10 bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] text-sm font-semibold text-white shadow-[0_8px_20px_rgba(131,76,61,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(131,76,61,0.32)] cursor-pointer">
                Move to Marketplace →
              </button>
            )}
          </div>
        </div>

        {/* Full story */}
        {post.story && (
          <div className="mt-6 bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#2e1f14] mb-4">Story Behind the Art</h2>
            <p className={`text-[#5e3c2f] text-sm leading-relaxed ${!showFullStory && post.story.length > 300 ? "line-clamp-3" : ""}`}>
              {post.story}
            </p>
            {post.story.length > 300 && (
              <button onClick={() => setShowFullStory(!showFullStory)}
                className="mt-3 text-sm font-medium text-[#834C3D] hover:text-[#5e3c2f] transition-colors cursor-pointer">
                {showFullStory ? "Show less" : "Read more →"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Author pic lightbox */}
      {isImageOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center" onClick={() => setIsImageOpen(false)}>
          <div className="relative p-4" onClick={e => e.stopPropagation()}>
            <img src={post.author.profilePicture} alt={post.author.fullName} className="w-72 h-72 object-cover rounded-full shadow-2xl" />
          </div>
        </div>
      )}

      {/* Full-screen image lightbox */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={() => setIsImageModalOpen(false)}>
          <img src={post.media[0].url} alt={post.title} className="max-w-full max-h-full object-contain rounded-lg" />
          <button onClick={() => setIsImageModalOpen(false)} className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition cursor-pointer">
            <X size={22} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PostDescription;
