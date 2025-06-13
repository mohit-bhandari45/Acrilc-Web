import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search  art, artists, collections"
        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FFB940] placeholder-white text-white font-medium"
      />
      <Search className="absolute left-3 top-3 text-white" size={20} />
    </div>
  );
}
