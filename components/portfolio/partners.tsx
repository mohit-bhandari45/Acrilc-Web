import Image from "next/image";

interface Partnership {
  id: string;
  name: string;
  logo: string;
  date: string;
  rating: number;
}

interface PartnershipsProps {
  partnerships: Partnership[];
}

export const PartnershipsSection = ({ partnerships }: PartnershipsProps) => {
  return (
    <div className="w-[85%] lg:w-[90%] xl:w-[65%] mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-2 sm:text-3xl">Partnerships</h2>
      <p className="text-gray-600 mb-6 text-base sm:text-lg">Work with Brands</p>

      <div className="flex overflow-x-auto space-x-4 pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {partnerships.map((partner) => (
          <div
            key={partner.id}
            className="min-w-[150px] flex-shrink-0 snap-start transition-all hover:shadow-md"
          >
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {/* Logo */}
              <div className="h-32 w-full flex items-center justify-center p-4 bg-white">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                  width={100}
                  height={100}
                />
              </div>

              {/* Info */}
              <div className="bg-[#a08679] text-white p-3">
                <p className="font-medium text-sm sm:text-base">{partner.name}</p>
                <p className="text-xs sm:text-sm">{partner.date}</p>
                <div className="flex my-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xs sm:text-sm">
                      {i < partner.rating ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <button className="w-full mt-2 text-xs sm:text-sm bg-gray-300 text-gray-700 rounded py-1 hover:bg-gray-400 transition-colors">
                  See All
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};