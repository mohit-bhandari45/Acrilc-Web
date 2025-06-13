import React from 'react';
import { Home, Search, Plus, Inbox, User } from 'lucide-react';

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-2 flex justify-between text-xs">
      <div className="flex flex-col items-center text-[#FFB940]"><Home size={20} /><span>Home</span></div>
      <div className="flex flex-col items-center"><Search size={20} /><span>Discover</span></div>
      <div className="flex flex-col items-center"><Plus size={20} /><span>Post</span></div>
      <div className="flex flex-col items-center"><Inbox size={20} /><span>Inbox</span></div>
      <div className="flex flex-col items-center"><User size={20} /><span>Me</span></div>
    </div>
  );
}
