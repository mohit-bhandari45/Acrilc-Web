"use client";

import api, { GET_FEATURED_ARTISTS } from "@/apis/api";
import useHandleNavigation from "@/hooks/useHandleNavigation";
import { IUser } from "@/types/types";
import { useEffect, useState } from "react";

const FeaturedArtists = ({ user }: { user: IUser }) => {
  const handleNavigation = useHandleNavigation();
  const [artists, setArtists] = useState<IUser[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeaturedArists = async () => {
      const { data } = await api.get(GET_FEATURED_ARTISTS);
      const filteredArtists = data.data.filter(
        (artist: IUser) => artist._id !== user._id
      );
      setArtists(filteredArtists);
      setLoading(false);
    };
    getFeaturedArists();
  }, [user._id]);

  return (
    <section id="artists" className="py-16 px-8 max-w-7xl mx-auto">
      <h2 className="text-[2.5rem] font-bold text-center mb-12 text-gray-700">
        Featured Artists
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading
          ? [1, 2, 3, 4, 5, 6].map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[20px] shadow-lg overflow-hidden transform transition hover:-translate-y-2 duration-[0.3s] ease-in-out hover:shadow-2xl animate-pulse"
              >
                <div className="relative h-72 bg-gray-200"></div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                    <div className="h-6 bg-gray-200 rounded w-1/3" />
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-1" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))
          : artists?.reverse()?.map((a, idx) => (
              <div
                key={idx}
                onClick={()=> handleNavigation(`/profile/${a.username}`)}
                className="bg-white rounded-[20px] cursor-pointer shadow-lg overflow-hidden transform transition hover:-translate-y-2 duration-[0.3s] ease-in-out hover:shadow-2xl"
              >
                <div className="relative h-72">
                  {a.profilePicture ? (
                    <div className="w-full aspect-w-16 aspect-h-9 overflow-hidden">
                      <img
                        src={a.profilePicture}
                        alt={a.fullName}
                        className="absolute inset-0 object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="h-full bg-gradient-to-tr from-[#f093fb] to-[#f5576c]" />
                  )}
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2.5 rounded-full text-sm font-semibold">
                    {a.followers?.length} Followers
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    {a.profilePicture ? (
                      <img
                        src={a.profilePicture}
                        alt={a.fullName}
                        className="w-10 h-10 rounded-full border border-gray-200 shadow-sm object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#f093fb] to-[#f5576c]" />
                    )}
                    <h3 className="text-lg font-bold">{a.fullName}</h3>
                  </div>
                  <p className="text-blue-500 font-semibold mb-1">
                    {a.preferences?.[0]}
                  </p>
                  <p className="text-gray-500 text-sm">
                    📍 {a.location || "India"}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
};

export default FeaturedArtists;
