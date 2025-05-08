/* eslint-disable @typescript-eslint/no-explicit-any */
import api, { GET_POSTS } from "@/apis/api";
import { useAppSelector } from "@/store/hooks";
import IPost from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

const Showcase = () => {
  const user = useAppSelector((state) => state.user.user)!;
  const [posts, setPosts] = useState<IPost[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await api.get(`${GET_POSTS}/${user?._id}`);

      if (response.status === 200) {
        setPosts(response.data.data);
      }
    };

    getData();
  }, [user?._id]);

  if (!posts) {
    return (
      <div className="h-32 w-full flex justify-center items-center">
        <HashLoader size={20} />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4">
        {posts.map((item: any) => (
          <div
            key={item._id}
            className="relative w-[calc(100%-1rem)] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] overflow-hidden rounded-xl"
          >
            <Link href={`/content/${item._id}`}>
              <Image
                src={item.media[0].url}
                alt={`Artwork ${item.id}`}
                width={400}
                height={500}
                className="w-full rounded-xl object-cover"
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Create Post Button */}
        <Link href={{ pathname: "/content/create", query: { type: "post" } }} className="flex flex-col mt-6 items-center justify-center w-72 sm:w-64 aspect-[4/3] bg-gray-200 rounded-xl cursor-pointer hover:bg-gray-300 transition">
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
    </>
  );
};

export default Showcase;
