import api, { GET_POST } from "@/apis/api";
import { useAppSelector } from "@/store/hooks";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Showcase = () => {
  const user = useAppSelector((state) => state.user.user);
  const [posts, setPosts] = useState([]);

  const getData = async () => {
    console.log(user);
    const response = await api.get(`${GET_POST}/${user?._id}`);

    if (response.status === 200) {
      setPosts(response.data.data);
    }

    console.log(posts);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {posts.map((item: any) => (
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
      {/* Create Post Button */}
      <Link href={"/post/create"}>
        <div className="flex flex-col mt-6 items-center justify-center w-72 sm:w-64 aspect-[4/3] bg-gray-200 rounded-xl cursor-pointer hover:bg-gray-300 transition">
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
        </div>
      </Link>
    </>
  );
};

export default Showcase;
