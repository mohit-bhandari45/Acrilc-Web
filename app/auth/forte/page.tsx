"use client";

import api, { FORTE_URL } from "@/apis/api";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";
import useProfileRedirect from "../useProfileRedirect";

const PREFERENCE_ENUM = [
  "Woolen Craft",
  "Poetry",
  "Exclusive",
  "Paintings",
  "Sculptures",
  "Wooden Crafts",
  "Textile Art",
  "Ceramics",
  "Jewelry Design",
  "Glass Art",
  "Metalwork",
  "Paper Crafts",
  "Mixed Media",
  "Photography",
  "Digital Art",
  "Calligraphy",
  "Printmaking",
  "Mosaic Art",
  "Leatherwork",
  "Pottery",
  "Fiber Art",
  "Illustration",
  "Installation Art",
];

export default function FortePage() {
  const { loader, setLoader } = useProfileRedirect();

  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const toggleSelection = (forte: string) => {
    if (selected.includes(forte)) {
      setSelected((prev) => prev.filter((item) => item !== forte));
    } else if (selected.length < 5) {
      setSelected((prev) => [...prev, forte]);
    }
  };

  const handleUpload = async () => {
    setLoading(true);

    try {
      const res = await api.post(FORTE_URL, { preferences: selected });

      if (res.status === 200) {
        toast.success("Forte Added");
        setLoader(true);
        router.push("/auth/profile-pic");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try Again!");
    } finally {
      setLoading(false);
    }
  };

  if (loader) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <HashLoader color="#FAA21B" size={200} />
      </div>
    );
  }

  if (!loader) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen flex flex-col justify-center items-center font-[Helvetica]">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold font-[Helvetica] text-gray-800 mb-8 text-center">
            Select Your Fortes (max 4)
          </h1>

          {/* Forte Selection Grid */}
          <div className="bg-[#FAFAFA] p-6 rounded-2xl shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {PREFERENCE_ENUM.map((forte) => {
                const isSelected = selected.includes(forte);
                const isDisabled = selected.length >= 4 && !isSelected;
                return (
                  <button
                    key={forte}
                    onClick={() => toggleSelection(forte)}
                    className={cn(
                      "rounded-2xl border cursor-pointer text-sm px-4 py-3 font-medium text-center transition-all",
                      isSelected
                        ? "bg-[#FFE9D6] text-[#FF7A00] border-[#FF7A00]"
                        : "bg-white text-gray-700 border-gray-300 hover:border-[#FF7A00]",
                      isDisabled && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={isDisabled}
                  >
                    {forte}
                  </button>
                );
              })}
            </div>
            {/* Helper Text */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              {selected.length === 4
                ? "You've selected the maximum number of fortes."
                : `${4 - selected.length} selections remaining`}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-12 flex justify-between items-center gap-5">
          <Button
            className={cn(
              "bg-[#FAA21B] hover:bg-[#fa921b] text-white font-semibold px-6 py-3 rounded-full transition cursor-pointer",
              selected.length === 0 && "opacity-50 cursor-not-allowed"
            )}
            disabled={selected.length === 0 || loading}
            onClick={handleUpload}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="pr-1">Adding...</div>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div>Add</div>
            )}
          </Button>
        </div>
      </div>
    );
  }
}
