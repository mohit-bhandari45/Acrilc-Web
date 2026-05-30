"use client";

import api, { GET_ALL_Market_PROJECT } from "@/apis/api";
import { IMarketplace } from "@/types/marketplace";
import { IUser } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const ShopSection = ({ user }: { user: IUser }) => {
  const [projects, setProjects] = useState<IMarketplace[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getMarket() {
      const res = await api.get(`${GET_ALL_Market_PROJECT}/${user._id}/featured-market`);
      setProjects(res.data.data);
    }
    getMarket();
  }, [user._id]);

  if (!projects) return null;
  if (projects.length === 0) return null;

  return (
    <section id="shop" className="py-24 px-6 lg:px-16 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium mb-4">Available Works</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-normal text-gray-900 mb-5">Shop</h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Original pieces available for purchase. Each work is unique and crafted with care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project._id}
              className="group cursor-pointer"
              onClick={() => router.push(`/marketplace/${project._id}`)}
            >
              {/* Image / placeholder */}
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4 relative flex items-center justify-center">
                {project.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="text-5xl select-none">🏺</span>
                )}
              </div>

              {/* Info */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-medium text-gray-900 text-base leading-snug">{project.title}</h3>
                  <p className="font-semibold text-gray-900 text-base flex-shrink-0">
                    ₹{project.pricingOptions.sizesAndPrices[0].price}
                  </p>
                </div>
                {project.forte && (
                  <p className="text-xs text-gray-400 mb-3">{project.forte}</p>
                )}
                <button
                  onClick={e => { e.stopPropagation(); router.push(`/marketplace/${project._id}`); }}
                  className="w-full py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-300 cursor-pointer"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
