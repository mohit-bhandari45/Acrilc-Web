"use client";

import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar";
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
    if (loading) {
		return <MainLoader msg="Loading, please wait" />;
	}
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

    if (loader) {
		return <MainLoader msg={"Logging Out"} />;
	}
    return (
        <SidebarProvider className="w-full">
            <Sidebar>
                <SidebarHeader>
                    <h3 className="text-xl font-bold">Settings</h3>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <Button
                            variant="outline"
                            onClick={() => {
                                if (pathname === "/settings/general") return;
                                router.push("/settings/general")
                            }}
                        >
                            General
                        </Button>
                    </SidebarGroup>
                    <SidebarGroup>
                        <Button
                            variant="outline"
                            onClick={() => {
                                if (pathname === "/settings/account") return;
                                router.push("/settings/account")
                            }}
                        >
                            Account & Privacy
                        </Button>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <Link href={`/profile/${user?.username}`} className="flex justify-start items-center">
                        <Avatar className="w-12 h-12">
                            <AvatarImage
                                src={user?.profilePicture}
                                alt={user?.fullName}
                                className="object-cover"
                            />
                            <AvatarFallback className="bg-gray-300 text-gray-600 text-sm sm:text-lg md:text-2xl font-semibold">
                                {user?.fullName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                        <div className="px-2 flex flex-col">
                            <p className="font-semibold text-md">{user?.fullName}</p>
                            <p className="text-sm">{user?.username}</p>
                        </div>
                    </Link>
                    <Button variant="outline" onClick={handleLogOut}>Logout</Button>
                </SidebarFooter>
            </Sidebar>
            <main className="w-full">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}