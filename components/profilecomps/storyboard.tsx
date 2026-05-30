import api, { GET_STORYBOARD } from "@/apis/api";
import { IStoryBoard, IUser } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
      <div className="flex h-40 w-full items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-[#ead7c9] border-t-[#834C3D] animate-spin" />
      </div>
    );
  }

  if (storyboard.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f5e2d8]">
          <svg className="h-8 w-8 text-[#834C3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        </div>
        <p className="text-base font-semibold text-[#3d2b1f]">No Storyboards Yet</p>
        {isSame ? (
          <>
            <p className="mt-1 text-sm text-[#9a8578]">Share your creative journey with a storyboard.</p>
            <Link
              href={{ pathname: "/content/create", query: { type: "storyboard" } }}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#8f5b42]/10 bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(131,76,61,0.22)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(131,76,61,0.30)]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Create Storyboard
            </Link>
          </>
        ) : (
          <p className="mt-1 text-sm text-[#9a8578]">This artist hasn&apos;t shared any storyboards yet.</p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {storyboard.map((story: IStoryBoard, idx) => (
        <div key={idx} className="bg-white rounded-xl border border-[#ead7c9]/60 shadow-sm p-4 sm:p-6">
          <div className="flex flex-col space-y-5">
            {story.media && story.media.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {story.media.map((image, index) => (
                  <div key={index} className="w-full aspect-square relative overflow-hidden rounded-lg">
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

            <div className="space-y-3 break-words">
              <h2 className="text-lg font-bold text-[#2e1f14]">{story.title}</h2>
              <p className="text-xs text-[#9a8578]">
                Posted on: {new Date(story.createdAt).toLocaleString()}
              </p>
              <div className="text-sm text-[#5e3c2f] leading-relaxed">{story.description}</div>

              <div className="flex flex-wrap items-center gap-3 pt-4 mt-4 border-t border-[#f0ddd0]">
                {["Applaud", "Comment", "Appreciate"].map((action) => (
                  <button
                    key={action}
                    className="px-4 py-1.5 text-sm font-medium text-[#834C3D] bg-white rounded-full border border-[#ead7c9] hover:border-[#c98d68] hover:bg-[#fff7f2] transition"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {isSame && (
        <Link href={{ pathname: "/content/create", query: { type: "storyboard" } }} className="block w-full sm:w-56">
          <div className="flex flex-col items-center justify-center h-40 rounded-xl border-2 border-dashed border-[#d4a98a] bg-[#fdf5ef] cursor-pointer transition-all duration-200 hover:border-[#834C3D] hover:bg-[#f5e2d8] hover:shadow-[0_4px_16px_rgba(131,76,61,0.12)] group">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#f0d5c4] group-hover:bg-[#e8c4aa] transition-colors">
              <svg className="h-5 w-5 text-[#834C3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-[#834C3D]">Create Storyboard</span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Storyboard;
