/* eslint-disable @typescript-eslint/no-explicit-any */
import api, { DELETE_POST, GET_POSTS } from "@/apis/api";
import { IPost, IUser } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type ShowcaseProps = {
  isSame: boolean;
  user: IUser;
};

const Showcase = ({ isSame, user }: ShowcaseProps) => {
  const router = useRouter();
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [imageHeights, setImageHeights] = useState<Record<string, number>>({});
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await api.get(`${GET_POSTS}/${user?._id}`);
      if (response.status === 200) {
        setPosts(response.data.data);
      }
    };
    getData();
  }, [user?._id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImageLoad = (postId: string, img: HTMLImageElement) => {
    const aspectRatio = img.naturalHeight / img.naturalWidth;
    const calculatedHeight = 300 * aspectRatio;
    setImageHeights((prev) => ({
      ...prev,
      [postId]: Math.max(200, Math.min(400, calculatedHeight)),
    }));
  };

  const handleDelete = async (id: string) => {
    const res = await api.delete(`${DELETE_POST}/${id}`);
    if (res.status === 200) {
      window.location.reload();
      toast.success("Post Deleted Successfully");
    }
  };

  // Loading
  if (!posts) {
    return (
      <div className="flex h-40 w-full items-center justify-center">
        <div className="relative flex items-center justify-center">
          <div className="h-10 w-10 rounded-full border-4 border-[#ead7c9] border-t-[#834C3D] animate-spin" />
        </div>
      </div>
    );
  }

  // Empty state
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f5e2d8]">
          <svg className="h-8 w-8 text-[#834C3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 19.5h18M3.75 4.5h16.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V5.25a.75.75 0 01.75-.75z" />
          </svg>
        </div>
        <p className="text-base font-semibold text-[#3d2b1f]">No Posts Yet</p>
        {isSame ? (
          <>
            <p className="mt-1 text-sm text-[#9a8578]">Share your first artwork with the world.</p>
            <Link
              href={{ pathname: "/content/create", query: { type: "post" } }}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#8f5b42]/10 bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(131,76,61,0.22)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(131,76,61,0.30)]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Create First Post
            </Link>
          </>
        ) : (
          <p className="mt-1 text-sm text-[#9a8578]">This artist hasn&apos;t posted anything yet.</p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
        style={{ columnFill: "balance" }}
      >
        {posts.map((item: any) => (
          <div
            key={item._id}
            className="relative break-inside-avoid mb-4 overflow-hidden bg-white rounded-xl shadow-sm border border-[#ead7c9]/60"
          >
            <Link href={`/content/${item._id}`} className="block w-full overflow-hidden">
              <div className="relative w-full" style={{ height: imageHeights[item._id] || 250 }}>
                <Image
                  src={item.media[0].url}
                  alt={`Artwork ${item._id}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  onLoad={(e) => handleImageLoad(item._id, e.target as HTMLImageElement)}
                />
              </div>
            </Link>

            {isSame && (
              <div className="absolute top-2 right-2 z-10">
                <button
                  onClick={() => setMenuOpen(menuOpen === item._id ? null : item._id)}
                  className="flex items-center justify-center w-8 h-8 bg-black/70 backdrop-blur-sm rounded-full text-white hover:bg-black/90 transition cursor-pointer"
                  aria-label="Post options"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" />
                  </svg>
                </button>

                {menuOpen === item._id && (
                  <div ref={menuRef} className="absolute right-0 mt-2 bg-white border border-[#ead7c9] rounded-xl shadow-[0_8px_24px_rgba(89,59,43,0.12)] w-36 z-30 overflow-hidden">
                    <button
                      className="w-full px-4 py-2.5 text-left text-sm text-[#3d2b1f] hover:bg-[#f5ede6] flex items-center gap-2 transition-colors"
                      onClick={() => router.push(`/content/edit/${item._id}?type=post`)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      className="w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-50 flex items-center gap-2 transition-colors"
                      onClick={() => handleDelete(item._id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {isSame && (
        <div className="mt-4">
          <Link href={{ pathname: "/content/create", query: { type: "post" } }} className="block w-full sm:w-56">
            <div className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-[#d4a98a] bg-[#fdf5ef] cursor-pointer transition-all duration-200 hover:border-[#834C3D] hover:bg-[#f5e2d8] hover:shadow-[0_4px_16px_rgba(131,76,61,0.12)] group">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#f0d5c4] group-hover:bg-[#e8c4aa] transition-colors">
                <svg className="h-5 w-5 text-[#834C3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-[#834C3D]">Create Post</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Showcase;
