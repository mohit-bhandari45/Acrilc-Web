import api, { GET_FEATURED_ARTWORKS } from "@/apis/api";
import useHandleNavigation from "@/hooks/useHandleNavigation";
import { IPost, IUser } from "@/types/types";
import { useEffect, useState } from "react";

const LatestArtworks = ({ user }: { user: IUser }) => {
	const handleNavigation = useHandleNavigation();
	const [artworks, setArtworks] = useState<IPost[] | null>(null);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		const pushToArray = (arr: Record<string, IPost[]>) => {
			const array = [];
			for (const key in arr) {
				if (arr.hasOwnProperty(key)) {
					const value = arr[key][0];
					if (value?.author?._id === user._id) continue;
					array.push(value);
				}
			}
			return array;
		};
		const getFeaturedArtworks = async () => {
			const { data } = await api.get(GET_FEATURED_ARTWORKS);
			const result = pushToArray(data.data);
			setArtworks(result);
			setLoading(false);
		};
		getFeaturedArtworks();
	}, [user._id]);

	const skeletonCount = 8;
	const skeletonHeights = [220, 410, 260, 180, 490, 340, 170, 360];
	const skeletons = Array.from({ length: skeletonCount });

	return (
		<section id="artworks" className="py-16 px-8 max-w-7xl mx-auto">
			<h2 className="text-[2.5rem] font-bold text-center mb-12 text-gray-700">
				Latest Artworks
			</h2>
			<div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
				{loading
					? skeletons.map((_, i) => (
						<div
							key={i}
							className="bg-white rounded-xl overflow-hidden break-inside-avoid shadow-lg animate-pulse"
						>
							<div
								style={{ height: `${skeletonHeights[i]}px` }}
								className="w-full bg-gray-200"
							></div>
							<div className="p-4">
								<div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
								<div className="h-4 bg-gray-200 rounded w-1/2"></div>
							</div>
						</div>
					))
					: artworks?.filter(a => a.author != null)?.map((art, i) => (
						<div
							key={i}
							onClick={() => handleNavigation(`/content/${art._id}`)}
							className="bg-white rounded-xl overflow-hidden cursor-pointer break-inside-avoid shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-[0.3s] ease-in-out"
						>
							{art.thumbnail ? (
								<div className="aspect-w-16 aspect-h-9 w-full overflow-hidden">
									<img
										src={art.thumbnail}
										alt={art.title}
										className="object-cover w-full h-full"
									/>
								</div>
							) : (
								<div className="h-[350px] bg-gradient-to-r from-[#ff9a9e] to-[#fecfef]"></div>
							)}
							<div className="p-4">
								<h4 className="font-semibold mb-1">{art.title}</h4>
								<p className="text-gray-600 text-sm">by {art?.author?.fullName || "Unknown"}</p>
							</div>
						</div>
					))}
			</div>
		</section>
	);
};

export default LatestArtworks;
