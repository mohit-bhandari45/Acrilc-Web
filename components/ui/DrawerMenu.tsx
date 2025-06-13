'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const DrawerMenu = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen(!open);

  return (
    <div className="relative z-50">
      <button onClick={toggleDrawer} className="p-2">
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Your Name</h2>
          <ul className="space-y-3">
            <li>
              <Link href="/profile" onClick={toggleDrawer}>Profile</Link>
            </li>
            <li>
              <Link href="/settings" onClick={toggleDrawer}>Settings</Link>
            </li>
            <li>
              <Link href="/support" onClick={toggleDrawer}>support</Link>
            </li>
            <li>
              <Link href="/dashboard" onClick={toggleDrawer}>Dashboard</Link>
            </li>
            <li>
              <Link href="/analytics" onClick={toggleDrawer}>Analytics</Link>
            </li>
            <li>
              <Link href="/discovery" onClick={toggleDrawer}>Discovery</Link>
            </li>
            <li>
              <Link href="/mood boards" onClick={toggleDrawer}>Mood Boards</Link>
            </li>
            <li>
              <Link href="/Cookie Jar" onClick={toggleDrawer}>Cookie Jar</Link>
            </li>
            <li>
              <Link href="/log out" onClick={toggleDrawer}>Log Out</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DrawerMenu;
