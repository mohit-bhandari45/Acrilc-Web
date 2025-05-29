'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faBell, faComment, faShoppingBag, faCamera, faTimes, faMapMarker } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faFacebook, faLinkedin, faBehance, faPinterest, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { MapPin, Instagram, Facebook, Linkedin, Youtube, Edit, Share2 } from 'lucide-react';

// Interfaces
interface ArtistProfileProps {
    name?: string;
    location?: string;
    description?: string;
    story?: string;
    supporters?: number;
    supporting?: number;
    posts?: number;
    isOwnProfile?: boolean;
}
interface TabProps {
    id: string;
    label: string;
}

interface SocialLink {
    icon: string;
    url: string;
}

interface ForteCard {
    icon: string;
    title: string;
    description: string;
}

interface ArtworkItem {
    id: number;
    title: string;
    details: string;
    image: string;
    category: string;
}

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    image: string;
    tags: string[];
}

// Sample Data
const tabs: TabProps[] = [
    { id: 'showcase', label: 'Showcase' },
    { id: 'storyboard', label: 'Storyboard' },
    { id: 'marketplace', label: 'Marketplace' },
];

const socialLinks: SocialLink[] = [
    { icon: 'instagram', url: '#' },
    { icon: 'facebook', url: '#' },
    { icon: 'linkedin', url: '#' },
    { icon: 'behance', url: '#' },
    { icon: 'pinterest', url: '#' },
    { icon: 'youtube', url: '#' },
];

const artworkItems: ArtworkItem[] = [
    {
        id: 1,
        title: "Abstract Harmony",
        details: "Mixed media on canvas",
        image: "/artwork1.jpg",
        category: "paintings"
    },
    // Add more items as needed
];

const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "The Art of Ceramic Design",
        excerpt: "Exploring modern ceramic techniques...",
        date: "2024-05-28",
        image: "/blog1.jpg",
        tags: ["ceramics", "design"]
    },
    // Add more posts as needed
];
export default function Portfolio() {
    // States
    const [activeTab, setActiveTab] = useState('showcase');
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [selectedArtwork, setSelectedArtwork] = useState<ArtworkItem | null>(null);
    const name = "Sarah Anderson";
    const location = "New York, USA";
    const description = "Contemporary artist exploring...";
    const story = "My work is an exploration...";
    const supporters = 1200;
    const supporting = 450;
    const posts = 89;
    const isOwnProfile = false;
    const formatNumber = (num: number): string => {
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}k`;
        }
        return num.toString();
    };
    // File handling
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setImage: (value: string | null) => void) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Modal handlers
    const openArtworkModal = (artwork: ArtworkItem) => {
        setSelectedArtwork(artwork);
    };

    const closeArtworkModal = () => {
        setSelectedArtwork(null);
    };

    // Component JSX remains the same as before
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header section remains the same */}
            {/* ... existing header code ... */}


            {/* Main Content */}
            <main className="pt-3 px-10">
                {/* Profile Section */}
                <section className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="h-48 bg-gray-200 relative">
                        {coverImage && (
                            <Image
                                src={coverImage}
                                alt="Cover"
                                fill
                                className="object-cover"
                            />
                        )}
                        <button className="absolute bottom-4 right-4 bg-black text-white p-2 rounded-full">
                            <FontAwesomeIcon icon={faCamera} className="w-6 h-6" />
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, setCoverImage)}
                        />
                    </div>

                    {/* Add this profile circle section */}
                    <div className="px-8 -mt-20 relative z-10">
                        {/* Profile Circle with Camera Button */}
                        <div className="relative w-40 h-40">
                            <div className=" relative w-40 h-40 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100">
                                {profileImage ? (
                                    <Image
                                        src={profileImage}
                                        alt="Profile"
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    </div>
                                )}
                            </div>

                            {/* Camera Button - Positioned halfway on circle */}
                            <button
                                onClick={() => document.getElementById('profile-upload')?.click()}
                                className="flex items-center justify-center absolute right-4 top-32 -translate-y-1/2 translate-x-1/2 bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors shadow-md w-7 h-7"
                            >
                                <FontAwesomeIcon icon={faCamera} />
                            </button>

                            <input
                                id="profile-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileChange(e, setProfileImage)}
                            />
                        </div>
                    </div>


                    {/* Profile Content */}
                    {/* Profile Content */}
                    {/* Profile Content */}
                    <div className="m-4 p-3">
                        {/* Left Section */}
                        <div className='flex justify-between items-start gap-6 lg:flex-row flex-col'>
                            <div className="bg-white rounded-2xl shadow-lg p-8  h-[70vh] w-0 lg:w-[60%]">
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
                                    <div className="flex-1">
                                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <MapPin className="w-4 h-4 mr-2 text-pink-500" />
                                            <span>{location}</span>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed max-w-2xl">{description}</p>
                                    </div>

                                    {/* Stats */}

                                </div>
                                <div className='flex flex-wrap gap-4 mb-8'>
                                    {isOwnProfile ? (
                                        <button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                                            <Edit className="w-4 h-4" />
                                            Edit Profile
                                        </button>
                                    ) : (
                                        <button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                                            Edit Profile
                                        </button>
                                    )}

                                    <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                                        <Share2 className="w-4 h-4" />
                                        Share Profile
                                    </button>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mt-4 mb-4">
                                        <h2 className="text-xl font-semibold text-gray-900">Story of the Artist</h2>
                                        <Edit className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{story}</p>
                                </div>
                            </div>

                            {/* Right Section */}
                            <div className="flex flex-col gap-6 lg:ml-8 mt-6 lg:mt-0 bg-white rounded-2xl shadow-lg p-8 w-0  lg:w-[35%] h-[70vh]">
                                <div className="flex gap-8 lg:gap-12">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">{formatNumber(supporters)}</div>
                                        <div className="text-sm text-gray-600">Supporters</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">{supporting}</div>
                                        <div className="text-sm text-gray-600">Supporting</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">{posts}</div>
                                        <div className="text-sm text-gray-600">Posts</div>
                                    </div>
                                </div>
                                {/* Social Links */}
                                <div className="flex gap-3 mx-auto">
                                    <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
                                        <Instagram className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                                        <Facebook className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors">
                                        <div className="w-5 h-5 bg-orange-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">
                                            Be
                                        </div>
                                    </a>
                                    <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
                                        <div className="w-5 h-5 bg-pink-500 rounded-sm flex items-center justify-center text-white text-xs">
                                            P
                                        </div>
                                    </a>
                                    <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">
                                        <Youtube className="w-5 h-5" />
                                    </a>
                                </div>
                                <div className="mb-8 flex justify-between items-center">

                                    <div className="flex gap-8 mb-8">
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                                                <Edit className="w-6 h-6 text-gray-600" />
                                            </div>
                                            <div className="font-medium text-gray-900">Paintings</div>
                                            <div className="text-sm text-gray-600">Abstract Paintings</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-2 mx-auto">
                                                <div className="w-6 h-6 bg-gray-600 rounded-sm"></div>
                                            </div>
                                            <div className="font-medium text-gray-900">Sculptures</div>
                                            <div className="text-sm text-gray-600">Sculptures</div>
                                        </div>
                                    </div>

                                </div>
                                <div className="text-right">
                                    <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                                        View Portfolio
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>
                </section>

                {/* Tabs Section */}
                <section className="mt-8 bg-white rounded-2xl shadow-sm">
                    {/* ... existing tabs code ... */}
                    <div className="border-b border-gray-200">
                        <div className="flex">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-8 py-4 font-medium transition-colors relative ${activeTab === tab.id
                                        ? 'text-black'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Tab Content */}
                    <div className="p-8">
                        {activeTab === 'showcase' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {artworkItems.map((artwork) => (
                                    <div
                                        key={artwork.id}
                                        onClick={() => openArtworkModal(artwork)}
                                        className="aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                                    >
                                        <Image
                                            src={artwork.image}
                                            alt={artwork.title}
                                            width={400}
                                            height={400}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'storyboard' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {blogPosts.map((post) => (
                                    <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        {/* Blog post content */}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* Artwork Modal */}
            {selectedArtwork && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-semibold">{selectedArtwork.title}</h3>
                                <button
                                    onClick={closeArtworkModal}
                                    className="text-gray-500 hover:text-black"
                                >
                                    <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
                                </button>
                            </div>
                            <Image
                                src={selectedArtwork.image}
                                alt={selectedArtwork.title}
                                width={800}
                                height={600}
                                className="w-full rounded-xl mb-4"
                            />
                            <p className="text-gray-600">{selectedArtwork.details}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    {/* Share modal content */}
                </div>
            )}
        </div>
    );
}