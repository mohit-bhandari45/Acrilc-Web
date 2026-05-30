"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import MainLoader from "@/components/universalcomps/mainloader";
import { usePathname, useRouter } from "next/navigation";
import api from "@/apis/api";
import { clearUser } from "@/store/features/userSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";
import { Settings, LogOut, ArrowLeft, User, Lock } from "lucide-react";

const menuItems = [
  { label: "General", path: "/settings/general", icon: <User className="h-4 w-4" /> },
  { label: "Account & Privacy", path: "/settings/account", icon: <Lock className="h-4 w-4" /> },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const { user, loading } = useAppSelector((state) => state.userReducer);

  if (loading) return <MainLoader msg="Loading, please wait" />;
  if (loader) return <MainLoader msg="Logging Out" />;

  const handleLogOut = async () => {
    setLoader(true);
    try {
      await api.get(`/auth/logout`);
      dispatch(clearUser());
      localStorage.removeItem("profile-skip");
      localStorage.removeItem("username");
      toast.success("Logged out successfully");
      router.push("/");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  const initials = user?.fullName?.trim().split(/\s+/).filter(Boolean).slice(0, 2).map(n => n[0].toUpperCase()).join("") || "?";

  return (
    <div className="flex min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(226,114,91,0.10)_0%,_transparent_50%),linear-gradient(180deg,_#f5e8dc_0%,_#eedad0_60%,_#e5cfc0_100%)]">

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 flex-shrink-0 bg-[#fbf7f2] border-r border-[#e8d5c4]/70 h-screen sticky top-0 overflow-y-auto">
        {/* Header */}
        <div className="px-5 py-5 border-b border-[#e8d5c4]/70">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => router.back()}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e8d5c4] text-[#8a7060] hover:bg-[#f0ddd0] hover:text-[#5e3c2f] transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>
            <span className="font-poppins text-lg font-bold text-[#834C3D]">acrilc</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#f5e2d8] text-[#834C3D]">
              <Settings className="h-4 w-4" />
            </div>
            <h2 className="text-base font-bold text-[#2e1f14]">Settings</h2>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map(({ label, path, icon }) => {
            const isActive = pathname === path;
            return (
              <button
                key={path}
                onClick={() => router.push(path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer text-left
                  ${isActive
                    ? "bg-[#f5e2d8] text-[#834C3D] border-l-[3px] border-[#834C3D] pl-[9px]"
                    : "text-[#5e3c2f] hover:bg-[#f0ddd0]"
                  }`}
              >
                <span className={isActive ? "text-[#834C3D]" : "text-[#9a8578]"}>{icon}</span>
                {label}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-3 border-t border-[#e8d5c4]/70 space-y-0.5">
          <Link href={`/profile/${user?.username}`} className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-[#f0ddd0] transition-colors">
            <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-[#ead7c9]">
              {user?.profilePicture ? (
                <Avatar className="h-full w-full">
                  <AvatarImage src={user.profilePicture} alt={user.fullName} className="object-cover" />
                  <AvatarFallback className="bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] text-white text-xs font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] select-none">
                  <span className="text-xs font-bold text-white">{initials}</span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#2e1f14] truncate">{user?.fullName}</p>
              <p className="text-[11px] text-[#834C3D] truncate">@{user?.username}</p>
            </div>
          </Link>

          <button
            onClick={handleLogOut}
            className="w-full flex items-center gap-2 px-2 py-2 rounded-xl text-xs font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#fbf7f2]/95 backdrop-blur-md border-b border-[#e8d5c4]/70 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e8d5c4] text-[#8a7060] hover:bg-[#f0ddd0] cursor-pointer">
            <ArrowLeft className="h-3.5 w-3.5" />
          </button>
          <span className="text-base font-bold text-[#2e1f14]">Settings</span>
        </div>
        <div className="flex gap-1">
          {menuItems.map(({ label, path }) => (
            <button key={path} onClick={() => router.push(path)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${pathname === path ? "bg-[#f5e2d8] text-[#834C3D]" : "text-[#9a8578] hover:bg-[#f0ddd0]"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 min-w-0 md:py-8 py-20 px-4 sm:px-6 md:px-8">
        {children}
      </main>
    </div>
  );
}
