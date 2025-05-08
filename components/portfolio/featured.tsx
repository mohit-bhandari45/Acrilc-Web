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
      <div className="w-[65%] mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">Featured Works</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Left Column - Large portrait */}
          <div className="row-span-2">
            <Image
              src={works[0]?.image || "/api/placeholder/400/600"} 
              alt={works[0]?.title || "Featured artwork"} 
              className="w-full h-full object-cover rounded-lg"
              width={100}
              height={100}
            />
          </div>
          
          {/* Right Column - Top Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Image 
              src={works[1]?.image || "/api/placeholder/200/200"} 
              alt={works[1]?.title || "Featured artwork"} 
              className="w-full h-full object-cover rounded-lg"
              width={100}
              height={100}
            />
            <Image 
              src={works[2]?.image || "/api/placeholder/200/200"} 
              alt={works[2]?.title || "Featured artwork"} 
              className="w-full h-full object-cover rounded-lg"
              width={100}
              height={100}
            />
          </div>
          
          {/* Right Column - Bottom Grid */}
          <div className="grid grid-cols-1 gap-4">
            <Image 
              src={works[3]?.image || "/api/placeholder/400/200"} 
              alt={works[3]?.title || "Featured artwork"} 
              className="w-full h-full object-cover rounded-lg"
              width={100}
              height={100}
            />
          </div>
          
          {/* Bottom Row */}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            <Image 
              src={works[4]?.image || "/api/placeholder/400/200"} 
              alt={works[4]?.title || "Featured artwork"} 
              className="w-full h-full object-cover rounded-lg"
              width={100}
              height={100}
            />
            <Image 
              src={works[5]?.image || "/api/placeholder/400/200"} 
              alt={works[5]?.title || "Featured artwork"} 
              className="w-full h-full object-cover rounded-lg"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    );
  };
  