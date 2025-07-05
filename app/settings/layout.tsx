"use client";

import { Button } from "@/components/ui/button";
import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import MainLoader from "@/components/universalcomps/mainloader";
import { usePathname, useRouter } from "next/navigation";
import api from "@/apis/api";
import { clearUser } from "@/store/features/userSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  const menuItems = [
    {
      label: "General",
      path: "/settings/general",
    },
    {
      label: "Account & Privacy",
      path: "/settings/account",
    },
  ];

  return (
    <SidebarProvider className="w-full">
      <Sidebar className="min-w-[220px] border-r bg-white dark:bg-gray-950 dark:border-gray-800">
        <SidebarHeader className="px-6 py-4">
          <h3 className="text-xl font-bold">Settings</h3>
        </SidebarHeader>

        <SidebarContent className="px-4 space-y-2">
          {menuItems.map(({ label, path }) => {
            const isActive = pathname === path;
            return (
              <SidebarGroup key={path}>
                <Button
                  variant="ghost"
                  className={`w-full text-left cursor-pointer justify-start px-4 py-2 rounded-md transition-all duration-300
                    ${isActive
                      ? "bg-yellow-100 text-yellow-800 font-semibold border-l-4 border-yellow-500 hover:bg-amber-100"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  onClick={() => {
                    if (!isActive) {
                        router.push(path);
                    }}}
                >
                  {label}
                </Button>
              </SidebarGroup>
            );
          })}
        </SidebarContent>

        <SidebarFooter className="p-4 border-t dark:border-gray-800 flex flex-col gap-3">
          <Link
            href={`/profile/${user?.username}`}
            className="flex items-center gap-3"
          >
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={user?.profilePicture}
                alt={user?.fullName}
                className="object-cover"
              />
              <AvatarFallback className="bg-gray-300 text-gray-600 font-semibold">
                {user?.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left">
              <p className="text-sm font-medium">{user?.fullName}</p>
              <p className="text-xs text-gray-500">@{user?.username}</p>
            </div>
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogOut}
            className="w-full"
          >
            Logout
          </Button>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
