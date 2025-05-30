"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "../universalcomps/logo";
import { useRouter } from "next/navigation";
import { IUser } from "@/types/types";
import { LogOut } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  id?: string;
  linksTo: string;
}

const navItems: NavItem[] = [
  { href: "#about", label: "About", linksTo: "/about" },
  { href: "#gallery", label: "Gallery", linksTo: "/profile" },
  { href: "#shop", label: "Marketplace", linksTo: "/profile" },
  { href: "#", label: "Explore", id: "exploreBtn", linksTo: "/explore" },
  { href: "#", label: "Blog", linksTo: "/profile" },
  { href: "#", label: "Collections", linksTo: "/profile" },
];

interface HeaderProps {
  currentUser: IUser;
  className?: string;
  onExploreClick?: () => void;
  show: boolean;
  portfolio: boolean;
}

export default function Header({
  className,
  onExploreClick,
  currentUser,
  show = true,
  portfolio = true,
}: HeaderProps) {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("#about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string, id?: string) => {
    if (id === "exploreBtn" && onExploreClick) {
      onExploreClick();
      return;
    }

    if (href.startsWith("#")) {
      setActiveLink(href);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-white/95 backdrop-blur-md border-b border-black/10",
        scrolled && "shadow-sm",
        className
      )}
    >
      <div className="flex justify-between items-center px-6 md:px-10 py-5">
        {/* Logo */}
        <Logo />

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {show &&
            navItems.map((item) => {
              const isActive = activeLink === item.href;
              const linkClasses = cn(
                "relative text-gray-600 font-normal transition-all duration-300",
                "hover:text-black hover:font-semibold",
                "after:absolute after:bottom-[-5px] after:left-0 after:right-0 after:h-0.5",
                "after:bg-black after:scale-x-0 hover:after:scale-x-100",
                "after:transition-transform after:duration-300",
                isActive && portfolio && "text-black font-semibold"
              );

              return portfolio ? (
                <Link
                  key={item.label}
                  href={item.href}
                  id={item.id}
                  onClick={() => handleNavClick(item.href, item.id)}
                  className={linkClasses}
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.label}
                  href={
                    item.linksTo === "/profile"
                      ? `${item.linksTo}/${currentUser.username}${
                          item.label.toLowerCase() !== "collections"
                            ? `?tab=${item.label.toLowerCase()}`
                            : ""
                        }`
                      : item.linksTo
                  }
                  id={item.id}
                  onClick={() => handleNavClick(item.href, item.id)}
                  className={linkClasses}
                >
                  {item.label}
                </Link>
              );
            })}
          {}

          <button
            onClick={handleLogOut}
            className="text-gray-500 cursor-pointer hover:text-black p-1"
          >
            <LogOut className="hover:text-red-600"/>
          </button>

          {/* Sign In Button */}
          <Link
            href={`/profile/${currentUser.username}`}
            className="flex items-center"
          >
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full overflow-hidden bg-black relative">
              {!currentUser.profilePicture ? (
                <Image
                  src="/assets/empty.png"
                  alt="Profile Avatar"
                  fill
                  className="object-cover"
                />
              ) : (
                <Image
                  src={currentUser.profilePicture}
                  alt="Profile"
                  fill
                  unoptimized
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/32";
                  }}
                />
              )}
            </div>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => {
            // Add mobile menu toggle logic here
            console.log("Mobile menu toggle");
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
    </header>
  );
}

// Optional: Mobile Navigation Component
interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeLink: string;
  onNavClick: (href: string, id?: string) => void;
}

export function MobileNav({
  isOpen,
  onClose,
  activeLink,
  onNavClick,
}: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <div className="fixed inset-0 bg-black/20" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-xl">
        <div className="flex items-center justify-between p-6 border-b">
          <span className="text-xl font-medium">Menu</span>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </Button>
        </div>
        <nav className="p-6 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              id={item.id}
              onClick={() => {
                onNavClick(item.href, item.id);
                onClose();
              }}
              className={cn(
                "block py-2 text-gray-600 hover:text-black transition-colors",
                activeLink === item.href && "text-black font-semibold"
              )}
            >
              {item.label}
            </Link>
          ))}
          <button
            // onClick={handleLogOut}
            className="text-gray-500 cursor-pointer hover:text-black p-1"
          >
            <Image src="/assets/exit.png" alt="exit" width={20} height={20} />
          </button>
          <Button asChild className="w-full mt-6">
            <Link href="/signin">Sign in</Link>
          </Button>
        </nav>
      </div>
    </div>
  );
}
