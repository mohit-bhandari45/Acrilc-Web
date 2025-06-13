import React from 'react';

export default function Filters() {
  return (
    <div className="flex gap-2 mt-4">
      {['All Types', 'All Styles', 'Mood Board'].map((item) => (
        <button
          key={item}
          className="bg-[#FFB940] text-white text-sm font-semibold px-4 py-2 rounded-full"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
