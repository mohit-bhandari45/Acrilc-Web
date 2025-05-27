"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Star, Heart, Facebook, Instagram, Twitter, Mail } from "lucide-react"

interface Section {
    id: string
    name: string
}

const sections: Section[] = [
    { id: "about", name: "About" },
    { id: "gallery", name: "Gallery" },
    { id: "shop", name: "Marketplace" },
]

const galleryItems = [
    { id: 1, category: "vessels", color: "bg-blue-50" },
    { id: 2, category: "functional", color: "bg-amber-50" },
    { id: 3, category: "sculptures", color: "bg-green-50" },
    { id: 4, category: "experimental", color: "bg-purple-50" },
    { id: 5, category: "vessels", color: "bg-orange-50" },
    { id: 6, category: "functional", color: "bg-blue-100" },
    { id: 7, category: "sculptures", color: "bg-gray-100" },
    { id: 8, category: "experimental", color: "bg-red-50" },
    { id: 9, category: "vessels", color: "bg-green-100" },
]

const products = [
    {
        id: 1,
        title: "Handthrown Stoneware Bowl",
        price: "₹1,200",
        tags: ["Limited Edition", "Food Safe"],
        image: "/placeholder.svg?height=300&width=300",
    },
    {
        id: 2,
        title: "Glazed Ceramic Vase",
        price: "₹2,800",
        tags: ["One of a Kind", "Home Decor"],
        image: "/placeholder.svg?height=300&width=300",
    },
    {
        id: 3,
        title: "Japanese Style Teapot",
        price: "₹3,500",
        tags: ["Functional Art", "Traditional"],
        image: "/placeholder.svg?height=300&width=300",
    },
    {
        id: 4,
        title: "Serving Platter Set",
        price: "₹4,200",
        tags: ["Set of 3", "Entertaining"],
        image: "/placeholder.svg?height=300&width=300",
    },
    {
        id: 5,
        title: "Morning Coffee Mug",
        price: "₹800",
        tags: ["Daily Use", "Microwave Safe"],
        image: "/placeholder.svg?height=300&width=300",
    },
    {
        id: 6,
        title: "Abstract Sculpture",
        price: "₹6,500",
        tags: ["Art Piece", "Unique"],
        image: "/placeholder.svg?height=300&width=300",
    },
]

export default function ArtistPortfolio() {
    const [activeSection, setActiveSection] = useState("about")
    const [activeFilter, setActiveFilter] = useState("all")
    const [wishlist, setWishlist] = useState<number[]>([])
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        newsletter: false,
    })

    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

useEffect(() => {
    const observerOptions = {
        threshold: Array.from({ length: 11 }, (_, i) => i / 10), // 0, 0.1, ..., 1
        rootMargin: "0px", // no margin, avoid confusion on boundaries
    };

    const observer = new IntersectionObserver((entries) => {
        let maxRatio = 0;
        let mostVisible: Element | null = null;

        entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                maxRatio = entry.intersectionRatio;
                mostVisible = entry.target;
            }
        });

        if (mostVisible) {
            const newId = (mostVisible as HTMLElement).id;
            setActiveSection((prevId) => (prevId !== newId ? newId : prevId));
        }
    }, observerOptions);

    Object.values(sectionRefs.current).forEach((section) => {
        if (section) observer.observe(section);
    });

    return () => observer.disconnect();
}, []);



    const scrollToSection = (sectionId: string) => {
        const section = sectionRefs.current[sectionId]
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }

    const toggleWishlist = (productId: number) => {
        setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form submitted:", formData)
        // Handle form submission here
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }))
    }

    const filteredGalleryItems = galleryItems.filter((item) => activeFilter === "all" || item.category === activeFilter)

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 px-10 py-5 flex justify-between items-center border-b border-black/10">
                <a href="#" className="text-2xl font-normal text-black">
                    acrilc
                </a>
                <nav className="flex gap-8 items-center">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className={`text-gray-600 hover:text-black hover:font-semibold transition-all duration-300 relative ${activeSection === section.id ? "text-black font-semibold" : ""
                                }`}
                        >
                            {section.name}
                            {activeSection === section.id && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black" />}
                        </button>
                    ))}
                    <button className="text-gray-600 hover:text-black transition-colors">Explore</button>
                    <button className="text-gray-600 hover:text-black transition-colors">Blog</button>
                    <button className="text-gray-600 hover:text-black transition-colors">Collections</button>
                    <button className="bg-black text-white px-5 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-colors">
                        Sign in
                    </button>
                </nav>
            </header>

            {/* Main Content */}
            <main className="mt-20">
                
                <section
                    id="about"
                    ref={(el) => {
                        sectionRefs.current.about = el;
                    }}
                    className={`min-h-screen px-10 py-20 transition-all duration-500
  ${activeSection !== "about" ? "opacity-30 blur-sm" : "opacity-100 blur-0"}
`}

                >
                {/* About Section */}
                <div className="max-w-6xl mx-auto flex items-center gap-20">
                    <div className="flex-1">
                        <h1 className="font-serif text-5xl font-normal mb-0 flex items-center gap-2">
                            Sambit Ghosh
                            <Star className="w-7 h-7 text-gray-800 fill-current" />
                        </h1>

                        <div className="flex items-center gap-5 my-3">
                            <span className="bg-amber-100 text-amber-700 text-sm font-medium px-4 py-1 rounded-2xl">
                                Acrilc Verified
                            </span>
                            <span className="text-gray-500 text-xl">Portland, Oregon</span>
                        </div>

                        <p className="text-base leading-relaxed mb-6 text-gray-700">
                            I create functional ceramic pieces inspired by the Pacific Northwest landscape. Each piece is hand
                            thrown and glazed in my Portland studio, reflecting the natural beauty and organic forms found in our
                            region.
                        </p>

                        <p className="text-base leading-relaxed mb-8 text-gray-700">
                            After studying ceramics at Rhode Island School of Design, I spent five years apprenticing with master
                            potters in Japan. This experience profoundly shaped my approach to form and function, blending Eastern
                            philosophy with contemporary Pacific Northwest aesthetics across my body of work.
                        </p>

                        <div className="flex gap-4 mb-10">
                            <span className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-600">Stoneware</span>
                            <span className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-600">Functional Art</span>
                            <span className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-600">Hand-thrown</span>
                        </div>

                        <div className="flex gap-4">
                            <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                                View Profile →
                            </button>
                            <button
                                onClick={() => scrollToSection("contact")}
                                className="bg-transparent text-black border border-gray-300 px-6 py-3 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors"
                            >
                                Contact Me
                            </button>
                        </div>
                    </div>

                    <div className="w-75 h-96 rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src="/placeholder.svg?height=400&width=300"
                            alt="Sambit Ghosh"
                            width={300}
                            height={400}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                </section>
                {/* Gallery Section */}
                <section
  id="gallery"
  ref={(el) => { sectionRefs.current.gallery = el; }}

  className={`min-h-screen px-10 py-20 transition-all duration-500 ${
    activeSection === "gallery" ? "opacity-100 blur-0" : "opacity-30 blur-sm"
  }`}
>
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="font-serif text-4xl mb-5">Gallery</h2>
                        <p className="text-gray-600 mb-10 text-base">
                            A curated collection of my ceramic works, exploring form, function, and the beauty of handmade objects.
                        </p>

                        <div className="flex justify-center gap-5 mb-15">
                            {["all", "vessels", "sculptures", "functional", "experimental"].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-5 py-2.5 rounded-full text-sm cursor-pointer transition-all duration-300 ${activeFilter === filter
                                        ? "bg-black text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-black hover:text-white"
                                        }`}
                                >
                                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="columns-3 gap-5 mb-10 md:columns-2 sm:columns-1">
                            {filteredGalleryItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="break-inside-avoid mb-5 rounded-2xl overflow-hidden bg-gray-100 transition-all duration-300 shadow-sm cursor-pointer hover:shadow-lg"
                                    onClick={() => setSelectedImage(`/placeholder.svg?height=250&width=250`)}
                                >
                                    <Image
                                        src="/placeholder.svg?height=250&width=250"
                                        alt={`Ceramic Piece ${item.id}`}
                                        width={250}
                                        height={250}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                        <button className="bg-transparent text-black border border-gray-300 px-6 py-3 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors">
                            Load More
                        </button>
                    </div>
                </section>

                {/* Shop Section */}
                <section
                    id="shop"
                    ref={(el) => {
                        sectionRefs.current.shop = el;
                    }}

                    className={`min-h-screen px-10 py-20 transition-all duration-500
  ${activeSection !== "shop" ? "opacity-30 blur-sm" : "opacity-100 blur-0"}
`}

                >
                    <div className="max-w-6xl mx-auto">
                        <h2 className="font-serif text-4xl mb-5 text-center">Shop</h2>
                        <p className="text-gray-600 mb-10 text-base text-center">
                            Available pieces from my studio. Each piece is unique and handcrafted with care.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-gray-100 hover:-translate-y-1 hover:shadow-xl hover:border-gray-300"
                                >
                                    <div className="aspect-square bg-gray-100 relative">
                                        <Image
                                            src={product.image || "/placeholder.svg"}
                                            alt={product.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <button
                                            onClick={() => toggleWishlist(product.id)}
                                            className="absolute top-4 right-4 w-10 h-10 bg-white/90 border-0 rounded-full cursor-pointer flex items-center justify-center text-lg hover:bg-white transition-colors"
                                        >
                                            <Heart
                                                className={`w-5 h-5 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-semibold mb-1">{product.title}</h3>
                                        <div className="text-lg font-semibold text-black mb-2">{product.price}</div>
                                        <div className="flex gap-2 mb-4">
                                            {product.tags.map((tag) => (
                                                <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded-lg text-gray-600">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="flex-1 bg-transparent text-black border border-gray-300 px-4 py-2 rounded-full text-xs font-medium hover:bg-black hover:text-white transition-colors">
                                                Contact Me
                                            </button>
                                            <button className="flex-1 bg-black text-white px-4 py-2 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-10">
                            <button className="bg-transparent text-black border border-gray-300 px-6 py-3 rounded-full text-sm font-medium hover:bg-black hover:text-white transition-colors">
                                Show More
                            </button>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section
                    id="contact"
                    ref={(el) => {
                        sectionRefs.current.contact = el;
                    }}

                    className={`min-h-screen px-10 py-20 transition-all duration-500
  ${activeSection !== "contact" ? "opacity-30 blur-sm" : "opacity-100 blur-0"}
`}

                >
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
                            {/* Form */}
                            <div>
                                <h2 className="font-serif text-4xl font-bold mb-3">Get in Touch</h2>
                                <p className="text-gray-600 text-base mb-8">
                                    Have questions about my work or interested in commissioning a custom piece? I&apos;d love to hear from you.
                                </p>
                                <form onSubmit={handleFormSubmit} className="space-y-5">
                                    <div className="flex flex-col">
                                        <label htmlFor="name" className="text-sm text-gray-800 mb-2 font-medium">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="border border-gray-300 rounded-md px-4 py-3 text-base bg-white transition-colors focus:border-black focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="email" className="text-sm text-gray-800 mb-2 font-medium">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="border border-gray-300 rounded-md px-4 py-3 text-base bg-white transition-colors focus:border-black focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="message" className="text-sm text-gray-800 mb-2 font-medium">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows={5}
                                            required
                                            className="border border-gray-300 rounded-md px-4 py-3 text-base bg-white transition-colors focus:border-black focus:outline-none resize-none"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="newsletter"
                                            name="newsletter"
                                            checked={formData.newsletter}
                                            onChange={handleInputChange}
                                            className="w-4 h-4"
                                        />
                                        <label htmlFor="newsletter" className="text-sm text-gray-600">
                                            Subscribe to my newsletter for updates on new work and exhibitions
                                        </label>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                                    >
                                        Send Message
                                    </button>
                                </form>
                                <p className="text-xs text-gray-500 mt-5">
                                    This is a sample contact form. In a real implementation, form submissions would be processed securely.
                                </p>
                            </div>

                            {/* Info Card */}
                            <aside className="bg-gray-50 rounded-2xl shadow-sm p-9 min-w-80 max-w-96 w-full flex flex-col gap-7">
                                <div>
                                    <div className="text-base font-bold text-gray-800 mb-3">Connect</div>
                                    <div className="flex gap-3">
                                        <a
                                            href="#"
                                            className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm transition-all hover:shadow-md hover:border-gray-400"
                                            aria-label="Instagram"
                                        >
                                            <Instagram className="w-4 h-4" />
                                        </a>
                                        <a
                                            href="#"
                                            className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm transition-all hover:shadow-md hover:border-gray-400"
                                            aria-label="Facebook"
                                        >
                                            <Facebook className="w-4 h-4" />
                                        </a>
                                        <a
                                            href="#"
                                            className="flex items-center justify-center w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm transition-all hover:shadow-md hover:border-gray-400"
                                            aria-label="Twitter"
                                        >
                                            <Twitter className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-base font-bold text-gray-800 mb-3">Visit</div>
                                    <div className="text-sm text-gray-600 mb-1 leading-relaxed">
                                        Portland Ceramic Studio
                                        <br />
                                        2145 NW Everett St, Portland, OR 97210
                                    </div>
                                    <div className="text-xs text-gray-500">Open for studio visits by appointment only</div>
                                </div>
                                <div>
                                    <div className="text-base font-bold text-gray-800 mb-3">Upcoming Events</div>
                                    <div className="bg-white rounded-lg shadow-sm p-4 mb-3">
                                        <div className="text-xs text-amber-700 font-semibold mb-1">May 15–20, 2023</div>
                                        <div className="text-base font-semibold text-gray-800 mb-1">Portland Ceramic Arts Festival</div>
                                        <div className="text-xs text-gray-600">Booth #42, Portland Convention Center</div>
                                    </div>
                                    <div className="bg-white rounded-lg shadow-sm p-4">
                                        <div className="text-xs text-amber-700 font-semibold mb-1">June 8, 2023</div>
                                        <div className="text-base font-semibold text-gray-800 mb-1">
                                            Studio Workshop: Glazing Techniques
                                        </div>
                                        <div className="text-xs text-gray-600">Limited spots available</div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-black text-white px-10 py-15">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-15 mb-10">
                            <div>
                                <h4 className="mb-5 text-lg">About Acrilc</h4>
                                <p className="text-gray-300 mb-5">
                                    A platform connecting artists with collectors, celebrating the beauty of handmade crafts and
                                    contemporary art.
                                </p>
                                <h4 className="mb-5 text-lg">Connect with us</h4>
                                <div className="flex gap-4">
                                    <a
                                        href="#"
                                        className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center text-gray-300 hover:bg-white hover:text-black hover:border-white transition-all"
                                    >
                                        <Facebook className="w-4 h-4" />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center text-gray-300 hover:bg-white hover:text-black hover:border-white transition-all"
                                    >
                                        <Twitter className="w-4 h-4" />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center text-gray-300 hover:bg-white hover:text-black hover:border-white transition-all"
                                    >
                                        <Instagram className="w-4 h-4" />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center text-gray-300 hover:bg-white hover:text-black hover:border-white transition-all"
                                    >
                                        <Mail className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h4 className="mb-5 text-lg">Explore</h4>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                            Featured Artists
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                            New Arrivals
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                            Collections
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                            Categories
                                        </a>
                                    </li>
                                </ul>
                                <h4 className="mb-5 text-lg mt-8">Join</h4>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                            Become an Artist
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                            Community
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                            Newsletter
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="mb-5 text-lg">Marketplace</h4>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                            How it Works
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                            Shipping Info
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                            Returns
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                            Support
                                        </a>
                                    </li>
                                </ul>
                                <h4 className="mb-5 text-lg mt-8">Legal</h4>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                            Terms of Service
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                            Privacy Policy
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                            Accessibility
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="text-center pt-10 border-t border-gray-700 text-gray-500">
                            <p>&copy; 2025 Acrilc. All rights reserved.</p>
                        </div>
                    </div>
                </footer>

                {/* Image Modal */}
                {
                    selectedImage && (
                        <div
                            className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center"
                            onClick={() => setSelectedImage(null)}
                        >
                            <div className="max-w-[90vw] max-h-[90vh] flex justify-center items-center">
                                <Image
                                    src={selectedImage || "/placeholder.svg"}
                                    alt="Gallery Image"
                                    width={800}
                                    height={600}
                                    className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
                                />
                            </div>
                        </div>
                    )
                }
            </main>
        </div >
    )
}
