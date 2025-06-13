// components/home/FilterButtons.jsx
export default function FilterButtons() {
  return (
    <div className="flex space-x-2 mt-4">
      <button className="bg-yellow-300 text-black px-5 py-2 rounded-full text-sm font-medium">All Types ▼</button>
      <button className="bg-yellow-300 text-black px-5 py-2 rounded-full text-sm font-medium">All Styles ▼</button>
      <button className="bg-yellow-300 text-black px-5 py-2 rounded-full text-sm font-medium">Mood Board</button>
    </div>
  );
}
