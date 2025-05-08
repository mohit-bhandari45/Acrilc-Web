import { IUser } from "@/store/types";

interface ForteProps {
  user: IUser
}

export const ForteSection = ({ user }: ForteProps) => {
  return (
    <div className="w-[65%] mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">Forte</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {user.preferences!.map((skill, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg p-4 flex flex-col items-center sm:items-start"
          >
            {/* <div className="mb-2">{skill.icon}</div> */}
            <h3 className="text-lg font-medium">{skill}</h3>
            {/* <p className="text-sm text-gray-500">Skill Level: {skill.level}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};
