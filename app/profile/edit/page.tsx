"use client";

import api, { UPDATE_PROFILE } from "@/apis/api";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/store/hooks";
import { ArrowLeft, Trash2, MapPin, User, BookOpen, Link2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface SocialLink {
	platform: string;
	url: string;
}

const PLATFORMS = ["Instagram", "Twitter", "LinkedIn", "Facebook", "YouTube", "Pinterest", "Behance", "TikTok"];

const PLATFORM_COLORS: Record<string, string> = {
	Instagram: "#E1306C", Twitter: "#1DA1F2", LinkedIn: "#0A66C2",
	Facebook: "#1877F2", YouTube: "#FF0000", Pinterest: "#E60023",
	Behance: "#1769FF", TikTok: "#010101",
};

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
	return (
		<div className="flex items-start gap-3 mb-6">
			<div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#f5e2d8] text-[#834C3D]">
				{icon}
			</div>
			<div>
				<h2 className="text-base font-bold text-[#2e1f14]">{title}</h2>
				<p className="text-xs text-[#9a8578] mt-0.5">{subtitle}</p>
			</div>
		</div>
	);
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
	return (
		<div className="space-y-1.5">
			<label className="block text-sm font-semibold text-[#765240]">{label}</label>
			{children}
			{hint && <p className="text-xs text-[#9a8578]">{hint}</p>}
		</div>
	);
}

const inputCls = "h-11 rounded-full border-[#ead7c9] bg-white px-4 text-sm text-[#2e1f14] placeholder:text-[#c0a898] focus-visible:border-[#c98d68] focus-visible:ring-2 focus-visible:ring-[#e8b08f]/30 shadow-sm";
const textareaCls = "rounded-2xl border-[#ead7c9] bg-white px-4 py-3 text-sm text-[#2e1f14] placeholder:text-[#c0a898] focus-visible:border-[#c98d68] focus-visible:ring-2 focus-visible:ring-[#e8b08f]/30 shadow-sm resize-none";

export default function ProfileEditPage() {
	const router = useRouter();
	const [loader, setLoader] = useState(false);
	const [formData, setFormData] = useState({ fullName: "", username: "", bio: "", story: "", location: "" });
	const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
	const { user } = useAppSelector(state => state.userReducer);

	useEffect(() => {
		if (user) {
			setFormData({
				fullName: user.fullName || "",
				username: user.username || "",
				bio: user.bio || "",
				story: user.story || "",
				location: user.location || "",
			});
			if (user.socialLinks) {
				setSocialLinks(Object.entries(user.socialLinks).map(([platform, url]) => ({ platform, url })));
			}
		}
	}, [user]);

	const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async () => {
		if (formData.bio.length > 400) { toast.error("Bio cannot exceed 400 characters"); return; }
		if (formData.story.length > 1000) { toast.error("Story cannot exceed 1000 characters"); return; }
		setLoader(true);
		try {
			const res = await api.put(UPDATE_PROFILE, { ...formData, socialLinks });
			if (res.status === 200) {
				toast.success("Profile updated!");
				router.push(`/profile/${user?.username}`);
			}
		} catch {
			toast.error("Something went wrong. Try again.");
		} finally {
			setLoader(false);
		}
	};

	const initials = user?.fullName?.trim().split(/\s+/).filter(Boolean).slice(0, 2).map(n => n[0].toUpperCase()).join("") || "?";

	return (
		<div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(226,114,91,0.12)_0%,_transparent_50%),linear-gradient(180deg,_#f5e8dc_0%,_#eedad0_60%,_#e5cfc0_100%)]">

			{/* Sticky header */}
			<header className="sticky top-0 z-50 bg-[#fbf7f2]/96 backdrop-blur-md border-b border-[#e8d5c4]/70 shadow-[0_2px_16px_rgba(89,59,43,0.07)]">
				<div className="max-w-2xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<button
							onClick={() => router.back()}
							className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e8d5c4] bg-white text-[#8a7060] hover:bg-[#f0ddd0] hover:text-[#5e3c2f] transition-colors cursor-pointer"
						>
							<ArrowLeft className="h-4 w-4" />
						</button>
						<div>
							<h1 className="text-base font-bold text-[#2e1f14] leading-none">Edit Profile</h1>
							<p className="text-xs text-[#9a8578] mt-0.5">@{user?.username}</p>
						</div>
					</div>

					<button
						onClick={handleSubmit}
						disabled={loader}
						className="inline-flex items-center gap-2 rounded-full border border-[#8f5b42]/10 bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] px-5 py-2 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(131,76,61,0.28)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(131,76,61,0.36)] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
					>
						{loader ? (
							<div className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
						) : (
							<Save className="h-3.5 w-3.5" />
						)}
						{loader ? "Saving…" : "Save"}
					</button>
				</div>
			</header>

			<main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-5 pb-16">

				{/* Profile preview */}
				<div className="bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm overflow-hidden">
					<div className="h-20 bg-[linear-gradient(135deg,#c9956b_0%,#dba97e_45%,#efc9a8_100%)] relative">
						<div className="absolute inset-0 flex items-center justify-center">
							<span className="font-playfair text-5xl font-bold text-white/20 select-none">
								{formData.fullName?.[0]?.toUpperCase() || "A"}
							</span>
						</div>
					</div>
					<div className="px-5 pb-4 pt-0 flex items-end gap-4 -mt-8">
						<div className="h-16 w-16 rounded-full border-4 border-white shadow-md flex-shrink-0 overflow-hidden bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] flex items-center justify-center select-none">
							{user?.profilePicture ? (
								<img src={user.profilePicture} alt="avatar" className="h-full w-full object-cover" />
							) : (
								<span className="text-lg font-bold text-white">{initials}</span>
							)}
						</div>
						<div className="pb-1 min-w-0">
							<p className="font-bold text-[#2e1f14] truncate">{formData.fullName || "Your Name"}</p>
							<p className="text-sm text-[#834C3D]">@{formData.username || "username"}</p>
						</div>
					</div>
				</div>

				{/* Basic Info */}
				<div className="bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm p-5 sm:p-6">
					<SectionHeader
						icon={<User className="h-4 w-4" />}
						title="Basic Information"
						subtitle="Your name, username and location"
					/>
					<div className="space-y-4">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<Field label="Full Name">
								<Input name="fullName" value={formData.fullName} onChange={handleInput}
									placeholder="Your full name" className={inputCls} />
							</Field>
							<Field label="Username">
								<div className="relative">
									<span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#9a8578]">@</span>
									<Input name="username" value={formData.username} onChange={handleInput}
										placeholder="yourhandle" className={`${inputCls} pl-8`} />
								</div>
							</Field>
						</div>
						<Field label="Location">
							<div className="relative">
								<MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#834C3D]" />
								<Input name="location" value={formData.location} onChange={handleInput}
									placeholder="e.g. Mumbai, India" className={`${inputCls} pl-10`} />
							</div>
						</Field>
					</div>
				</div>

				{/* About */}
				<div className="bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm p-5 sm:p-6">
					<SectionHeader
						icon={<BookOpen className="h-4 w-4" />}
						title="About You"
						subtitle="Let the world know who you are"
					/>
					<div className="space-y-4">
						<Field label="Bio" hint="A short description shown on your profile.">
							<Textarea name="bio" value={formData.bio} onChange={handleInput}
								placeholder="Write a short bio about yourself…"
								className={`${textareaCls} min-h-[90px]`} />
							<div className="flex justify-end mt-1">
								<span className={`text-xs font-medium ${formData.bio.length > 400 ? "text-red-500" : "text-[#9a8578]"}`}>
									{formData.bio.length} / 400
								</span>
							</div>
							<div className="h-1 w-full rounded-full bg-[#f0ddd0] mt-1 overflow-hidden">
								<div
									className={`h-full rounded-full transition-all duration-300 ${formData.bio.length > 400 ? "bg-red-400" : "bg-[linear-gradient(90deg,#834C3D,#d38d67)]"}`}
									style={{ width: `${Math.min((formData.bio.length / 400) * 100, 100)}%` }}
								/>
							</div>
						</Field>

						<Field label="Story" hint="Share your creative journey and inspiration.">
							<Textarea name="story" value={formData.story} onChange={handleInput}
								placeholder="Tell your story — how you started, what drives you…"
								className={`${textareaCls} min-h-[140px]`} />
							<div className="flex justify-end mt-1">
								<span className={`text-xs font-medium ${formData.story.length > 1000 ? "text-red-500" : "text-[#9a8578]"}`}>
									{formData.story.length} / 1000
								</span>
							</div>
							<div className="h-1 w-full rounded-full bg-[#f0ddd0] mt-1 overflow-hidden">
								<div
									className={`h-full rounded-full transition-all duration-300 ${formData.story.length > 1000 ? "bg-red-400" : "bg-[linear-gradient(90deg,#834C3D,#d38d67)]"}`}
									style={{ width: `${Math.min((formData.story.length / 1000) * 100, 100)}%` }}
								/>
							</div>
						</Field>
					</div>
				</div>

				{/* Social Links */}
				<div className="bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm p-5 sm:p-6">
					<div className="flex items-start justify-between mb-6">
						<div className="flex items-start gap-3">
							<div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#f5e2d8] text-[#834C3D]">
								<Link2 className="h-4 w-4" />
							</div>
							<div>
								<h2 className="text-base font-bold text-[#2e1f14]">Social Links</h2>
								<p className="text-xs text-[#9a8578] mt-0.5">Connect your social profiles</p>
							</div>
						</div>
						<button
							onClick={handleAddSocialLink}
							className="inline-flex items-center gap-1.5 rounded-full border border-[#834C3D]/40 bg-[#fff7f2] px-3.5 py-1.5 text-xs font-semibold text-[#834C3D] hover:bg-[#f5e2d8] transition cursor-pointer"
						>
							<svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
							</svg>
							Add
						</button>
					</div>

					{socialLinks.length === 0 ? (
						<div className="py-10 text-center rounded-2xl border-2 border-dashed border-[#d4a98a] bg-[#fdf5ef]">
							<div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5e2d8]">
								<Link2 className="h-5 w-5 text-[#834C3D]" />
							</div>
							<p className="text-sm font-medium text-[#5e3c2f]">No social links yet</p>
							<p className="text-xs text-[#9a8578] mt-1">Click Add to connect your profiles</p>
						</div>
					) : (
						<div className="space-y-3">
							{socialLinks.map((link, index) => (
								<div key={index} className="flex items-center gap-2 p-3 rounded-2xl border border-[#ead7c9] bg-[#fdf9f7]">
									<div
										className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-white text-xs font-bold"
										style={{ backgroundColor: PLATFORM_COLORS[link.platform] || "#834C3D" }}
									>
										{link.platform[0]}
									</div>

									<Select
										value={link.platform}
										onValueChange={val => {
											const updated = [...socialLinks];
											updated[index].platform = val;
											setSocialLinks(updated);
										}}
									>
										<SelectTrigger className="w-32 h-8 rounded-full border-[#ead7c9] bg-white text-xs px-3 focus:border-[#c98d68] focus:ring-1 focus:ring-[#e8b08f]/30 flex-shrink-0">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{PLATFORMS.map(p => (
												<SelectItem key={p} value={p} className="cursor-pointer text-sm">{p}</SelectItem>
											))}
										</SelectContent>
									</Select>

									<Input
										value={link.url}
										onChange={e => {
											const updated = [...socialLinks];
											updated[index].url = e.target.value;
											setSocialLinks(updated);
										}}
										placeholder="Paste your profile URL"
										className="flex-1 h-8 rounded-full border-[#ead7c9] bg-white px-3 text-xs placeholder:text-[#c0a898] focus-visible:border-[#c98d68] focus-visible:ring-1 focus-visible:ring-[#e8b08f]/30"
									/>

									<button
										onClick={() => setSocialLinks(prev => prev.filter((_, i) => i !== index))}
										className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-red-400 hover:bg-red-50 transition cursor-pointer"
									>
										<Trash2 className="h-3.5 w-3.5" />
									</button>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Actions */}
				<div className="flex gap-3 pt-1">
					<button
						onClick={() => router.back()}
						className="flex-none px-6 h-11 rounded-full border border-[#834C3D]/40 bg-white text-sm font-semibold text-[#834C3D] hover:bg-[#fff7f2] transition cursor-pointer"
					>
						Cancel
					</button>
					<button
						onClick={handleSubmit}
						disabled={loader}
						className="flex-1 h-11 inline-flex items-center justify-center gap-2 cursor-pointer rounded-full border border-[#8f5b42]/10 bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] text-sm font-semibold text-white shadow-[0_8px_20px_rgba(131,76,61,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(131,76,61,0.36)] disabled:opacity-70 disabled:cursor-not-allowed"
					>
						{loader ? (
							<><div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" /><span>Saving…</span></>
						) : (
							<><Save className="h-4 w-4" /><span>Save Changes</span></>
						)}
					</button>
				</div>
			</main>
		</div>
	);

	function handleAddSocialLink() {
		setSocialLinks(prev => [...prev, { platform: "Instagram", url: "" }]);
	}
}
