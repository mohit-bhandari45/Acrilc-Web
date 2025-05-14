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
    <div className="w-full">
      {/* Stories */}
      {storyboard &&
        storyboard.map((story: IStoryBoard, idx) => {
          return (
            <div
              key={idx}
              className="mb-8 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex flex-col space-y-6">
                {/* Image Gallery - Made responsive with grid */}
                {story.media && story.media.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {story.media.map((image, index) => (
                      <div
                        key={index}
                        className="w-full h-auto aspect-square relative overflow-hidden rounded-lg"
                      >
                        <Image
                          src={image.url}
                          alt={`${story.title} - image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Content */}
                <div className="space-y-4 break-words">
                  <h2 className="text-xl font-bold text-gray-800">
                    {story.title}
                  </h2>
                  <p className="text-sm text-gray-500 break-words">
                    Posted on: {new Date(story.createdAt).toLocaleString()}
                  </p>

                  <div className="space-y-4 prose prose-sm max-w-none">
                    {story.description}
                  </div>

                  {/* Interaction Buttons - Made responsive */}
                  <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 pt-6 mt-6">
                    <button className="px-4 sm:px-6 py-2 text-sm text-gray-600 hover:text-gray-900 bg-white rounded-full border border-gray-200 hover:border-gray-300 transition">
                      Applaud
                    </button>
                    <button className="px-4 sm:px-6 py-2 text-sm text-gray-600 hover:text-gray-900 bg-white rounded-full border border-gray-200 hover:border-gray-300 transition">
                      Comment
                    </button>
                    <button className="px-4 sm:px-6 py-2 text-sm text-gray-600 hover:text-gray-900 bg-white rounded-full border border-gray-200 hover:border-gray-300 transition">
                      Appreciate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Empty state - Full width on mobile */}
        {storyboard.length === 0 && (
          <div className="col-span-1 sm:col-span-2 md:col-span-3 flex flex-col items-center justify-center h-64 bg-muted/50 text-muted-foreground rounded-xl border border-dashed p-6">
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
              <p className="text-center text-sm text-muted-foreground">
                Start by creating your first storyboard to get going.
              </p>
            )}
          </div>
        )}

        {/* Create Card - Respects the grid */}
        {isSame && (
          <div className="col-span-1">
            <Link
              href={{
                pathname: "/content/create",
                query: { type: "storyboard" },
              }}
              className="block w-full"
            >
              <div className="flex flex-col items-center justify-center h-48 sm:h-64 bg-gray-200 rounded-xl cursor-pointer hover:bg-gray-300 transition">
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="font-medium text-sm text-center px-4">
                  Create Storyboard
                </span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Storyboard;
