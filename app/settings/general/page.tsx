"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Save, Trash2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import toast from "react-hot-toast";
import api, { UPDATE_PROFILE } from "@/apis/api";

interface SocialLink {
    platform: string;
    url: string;
}

const GeneralSettings = () => {
    const router = useRouter();
    const [loader, setLoader] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        bio: "",
        story: "",
        location: "",
    });
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

    const { user } = useAppSelector(state => state.userReducer);

    useEffect(() => {
        if (user) {
            setFormData((prev) => {
                return {
                    ...prev,
                    fullName: user.fullName || "",
                    username: user.username || "",
                    bio: user.bio || "",
                    story: user.story || "",
                    location: prev.location,
                };
            });

            if (user.socialLinks) {
                const linksArray = Object.entries(user.socialLinks).map(
                    ([platform, url]) => ({
                        platform,
                        url,
                    })
                );

                setSocialLinks(linksArray);
            }
        }
    }, [user]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSocialLinkChange = (
        index: number,
        field: keyof SocialLink,
        value: string
    ) => {
        const updatedLinks = [...socialLinks];
        updatedLinks[index][field] = value;
        setSocialLinks(updatedLinks);
    };

    const handleRemoveSocialLink = (index: number) => {
        setSocialLinks((prev) => prev.filter((_, i) => i !== index));
    };

    const handleAddSocialLink = () => {
        setSocialLinks((prev) => [...prev, { platform: "Instagram", url: "" }]);
    };

    const handleSubmit = async () => {
        if (formData.bio.length > 400) {
            toast.error("Bio cannot exceed 100 characters");
            return;
        }
        if (formData.story.length > 1000) {
            toast.error("Storyboard cannot exceed 500 characters");
            return;
        }

        setLoader(true);
        const data = { ...formData, socialLinks };

        try {
            const res = await api.put(UPDATE_PROFILE, data);
            if (res.status === 200) {
                router.push(`/profile/${user?.username}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex-1 w-full md:w-[90%] lg:w-[80%] mx-auto p-6">
            <Card className="w-full">
                <CardContent className="p-6 md:p-8">
                    <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <label htmlFor="fullName" className="text-sm font-medium">
                                Full Name
                            </label>
                            <Input
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="w-full"
                            />
                        </div>

                        {/* Username */}
                        <div className="space-y-2">
                            <label htmlFor="username" className="text-sm font-medium">
                                Username
                            </label>
                            <Input
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="mt-6 space-y-2">
                        <label htmlFor="bio" className="text-sm font-medium">
                            Bio
                        </label>
                        <Textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            className="w-full min-h-[5rem]"
                            placeholder="Write a short bio"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <p>Brief description for your profile. URLs are hyperlinked.</p>
                            <span
                                className={`${formData.bio.length > 400 ? "text-red-500" : "text-gray-500"
                                    }`}
                            >
                                {formData.bio.length}/400
                            </span>
                        </div>
                    </div>

                    {/* Story */}
                    <div className="mt-6 space-y-2">
                        <label htmlFor="story" className="text-sm font-medium">
                            Story
                        </label>
                        <Textarea
                            id="story"
                            name="story"
                            value={formData.story}
                            onChange={handleInputChange}
                            className="w-full min-h-[12rem]"
                            placeholder="Tell your story"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <p>Share more about yourself and your work.</p>
                            <span
                                className={`${formData.story.length > 1000 ? "text-red-500" : "text-gray-500"
                                    }`}
                            >
                                {formData.story.length}/1000
                            </span>
                        </div>
                    </div>

                    <Separator className="my-8" />

                    {/* Social Links */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">Social Links</h3>
                            <Button
                                variant="outline"
                                onClick={handleAddSocialLink}
                                size="sm"
                            >
                                Add Link
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {socialLinks.map((link, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
                                >
                                    <Select
                                        value={link.platform}
                                        onValueChange={(val) =>
                                            handleSocialLinkChange(idx, "platform", val)
                                        }
                                    >
                                        <SelectTrigger className="w-full sm:w-40">
                                            <SelectValue placeholder="Platform" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[
                                                "Instagram",
                                                "Twitter",
                                                "LinkedIn",
                                                "Facebook",
                                                "YouTube",
                                                "TikTok",
                                                "Pinterest",
                                                "Behance",
                                            ].map((plat) => (
                                                <SelectItem key={plat} value={plat}>
                                                    {plat}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <div className="flex-1 flex gap-2">
                                        <Input
                                            value={link.url}
                                            onChange={(e) =>
                                                handleSocialLinkChange(idx, "url", e.target.value)
                                            }
                                            className="flex-1"
                                            placeholder="URL (e.g., instagram.com/yourusername)"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleRemoveSocialLink(idx)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            {socialLinks.length === 0 && (
                                <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-md">
                                    No social links added yet
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex flex-col gap-3">
                        <Button
                            type="button"
                            onClick={() =>
                                router.push(`/profile/${user?.username ?? ""}`)
                            }
                            className="w-full py-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full py-2 bg-[#FAA21B] hover:bg-[#e59418] flex items-center justify-center"
                            size="lg"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            {loader ? "Saving…" : "Save Changes"}
                            {loader && (
                                <span className="ml-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default GeneralSettings;