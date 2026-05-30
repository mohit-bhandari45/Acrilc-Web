"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Trash2, User, BookOpen, Link2, Layers } from "lucide-react";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import toast from "react-hot-toast";
import api, { UPDATE_PROFILE } from "@/apis/api";

const PREFERENCE_ENUM = [
    "Woolen Craft", "Poetry", "Exclusive", "Paintings", "Sculptures",
    "Wooden Crafts", "Textile Art", "Ceramics", "Jewelry Design", "Glass Art",
    "Metalwork", "Paper Crafts", "Mixed Media", "Photography", "Digital Art",
    "Calligraphy", "Printmaking", "Mosaic Art", "Leatherwork", "Pottery",
    "Fiber Art", "Illustration", "Installation Art",
];

const PLATFORMS = ["Instagram", "Twitter", "LinkedIn", "Facebook", "YouTube", "TikTok", "Pinterest", "Behance"];
const PLATFORM_COLORS: Record<string, string> = {
    Instagram: "#E1306C", Twitter: "#1DA1F2", LinkedIn: "#0A66C2",
    Facebook: "#1877F2", YouTube: "#FF0000", Pinterest: "#E60023",
    Behance: "#1769FF", TikTok: "#010101",
};

interface SocialLink { platform: string; url: string; }

const inputCls = "h-11 rounded-full border-[#ead7c9] bg-white px-4 text-sm text-[#2e1f14] placeholder:text-[#c0a898] focus-visible:border-[#c98d68] focus-visible:ring-2 focus-visible:ring-[#e8b08f]/30 shadow-sm";
const textareaCls = "rounded-2xl border-[#ead7c9] bg-white px-4 py-3 text-sm text-[#2e1f14] placeholder:text-[#c0a898] focus-visible:border-[#c98d68] focus-visible:ring-2 focus-visible:ring-[#e8b08f]/30 shadow-sm resize-none";

function SectionCard({ icon, title, subtitle, children }: { icon: React.ReactNode; title: string; subtitle: string; children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-[20px] border border-[#e8d5c4]/60 shadow-sm p-5 sm:p-6">
            <div className="flex items-start gap-3 mb-5">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#f5e2d8] text-[#834C3D]">{icon}</div>
                <div>
                    <h2 className="text-base font-bold text-[#2e1f14]">{title}</h2>
                    <p className="text-xs text-[#9a8578] mt-0.5">{subtitle}</p>
                </div>
            </div>
            {children}
        </div>
    );
}

const GeneralSettings = () => {
    const router = useRouter();
    const [loader, setLoader] = useState(false);
    const [formData, setFormData] = useState({ fullName: "", username: "", bio: "", story: "", location: "", preferences: [] as string[] });
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
                preferences: user.preferences || [],
            });
            if (user.socialLinks) {
                setSocialLinks(Object.entries(user.socialLinks).map(([platform, url]) => ({ platform, url })));
            }
        }
    }, [user]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const toggleForte = (forte: string) => {
        setFormData(prev => {
            if (prev.preferences.includes(forte)) {
                return { ...prev, preferences: prev.preferences.filter(f => f !== forte) };
            } else if (prev.preferences.length < 4) {
                return { ...prev, preferences: [...prev.preferences, forte] };
            } else {
                toast.error("You can select up to 4 fortes only.");
                return prev;
            }
        });
    };

    const handleSubmit = async () => {
        if (formData.bio.length > 400) { toast.error("Bio cannot exceed 400 characters"); return; }
        if (formData.story.length > 1000) { toast.error("Story cannot exceed 1000 characters"); return; }
        setLoader(true);
        try {
            const res = await api.put(UPDATE_PROFILE, { ...formData, socialLinks });
            if (res.status === 200) {
                toast.success("Profile updated!");
                window.location.href = `/profile/${user?.username}`;
            }
        } catch {
            toast.error("Something went wrong. Try again.");
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-5">
            <div className="mb-6">
                <h1 className="text-xl font-bold text-[#2e1f14]">General Settings</h1>
                <p className="text-sm text-[#9a8578] mt-1">Manage your profile information and preferences</p>
            </div>

            {/* Basic Info */}
            <SectionCard icon={<User className="h-4 w-4" />} title="Basic Information" subtitle="Your public-facing name, handle and location">
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-[#765240]">Full Name</label>
                            <Input name="fullName" value={formData.fullName} onChange={handleInput} placeholder="Your full name" className={inputCls} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-[#765240]">Username</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#9a8578]">@</span>
                                <Input name="username" value={formData.username} onChange={handleInput} placeholder="yourhandle" className={`${inputCls} pl-8`} />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-1.5 sm:w-1/2">
                        <label className="text-sm font-semibold text-[#765240]">Location</label>
                        <Input name="location" value={formData.location} onChange={handleInput} placeholder="e.g. Mumbai, India" className={inputCls} />
                    </div>
                </div>
            </SectionCard>

            {/* About */}
            <SectionCard icon={<BookOpen className="h-4 w-4" />} title="About You" subtitle="Tell the world who you are and your creative journey">
                <div className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-[#765240]">Bio</label>
                        <Textarea name="bio" value={formData.bio} onChange={handleInput} placeholder="Write a short bio…" className={`${textareaCls} min-h-[80px]`} />
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-[#9a8578]">Brief description for your profile.</p>
                            <span className={`text-xs font-medium ${formData.bio.length > 400 ? "text-red-500" : "text-[#9a8578]"}`}>{formData.bio.length}/400</span>
                        </div>
                        <div className="h-1 w-full rounded-full bg-[#f0ddd0] overflow-hidden">
                            <div className={`h-full rounded-full transition-all ${formData.bio.length > 400 ? "bg-red-400" : "bg-[linear-gradient(90deg,#834C3D,#d38d67)]"}`}
                                style={{ width: `${Math.min((formData.bio.length / 400) * 100, 100)}%` }} />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-[#765240]">Story</label>
                        <Textarea name="story" value={formData.story} onChange={handleInput} placeholder="Tell your creative journey…" className={`${textareaCls} min-h-[130px]`} />
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-[#9a8578]">Share more about yourself and your work.</p>
                            <span className={`text-xs font-medium ${formData.story.length > 1000 ? "text-red-500" : "text-[#9a8578]"}`}>{formData.story.length}/1000</span>
                        </div>
                        <div className="h-1 w-full rounded-full bg-[#f0ddd0] overflow-hidden">
                            <div className={`h-full rounded-full transition-all ${formData.story.length > 1000 ? "bg-red-400" : "bg-[linear-gradient(90deg,#834C3D,#d38d67)]"}`}
                                style={{ width: `${Math.min((formData.story.length / 1000) * 100, 100)}%` }} />
                        </div>
                    </div>
                </div>
            </SectionCard>

            {/* Social Links */}
            <SectionCard icon={<Link2 className="h-4 w-4" />} title="Social Links" subtitle="Connect your social profiles">
                <div className="space-y-3">
                    {socialLinks.length === 0 ? (
                        <div className="py-8 text-center rounded-2xl border-2 border-dashed border-[#d4a98a] bg-[#fdf5ef]">
                            <p className="text-sm font-medium text-[#5e3c2f]">No social links yet</p>
                            <p className="text-xs text-[#9a8578] mt-1">Click Add to connect your profiles</p>
                        </div>
                    ) : (
                        socialLinks.map((link, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-3 rounded-2xl border border-[#ead7c9] bg-[#fdf9f7]">
                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-white text-xs font-bold"
                                    style={{ backgroundColor: PLATFORM_COLORS[link.platform] || "#834C3D" }}>
                                    {link.platform[0]}
                                </div>
                                <Select value={link.platform} onValueChange={val => { const u = [...socialLinks]; u[idx].platform = val; setSocialLinks(u); }}>
                                    <SelectTrigger className="w-32 h-8 rounded-full border-[#ead7c9] bg-white text-xs px-3 flex-shrink-0">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {PLATFORMS.map(p => <SelectItem key={p} value={p} className="cursor-pointer text-sm">{p}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <Input value={link.url} onChange={e => { const u = [...socialLinks]; u[idx].url = e.target.value; setSocialLinks(u); }}
                                    placeholder="Paste your profile URL"
                                    className="flex-1 h-8 rounded-full border-[#ead7c9] bg-white px-3 text-xs placeholder:text-[#c0a898] focus-visible:border-[#c98d68] focus-visible:ring-1 focus-visible:ring-[#e8b08f]/30" />
                                <button onClick={() => setSocialLinks(prev => prev.filter((_, i) => i !== idx))}
                                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-red-400 hover:bg-red-50 transition cursor-pointer">
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        ))
                    )}
                    <button onClick={() => setSocialLinks(prev => [...prev, { platform: "Instagram", url: "" }])}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#834C3D]/40 bg-[#fff7f2] px-4 py-1.5 text-xs font-semibold text-[#834C3D] hover:bg-[#f5e2d8] transition cursor-pointer">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                        Add Link
                    </button>
                </div>
            </SectionCard>

            {/* Fortes */}
            <SectionCard icon={<Layers className="h-4 w-4" />} title="Your Fortes" subtitle="Choose up to 4 that best represent your creative style">
                <div className="flex flex-wrap gap-2">
                    {PREFERENCE_ENUM.map(forte => {
                        const isSelected = formData.preferences.includes(forte);
                        return (
                            <button key={forte} onClick={() => toggleForte(forte)}
                                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer
                                    ${isSelected
                                        ? "bg-[#f5e2d8] border-[#834C3D] text-[#834C3D] shadow-sm ring-2 ring-[#834C3D]/20"
                                        : "bg-white border-[#ead7c9] text-[#5e3c2f] hover:border-[#c98d68] hover:bg-[#fff7f2]"
                                    }`}>
                                {forte}
                            </button>
                        );
                    })}
                </div>
                <p className="mt-3 text-xs text-[#9a8578]">{formData.preferences.length}/4 selected</p>
            </SectionCard>

            {/* Actions */}
            <div className="flex gap-3 pb-8">
                <button onClick={() => router.push(`/profile/${user?.username}`)}
                    className="flex-none px-6 h-11 rounded-full border border-[#834C3D]/40 bg-white text-sm font-semibold text-[#834C3D] hover:bg-[#fff7f2] transition cursor-pointer">
                    Cancel
                </button>
                <button onClick={handleSubmit} disabled={loader}
                    className="flex-1 h-11 inline-flex items-center justify-center gap-2 cursor-pointer rounded-full border border-[#8f5b42]/10 bg-[linear-gradient(135deg,#834C3D_0%,#a8664f_55%,#d38d67_100%)] text-sm font-semibold text-white shadow-[0_8px_20px_rgba(131,76,61,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(131,76,61,0.36)] disabled:opacity-70 disabled:cursor-not-allowed">
                    {loader ? (
                        <><div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" /><span>Saving…</span></>
                    ) : (
                        <><Save className="h-4 w-4" /><span>Save Changes</span></>
                    )}
                </button>
            </div>
        </div>
    );
};

export default GeneralSettings;
