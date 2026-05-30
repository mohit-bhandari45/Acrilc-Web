import api, { GET_ALL_API_Market_PROJECT } from "@/apis/api";
import { IMarketplace } from "@/types/marketplace";
import { IUser } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const ShopSection = ({
	user,
	isSame,
}: {
	user: IUser;
	isSame: boolean;
}) => {
	const [projects, setProjects] = useState<IMarketplace[] | null>(null);
	const router = useRouter();

	useEffect(() => {
		async function getMarket() {
			const res = await api.get(GET_ALL_API_Market_PROJECT);
			setProjects(res.data.data);
		}
		getMarket();
	}, [user._id]);

	if (!projects) {
		return (
			<div className="flex h-40 w-full items-center justify-center">
				<div className="h-10 w-10 rounded-full border-4 border-[#ead7c9] border-t-[#834C3D] animate-spin" />
			</div>
		);
	}

	if (projects.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-16 text-center">
				<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f5e2d8]">
					<svg className="h-8 w-8 text-[#834C3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
					</svg>
				</div>
				<p className="text-base font-semibold text-[#3d2b1f]">No Listings Yet</p>
				{isSame ? (
					<>
						<p className="mt-1 text-sm text-[#9a8578]">List your artwork for sale in the marketplace.</p>
						<Link
							href={{ pathname: "/marketplace/add" }}
							className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#8f5b42]/10 bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(131,76,61,0.22)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(131,76,61,0.30)]"
						>
							<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
							</svg>
							Add Listing
						</Link>
					</>
				) : (
					<p className="mt-1 text-sm text-[#9a8578]">This artist hasn&apos;t listed anything yet.</p>
				)}
			</div>
		);
	}

	return (
		<section id="shop" className="w-full">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{projects.map((project) => (
					<div
						key={project._id}
						className="group bg-white rounded-[20px] overflow-hidden border border-[#ead7c9]/60 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(89,59,43,0.16)]"
					>
						<div className="aspect-square bg-[linear-gradient(135deg,#f5e6dc_0%,#e8cdb8_100%)] relative flex items-center justify-center overflow-hidden">
							<span className="text-5xl">🏺</span>
							<button className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm">
								<svg className="h-4 w-4 text-[#834C3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
								</svg>
							</button>
						</div>

						<div className="p-4">
							<h3 className="font-semibold text-[#2e1f14] mb-1">{project.title}</h3>
							<div className="text-base font-bold text-[#834C3D] mb-3">
								₹{project.pricingOptions.sizesAndPrices[0].price}
							</div>
							<div className="flex gap-2">
								<button className="flex-1 rounded-full border border-[#834C3D] py-1.5 text-xs font-medium text-[#834C3D] hover:bg-[#fff7f2] transition">
									Contact Me
								</button>
								<button
									onClick={() => router.push(`/marketplace/${project._id}`)}
									className="flex-1 rounded-full border border-[#8f5b42]/10 bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] py-1.5 text-xs font-semibold text-white shadow-sm hover:-translate-y-0.5 transition"
								>
									View Details
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{isSame && (
				<div className="mt-6">
					<Link href={{ pathname: "/marketplace/add" }} className="block w-full sm:w-56">
						<div className="flex flex-col items-center justify-center h-40 rounded-xl border-2 border-dashed border-[#d4a98a] bg-[#fdf5ef] cursor-pointer transition-all duration-200 hover:border-[#834C3D] hover:bg-[#f5e2d8] hover:shadow-[0_4px_16px_rgba(131,76,61,0.12)] group">
							<div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#f0d5c4] group-hover:bg-[#e8c4aa] transition-colors">
								<svg className="h-5 w-5 text-[#834C3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
								</svg>
							</div>
							<span className="text-sm font-semibold text-[#834C3D]">Add Listing</span>
						</div>
					</Link>
				</div>
			)}
		</section>
	);
};
