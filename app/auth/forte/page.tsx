"use client";

import api, { FORTE_URL } from "@/apis/api";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

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
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const toggleSelection = (forte: string) => {
    if (selected.includes(forte)) {
      setSelected((prev) => prev.filter((item) => item !== forte));
    } else if (selected.length < 5) {
      setSelected((prev) => [...prev, forte]);
    }
  };

  const handleUpload = async () => {
    const res = await api.post(FORTE_URL, { preferences: selected });

    if (res.status === 200) {
      router.push("/auth/profile-pic");
      toast.success("Forte Added");
    }else {
      toast.error("Try Again");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen flex flex-col justify-center items-center font-[Helvetica]">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8 text-center">
          Select Your Fortes (max 5)
        </h1>

        {/* Forte Selection Grid */}
        <div className="bg-[#FAFAFA] p-6 rounded-xl shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {PREFERENCE_ENUM.map((forte) => {
              const isSelected = selected.includes(forte);
              const isDisabled = selected.length >= 5 && !isSelected;
              return (
                <button
                  key={forte}
                  onClick={() => toggleSelection(forte)}
                  className={cn(
                    "rounded-xl border cursor-pointer text-sm px-4 py-3 font-medium text-center transition-all",
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
            {selected.length === 5
              ? "You've selected the maximum number of fortes."
              : `${5 - selected.length} selections remaining`}
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-12 flex justify-between items-center gap-5">
        <button
          className={cn(
            "bg-[#FF7A00] text-white font-semibold px-6 py-3 rounded-full transition cursor-pointer",
            selected.length === 0 && "opacity-50 cursor-not-allowed"
          )}
          disabled={selected.length === 0}
          onClick={handleUpload}
        >
          Next
        </button>
      </div>
    </div>
  );
}
