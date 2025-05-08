import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

type PortfolioItem = {
  id: string;
  title: string;
  image: string;
  category: string;
};

interface PortfolioProps {
  portfolioItems?: PortfolioItem[];
}

export default function PersonalPort({
  portfolioItems = [
    { id: "1", title: "Golden Tree", image: "/api/placeholder/400/400", category: "Texture Wall Painting" },
    { id: "2", title: "Blue Vases", image: "/api/placeholder/400/400", category: "Ceramic Art" },
    { id: "3", title: "Woman Portrait", image: "/api/placeholder/400/400", category: "Realism Art" },
    { id: "4", title: "Ocean Breeze", image: "/api/placeholder/400/400", category: "Abstract Art" },
    { id: "5", title: "Mountain View", image: "/api/placeholder/400/400", category: "Landscape Painting" },
    { id: "6", title: "Still Life", image: "/api/placeholder/400/400", category: "Classic Art" }
  ]
}: PortfolioProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);
  console.log(expandedCategories);

  const categories = [...new Set(portfolioItems.map(item => item.category))];
  const visibleCategories = showAll ? categories : categories.slice(0, 3);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleShowAll = () => {
    setShowAll(prev => !prev);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-6 mt-15">Portfolio</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition duration-1000 ease-in-out">
          {visibleCategories.map(category => {  
            const item = portfolioItems.find(item => item.category === category);
            return (
              <div key={category} className="flex flex-col">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <Image
                      src={item!.image!}
                      alt={category}
                      width={100}
                      height={100}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-medium">{category}</h3>
                      <Button
                        variant="ghost"
                        className="w-full mt-2 text-orange-400 hover:text-orange-500 hover:bg-orange-50"
                        onClick={() => toggleCategory(category)}
                      >
                        See All
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Toggle See More / See Less */}
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="border-orange-400 cursor-pointer text-orange-400 hover:bg-orange-50 px-8"
            onClick={toggleShowAll}
          >
            {showAll ? "See Less" : "See More"}
          </Button>
        </div>
      </div>
    </div>
  );
}
