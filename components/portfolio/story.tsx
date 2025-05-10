import { IUser } from "@/types/types";

export const StorySection = ({ user }: {user: IUser}) => {
  return (
    <div className="w-[65%] mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4">Story of the Artist</h2>
      <p className="text-lg text-gray-700">{user.story}</p>
    </div>
  );
};
