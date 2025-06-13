// components/home/BottomNav.jsx
import Link from 'next/link';
import { FaHome, FaCompass, FaPlus, FaEnvelope, FaUser } from 'react-icons/fa';

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-2">
      <Link href="/"><FaHome size={20} /></Link>
      <Link href="/discover"><FaCompass size={20} /></Link>
      <Link href="/post"><FaPlus size={20} /></Link>
      <Link href="/inbox"><FaEnvelope size={20} /></Link>
      <Link href="/profile"><FaUser size={20} /></Link>
    </div>
  );
}
