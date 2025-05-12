import api, { GET_STORYBOARD } from "@/apis/api";
import { IStoryBoard, IUser } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

type StoryboardProps = {
  isSame: boolean;
  user: IUser;
};

const Storyboard = ({ isSame, user }: StoryboardProps) => {
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

  if (!storyboard) {
    return (
      <div className="h-32 w-full flex justify-center items-center">
        <HashLoader size={20} />
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Stories */}
      {storyboard &&
        storyboard.map((story: IStoryBoard, idx) => {
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
                      <Image
                        key={index}
                        src={image.url}
                        alt={`${story.title} - image ${index + 1}`}
                        width={250}
                        height={10}
                      />
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
      {storyboard.length === 0 && (
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
          <p className="text-lg font-medium">No Storyboards Yet!</p>
          {isSame && (
            <p className="text-sm text-muted-foreground">
              Start by creating your first storyboard to get going.
            </p>
          )}
        </div>
      )}

      {/* Create Card */}
      {isSame && (
        <Link
          href={{ pathname: "/content/create", query: { type: "storyboard" } }}
        >
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
      )}
    </div>
  );
};

export default Storyboard;
