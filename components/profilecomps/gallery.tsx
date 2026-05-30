"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IUser } from "@/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { reverseTabMap, tabMap } from "./data";
import { ShopSection } from "./marketplace";
import Showcase from "./showcase";
import Storyboard from "./storyboard";

interface ArtistProfileTabsProps {
	user: IUser;
	isSame: boolean;
	className?: string;
}

const ArtistProfileTabs: React.FC<ArtistProfileTabsProps> = ({
	user,
	isSame,
	className,
}) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const tabsRef = useRef<HTMLDivElement>(null);

	const getTabFromUrl = useCallback((): string => {
		const tabParam = searchParams.get("tab");
		return tabMap[tabParam ?? ""] ?? "showcase";
	}, [searchParams]);

	const [tabValue, setTabValue] = useState(getTabFromUrl());

	useEffect(() => {
		const newTab = getTabFromUrl();
		setTabValue(newTab);
	}, [getTabFromUrl, searchParams]);

	useEffect(() => {
		if (searchParams.get("tab") && tabsRef.current) {
			tabsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	}, [searchParams]);

	const handleTabChange = (newTab: string) => {
		setTabValue(newTab);
		const queryTab = reverseTabMap[newTab] ?? "gallery";
		router.replace(`?tab=${queryTab}`, { scroll: false });
	};

	return (
		<div
			ref={tabsRef}
			className={`bg-white rounded-[20px] border border-[#ead7c9]/60 shadow-md mb-8 mx-auto max-w-6xl w-full ${className || ""}`}
		>
			<Tabs value={tabValue} onValueChange={handleTabChange} className="w-full">
				{/* Responsive Tabs List */}
				<div className="w-full border-b border-[#f0ddd0] px-4 sm:px-6 md:px-8 overflow-x-auto">
					<TabsList className="inline-flex flex-nowrap gap-2 sm:gap-4 bg-transparent rounded-none h-auto p-0">
						<TabsTrigger
							value="showcase"
							className="whitespace-nowrap rounded-none border-b-2 border-transparent data-[state=active]:border-b-[#834C3D] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold text-[#9a8578] data-[state=active]:text-[#834C3D] hover:text-[#5e3c2f] transition-colors"
						>
							Showcase
						</TabsTrigger>
						<TabsTrigger
							value="storyboard"
							className="whitespace-nowrap rounded-none border-b-2 border-transparent data-[state=active]:border-b-[#834C3D] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold text-[#9a8578] data-[state=active]:text-[#834C3D] hover:text-[#5e3c2f] transition-colors"
						>
							Storyboard
						</TabsTrigger>
						<TabsTrigger
							value="marketplace"
							className="whitespace-nowrap rounded-none border-b-2 border-transparent data-[state=active]:border-b-[#834C3D] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold text-[#9a8578] data-[state=active]:text-[#834C3D] hover:text-[#5e3c2f] transition-colors"
						>
							Marketplace
						</TabsTrigger>
					</TabsList>
				</div>

				{/* Tab Contents */}
				<TabsContent value="showcase" className="p-4 sm:p-6 md:p-8 mt-0 min-h-[400px]">
					<Showcase user={user} isSame={isSame} />
				</TabsContent>
				<TabsContent value="storyboard" className="p-4 sm:p-6 md:p-8 mt-0 min-h-[400px]">
					<Storyboard user={user} isSame={isSame} />
				</TabsContent>
				<TabsContent value="marketplace" className="p-4 sm:p-6 md:p-8 mt-0 min-h-[400px]">
					<ShopSection user={user} isSame={isSame} />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default ArtistProfileTabs;
