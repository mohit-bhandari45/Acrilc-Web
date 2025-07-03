/* eslint-disable @typescript-eslint/no-explicit-any */
import api, { DELETE_POST, GET_POSTS } from "@/apis/api";
import { IPost, IUser } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";

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

  // Handle image load to get natural dimensions for masonry
  const handleImageLoad = (postId: string, img: HTMLImageElement) => {
    const aspectRatio = img.naturalHeight / img.naturalWidth;
    const baseWidth = 300; // Base width for calculation
    const calculatedHeight = baseWidth * aspectRatio;

    setImageHeights((prev) => ({
      ...prev,
      [postId]: Math.max(200, Math.min(400, calculatedHeight)), // Min 200px, max 400px
    }));
  };

  const handleDelete = async (id: string) => {
    const res = await api.delete(`${DELETE_POST}/${id}`);

    if (res.status === 200) {
      window.location.reload();
      toast.success("Post Deleted Successfully");
    }
  };

  if (!posts) {
    return (
      <div className="h-32 w-full flex justify-center items-center">
        <HashLoader size={20} />
      </div>
    );
  }

  return (
    <div className="w-full">
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 w-full bg-muted/50 text-muted-foreground rounded-xl border border-dashed p-6 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 mb-4 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-lg font-medium">No Posts Yet!</p>
          {isSame && (
            <p className="text-center text-sm text-muted-foreground">
              Start by creating your first post to get going.
            </p>
          )}
        </div>
      ) : (
        <div
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
          style={{ columnFill: "balance" }}
        >
          {posts.map((item: any) => (
            <div
              key={item._id}
              className="relative break-inside-avoid mb-4 overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <Link
                href={`/content/${item._id}`}
                className="block w-full overflow-hidden"
              >
                <div
                  className="relative w-full"
                  style={{
                    height: imageHeights[item._id] || 250,
                  }}
                >
                  <Image
                    src={item.media[0].url}
                    alt={`Artwork ${item._id}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    onLoad={(e) =>
                      handleImageLoad(item._id, e.target as HTMLImageElement)
                    }
                  />
                </div>
              </Link>

              {isSame && (
                <div className="absolute top-2 right-2 z-10">
                  <button
                    onClick={() =>
                      setMenuOpen(menuOpen === item._id ? null : item._id)
                    }
                    className="flex items-center justify-center w-8 h-8 bg-black/80 backdrop-blur-sm rounded-full text-white hover:text-white hover:bg-black/90 transition cursor-pointer"
                    aria-label="Post options"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </button>

                  {menuOpen === item._id && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-36 z-30 overflow-hidden"
                    >
                      <button
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                        onClick={() => {
                          router.push(`/content/edit/${item._id}?type=post`);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100 flex items-center gap-2"
                        onClick={() => handleDelete(item._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
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
      )}

      {/* Create Post Button */}
      {isSame && (
        <div className="mt-6">
          <Link
            href={{ pathname: "/content/create", query: { type: "post" } }}
            className="block w-full sm:w-64"
          >
            <div className="flex flex-col items-center justify-center aspect-square bg-gray-200 rounded-xl cursor-pointer hover:bg-gray-300 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mb-3 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="font-medium text-gray-700">Create Post</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Showcase;
