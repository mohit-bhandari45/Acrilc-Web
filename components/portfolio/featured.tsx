import Image from "next/image";

export const FeaturedWorks = () => {
  const works = [
    {
      id: "1",
      image: "/assets/homepageassets/cardimage1.png",
      title: "Woman with Cat",
    },
    {
      id: "2",
      image: "/assets/homepageassets/cardimage1.png",
      title: "Starry Night",
    },
    {
      id: "3",
      image: "/assets/homepageassets/cardimage1.png",
      title: "Room Interior",
    },
    {
      id: "4",
      image: "/assets/homepageassets/cardimage1.png",
      title: "Decorated Bottle",
    },
    {
      id: "5",
      image: "/assets/homepageassets/cardimage1.png",
      title: "Woman Portrait",
    },
    {
      id: "6",
      image: "/assets/homepageassets/cardimage1.png",
      title: "Traditional Art",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:py-12">
      <h2 className="text-2xl font-bold mb-6 sm:text-3xl lg:text-4xl mx-10 lg:mx-0">Featured Works</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
        {/* Large portrait on left for larger screens, full width on mobile */}
        <div className="sm:row-span-2 mx-10 lg:mx-0">
          <Image
            src={works[0]?.image || "/api/placeholder/400/600"}
            alt={works[0]?.title || "Featured artwork"}
            className="w-full h-full object-cover rounded-xl transition-all hover:scale-[1.02]"
            width={400}
            height={600}
            priority
          />
        </div>

        {/* Right column grid for larger screens, stacked on mobile */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 lg:grid-cols-2 mx-10 lg:mx-0">
          <Image
            src={works[1]?.image || "/api/placeholder/200/200"}
            alt={works[1]?.title || "Featured artwork"}
            className="w-full h-full object-cover rounded-xl transition-all hover:scale-[1.02]"
            width={200}
            height={200}
          />
          <Image
            src={works[2]?.image || "/api/placeholder/200/200"}
            alt={works[2]?.title || "Featured artwork"}
            className="w-full h-full object-cover rounded-xl transition-all hover:scale-[1.02]"
            width={200}
            height={200}
          />
        </div>

        {/* Additional works */}
        <div className="grid grid-cols-1 gap-4 sm:col-span-2 lg:grid-cols-3 mx-10 lg:mx-0">
          {works.slice(3).map((work) => (
            <Image
              key={work.id}
              src={work.image || "/api/placeholder/400/200"}
              alt={work.title || "Featured artwork"}
              className="w-full h-full object-cover rounded-xl transition-all hover:scale-[1.02]"
              width={400}
              height={200}
            />
          ))}
        </div>
      </div>
    </div>
  );
};