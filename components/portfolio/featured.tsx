import api, { GET_POSTS } from "@/apis/api";
import { IPost, IUser } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export const FeaturedWorks = ({ user }: { user: IUser }) => {
  const [posts, setPosts] = useState<IPost[] | null>(null);

  useEffect(() => {
    const getPosts = async () => {
      const res = await api.get(`${GET_POSTS}/${user._id}`);

      if (res.status === 200) {
        setPosts(res.data.data);
      }
    };

    getPosts();
  }, [user._id]);

  if(!posts){
    return null;
  }
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:py-12">
      <h2 className="text-2xl font-bold mb-6 sm:text-3xl lg:text-4xl">
        Featured Works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
        {/* 1st item: large portrait */}
        <div className="row-span-2 col-span-1 sm:col-span-2 lg:col-span-2">
          <Image
            src={posts[0].media[0].url}
            alt={posts[0].title}
            className="w-full h-full object-cover rounded-xl transition-all hover:scale-[1.02]"
            width={800}
            height={600}
            priority
          />
        </div>

        {/* 2nd and 3rd images stacked */}
        <div className="flex flex-col gap-4">
          <Image
            src={posts[1].media[0].url}
            alt={posts[1].title}
            className="w-full h-full object-cover rounded-xl transition-all hover:scale-[1.02]"
            width={400}
            height={200}
          />
          <Image
            src={posts[2].media[0].url}
            alt={posts[2].title}
            className="w-full h-full object-cover rounded-xl transition-all hover:scale-[1.02]"
            width={400}
            height={200}
          />
        </div>

        {/* Bottom row: 3 items */}
        {posts && posts.slice(3).map((post) => (
          <Image
            key={post.media[0].url}
            src={post.media[0].url}
            alt={post.title}
            className="w-full h-full object-cover rounded-xl transition-all hover:scale-[1.02]"
            width={400}
            height={200}
          />
        ))}
      </div>
    </div>
  );
};
