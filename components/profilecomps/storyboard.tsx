import api, { GET_STORYBOARD } from "@/apis/api";
import { useAppSelector } from "@/store/hooks";
import { IStoryBoard } from "@/types/story";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

const Storyboard = () => {
  const user = useAppSelector((state) => state.user.user)!;
  const [storyboard, setStoryboard] = useState<IStoryBoard[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await api.get(`${GET_STORYBOARD}/${user?._id}`);
      if (response.status === 200) {
        setStoryboard(response.data.data);
      }
    };

    getData();
  }, [user?._id]);

  if (storyboard && storyboard.length === 0) {
    return (
      <div className="h-32 w-full flex justify-center items-center">
        <HashLoader size={20} />
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Stories */}
      {storyboard && storyboard.map((story: IStoryBoard, idx) => {
        return (
          <div
            key={idx}
            className="lg:col-span-3 md:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex flex-col space-y-6">
              {/* Image Gallery */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {story.media &&
                  story.media.map((image, index) => (
                    <div
                      key={index}
                      className="relative rounded-md overflow-hidden w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
                    >
                      <Image
                        src={image.url}
                        alt={`${story.title} - image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {story.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Posted on: {new Date(story.createdAt).toLocaleString()}
                </p>

                <div className="space-y-4 prose prose-sm max-w-none">
                  {story.description}
                </div>

                {/* Interaction Buttons - Styled like in the image */}
                <div className="flex justify-center items-center space-x-6 pt-6 mt-6">
                  <button className="px-6 py-2 text-sm text-gray-600 hover:text-gray-900 bg-white rounded-full border border-gray-200 hover:border-gray-300 transition">
                    Applaud
                  </button>
                  <button className="px-6 py-2 text-sm text-gray-600 hover:text-gray-900 bg-white rounded-full border border-gray-200 hover:border-gray-300 transition">
                    Comment
                  </button>
                  <button className="px-6 py-2 text-sm text-gray-600 hover:text-gray-900 bg-white rounded-full border border-gray-200 hover:border-gray-300 transition">
                    Appreciate
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Create Card */}
      <Link href={{ pathname: "/content/create", query: { type: "post" } }}>
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
          <span className="font-medium text-sm text-center">
            Create Storyboard
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Storyboard;
