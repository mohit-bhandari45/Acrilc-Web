import api, { GET_ALL_API_Market_PROJECT } from "@/apis/api";
import { Button } from "@/components/ui/button";
import { IMarketplace } from "@/types/marketplace";
import { IUser } from "@/types/types";
import { Heart } from "lucide-react";
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

	const getGradientClass = (image: string) => {
		const gradients = {
			bowl: "from-orange-50 to-orange-100",
			vase: "from-blue-50 to-blue-100",
			teapot: "from-purple-50 to-purple-100",
			platter: "from-green-50 to-green-100",
			mug: "from-yellow-50 to-yellow-100",
			sculpture: "from-indigo-50 to-indigo-100",
		};
		return (
			gradients[image as keyof typeof gradients] || "from-gray-50 to-gray-100"
		);
	};

	if (!projects) return null;

	return (
		<section id="shop" className="w-full">
			{projects.length === 0 ? (
				<div className="flex flex-col items-center justify-center h-64 w-full bg-muted/50 text-muted-foreground rounded-xl border border-dashed p-6 mb-6">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-12 h-12 mb-4 text-muted-foreground"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<p className="text-lg font-medium">No Projects Yet!</p>
					{isSame && (
						<p className="text-center text-sm text-muted-foreground">
							Start by creating your first project to get going.
						</p>
					)}
				</div>
			) : (
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{projects.map((project) => (
							<div
								key={project._id}
								className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
							>
								<div
									className={`aspect-square bg-gradient-to-br ${getGradientClass(
										"mug"
									)} relative flex items-center justify-center`}
								>
									<div className="text-4xl">🏺</div>
									<button className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
										<Heart className="w-5 h-5" />
									</button>
								</div>

								<div className="p-5">
									<h3 className="font-semibold mb-1">{project.title}</h3>
									<div className="text-lg font-semibold mb-2">
										₹{project.pricingOptions.sizesAndPrices[0].price}
									</div>

									<div className="flex gap-2 mb-4">{project.forte}</div>

									<div className="flex gap-2">
										<Button
											variant="outline"
											size="sm"
											className="flex-1 text-xs"
										>
											Contact Me
										</Button>
										<Button
											size="sm"
											className="flex-1 text-xs text-white bg-black hover:bg-gray-800"
											onClick={() => {
												router.push(`/marketplace/${project._id}`);
											}}
										>
											View Details
										</Button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
			{isSame && (
				<div className="mt-6">
					<Link
						href={{ pathname: "/marketplace/add" }}
						className="block w-full sm:w-64"
					>
						<div className="flex flex-col items-center justify-center aspect-square bg-gray-200 rounded-xl cursor-pointer hover:bg-gray-300 transition">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-10 w-10 mb-3 text-gray-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 4v16m8-8H4"
								/>
							</svg>
							<span className="font-medium text-gray-700">Create Post</span>
						</div>
					</Link>
				</div>
			)}
		</section >
	);
};
