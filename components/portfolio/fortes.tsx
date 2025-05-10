import { IUser } from "@/types/types";

interface ForteProps {
  user: IUser;
}

export const ForteSection = ({ user }: ForteProps) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:py-12">
      <h2 className="text-2xl font-bold mx-10 lg:mx-0 mb-6 sm:text-3xl lg:text-4xl">Forte</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mx-10 lg:mx-0 lg:grid-cols-3 lg:gap-6">
        {user.preferences!.map((skill, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-xl p-4 flex flex-col items-center text-center sm:items-start sm:text-left transition-all hover:bg-gray-200"
          >
            <h3 className="text-base font-medium sm:text-lg lg:text-xl">{skill}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};