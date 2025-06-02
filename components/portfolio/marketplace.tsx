import api, { GET_ALL_Market_PROJECT } from "@/apis/api";
import { Button } from "@/components/ui/button";
import { IMarketplace } from "@/types/marketplace";
import { IUser } from "@/types/types";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const ShopSection = ({ user }: { user: IUser }) => {
  const [projects, setProjects] = useState<IMarketplace[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getMarket() {
      const res = await api.get(
        `${GET_ALL_Market_PROJECT}/${user._id}/featured-market`
      );
      setProjects(res.data.data);
    }

    getMarket();
  }, [user._id]);

  const getGradientClass = (image: string) => {
    const gradients = {
      bowl: "from-orange-50 to-orange-100",
      vase: "from-blue-50 to-blue-100",
      teapot: "from-purple-50 to-purple-100",
      platter: "from-green-50 to-green-100",
      mug: "from-yellow-50 to-yellow-100",
      sculpture: "from-indigo-50 to-indigo-100",
    };
    return (
      gradients[image as keyof typeof gradients] || "from-gray-50 to-gray-100"
    );
  };

  if(!projects) return null;

  return (
    <section id="shop" className="min-h-screen px-10 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-playfair text-4xl text-center mb-5">Shop</h2>
        <p className="text-gray-600 text-center mb-10">
          Available pieces from my studio. Each piece is unique and handcrafted
          with care.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`aspect-square bg-gradient-to-br ${getGradientClass(
                  "mug"
                )} relative flex items-center justify-center`}
              >
                <div className="text-4xl">🏺</div>
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5">
                <h3 className="font-semibold mb-1">{project.title}</h3>
                <div className="text-lg font-semibold mb-2">
                  ₹{project.pricingOptions.sizesAndPrices[0].price}
                </div>

                <div className="flex gap-2 mb-4">
                  {project.forte}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                  >
                    Contact Me
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 text-xs text-white bg-black hover:bg-gray-800"
                    onClick={() => {
                      router.push(`/marketplace/${project._id}`);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" className="rounded-full px-6 py-3">
            Show More
          </Button>
        </div>
      </div>
    </section>
  );
};
