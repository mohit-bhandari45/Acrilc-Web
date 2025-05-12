/* eslint-disable @typescript-eslint/no-explicit-any */
import api, { GET_POSTS } from "@/apis/api";
import { IPost, IUser } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HashLoader } from "react-spinners";

type ShowcaseProps = {
  isSame: boolean;
  user: IUser;
};

const Showcase = ({ isSame, user }: ShowcaseProps) => {
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
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

  const handleEdit = (postId: string) => {
    console.log("Edit", postId);
    setMenuOpen(null);
  };

  const handleDelete = (postId: string) => {
    console.log("Delete", postId);
    setMenuOpen(null);
  };

  if (!posts) {
    return (
      <div className="h-32 w-full flex justify-center items-center">
        <HashLoader size={20} />
      </div>
    );
  }

  return (
    <>
      <div className={`columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4`}>
        {posts.map((item: any) => (
          <div
            key={item._id}
            className="break-inside-avoid rounded-xl overflow-hidden w-full relative"
          >
            <Link
              href={`/content/${item._id}`}
              className="block w-full overflow-hidden"
            >
              <Image
                src={item.media[0].url}
                alt={`Artwork ${item.id}`}
                width={600}
                height={400}
                className="w-full h-auto object-contain rounded-xl"
              />
            </Link>

            {isSame && (
              <div className="absolute bottom-2 right-2 z-10">
                <button
                  onClick={() =>
                    setMenuOpen(menuOpen === item._id ? null : item._id)
                  }
                  className="text-gray-600 rotate-90 hover:text-black px-2 cursor-pointer text-3xl font-bold"
                >
                  &#8942;
                </button>

                {menuOpen === item._id && (
                  <div
                    ref={menuRef}
                    className="absolute right-0 mt-2 bg-white border rounded shadow-md w-32 z-30"
                  >
                    <button
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      onClick={() => handleEdit(item._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Create Post Button as part of Masonry layout */}
        {posts.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 w-full bg-muted/50 text-muted-foreground rounded-xl border border-dashed p-6">
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
              <p className="text-sm text-muted-foreground">
                Start by creating your first post to get going.
              </p>
            )}
          </div>
        )}
        {isSame && (
          <Link
            href={{ pathname: "/content/create", query: { type: "post" } }}
            className="break-inside-avoid flex flex-col mt-2 items-center justify-center w-full aspect-[4/3] bg-gray-200 rounded-xl cursor-pointer hover:bg-gray-300 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            <span className="font-medium text-sm text-center">Create Post</span>
          </Link>
        )}
      </div>
    </>
  );
};

export default Showcase;
