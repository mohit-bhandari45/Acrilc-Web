const FeaturedMarketplace = () => {
    const items = [
        { title: 'Handcrafted Mandala Art', price: '₹15,999', desc: 'Beautiful intricate mandala painting with gold accents, perfect for meditation spaces.' },
        { title: 'Ceramic Vase Collection', price: '₹8,500', desc: 'Set of 3 handmade ceramic vases with unique textures and earth tones.' },
        { title: 'Bronze Sculpture', price: '₹25,000', desc: 'Limited edition bronze sculpture depicting classical Indian dance forms.' },
        { title: 'Handwoven Textile Art', price: '₹12,000', desc: 'Traditional handwoven textile with contemporary design elements.' },
    ];

    const newData = [
        {
            author: "60c72b2f9b1e8a5f4d8e7f33",
            image: "https://picsum.photos/id/101/800/600",
            title: "Abstract Horizons",
            yearOfMaking: "2023",
            description: "A vibrant exploration of color and form capturing the essence of dawn.",
            pricingOptions: {
                currency: "USD",
                sizesAndPrices: [
                    { size: "Small (12×12 in)", price: 150 },
                    { size: "Medium (24×24 in)", price: 300 },
                    { size: "Large (36×36 in)", price: 550 }
                ]
            },
            additionalInfo: "Framed in black walnut.",
            forte: "Acrylic Painting",
            keywords: "abstract,colorful,dawn,vibrant",
            contactInfo: "artist1@example.com",
            showContactInfo: true,
            status: "published"
        },
        {
            author: "60c72b2f9b1e8a5f4d8e7f34",
            image: "https://picsum.photos/id/102/800/600",
            title: "Urban Symphony",
            yearOfMaking: "2022",
            description: "A mixed-media piece reflecting the rhythm of city life.",
            pricingOptions: {
                currency: "EUR",
                sizesAndPrices: [
                    { size: "Small (30×30 cm)", price: 120 },
                    { size: "Medium (60×60 cm)", price: 250 },
                    { size: "Large (90×90 cm)", price: 480 }
                ]
            },
            forte: "Mixed Media",
            keywords: "urban,mixed-media,city,symphony",
            contactInfo: "artist2@example.com",
            showContactInfo: false,
            status: "draft"
        },
        {
            author: "60c72b2f9b1e8a5f4d8e7f35",
            image: "https://picsum.photos/id/103/800/600",
            title: "Serene Waters",
            yearOfMaking: "2021",
            description: "Oil on canvas depicting a calm lake at twilight.",
            pricingOptions: {
                currency: "GBP",
                sizesAndPrices: [
                    { size: "24×18 in", price: 400 },
                    { size: "48×36 in", price: 900 }
                ]
            },
            additionalInfo: "Includes certificate of authenticity.",
            forte: "Oil Painting",
            keywords: "landscape,water,oil,serene",
            contactInfo: "artist3@example.com",
            showContactInfo: true,
            status: "published"
        },
        {
            author: "60c72b2f9b1e8a5f4d8e7f36",
            image: "https://picsum.photos/id/104/800/600",
            title: "Moonlit Path",
            yearOfMaking: "2024",
            description: "Digital illustration of a forest trail illuminated by moonlight.",
            pricingOptions: {
                currency: "USD",
                sizesAndPrices: [
                    { size: "8×10 in", price: 50 },
                    { size: "16×20 in", price: 120 },
                    { size: "24×30 in", price: 200 }
                ]
            },
            forte: "Digital Art",
            keywords: "digital,forest,moonlight,illustration",
            contactInfo: "artist4@example.com",
            showContactInfo: false,
            status: "draft"
        },
        {
            author: "60c72b2f9b1e8a5f4d8e7f37",
            image: "https://picsum.photos/id/105/800/600",
            title: "Rustic Charm",
            yearOfMaking: "2020",
            description: "Charcoal sketch of an old barn surrounded by fields.",
            pricingOptions: {
                currency: "INR",
                sizesAndPrices: [
                    { size: "A4", price: 2000 },
                    { size: "A3", price: 3500 }
                ]
            },
            additionalInfo: "Unframed.",
            forte: "Charcoal Drawing",
            keywords: "charcoal,sketch,barn,rustic",
            contactInfo: "artist5@example.com",
            showContactInfo: true,
            status: "published"
        },
        {
            author: "60c72b2f9b1e8a5f4d8e7f38",
            image: "https://picsum.photos/id/106/800/600",
            title: "Floral Whispers",
            yearOfMaking: "2023",
            description: "Watercolor painting of a blooming spring garden.",
            pricingOptions: {
                currency: "USD",
                sizesAndPrices: [
                    { size: "11×14 in", price: 180 },
                    { size: "18×24 in", price: 320 }
                ]
            },
            forte: "Watercolor",
            keywords: "watercolor,flowers,spring,garden",
            contactInfo: "artist6@example.com",
            showContactInfo: false,
            status: "published"
        },
        {
            author: "60c72b2f9b1e8a5f4d8e7f39",
            image: "https://picsum.photos/id/107/800/600",
            title: "Metallic Dreams",
            yearOfMaking: "2022",
            description: "Sculptural piece crafted from reclaimed metal parts.",
            pricingOptions: {
                currency: "EUR",
                sizesAndPrices: [
                    { size: "Standard (30×30×30 cm)", price: 600 },
                    { size: "Large (50×50×50 cm)", price: 1100 }
                ]
            },
            additionalInfo: "Ready to install.",
            forte: "Metal Sculpture",
            keywords: "sculpture,metal,reclaimed,industrial",
            contactInfo: "artist7@example.com",
            showContactInfo: true,
            status: "published"
        },
        {
            author: "60c72b2f9b1e8a5f4d8e7f40",
            image: "https://picsum.photos/id/108/800/600",
            title: "Golden Hour",
            yearOfMaking: "2021",
            description: "Photography print of a desert landscape at sunset.",
            pricingOptions: {
                currency: "GBP",
                sizesAndPrices: [
                    { size: "12×8 in", price: 90 },
                    { size: "24×16 in", price: 180 }
                ]
            },
            forte: "Photography",
            keywords: "photography,desert,sunset,golden",
            contactInfo: "artist8@example.com",
            showContactInfo: false,
            status: "draft"
        },
        {
            author: "60c72b2f9b1e8a5f4d8e7f41",
            image: "https://picsum.photos/id/109/800/600",
            title: "Industrial Echoes",
            yearOfMaking: "2024",
            description: "Mixed-media installation evoking factory sounds.",
            pricingOptions: {
                currency: "USD",
                sizesAndPrices: [
                    { size: "One-size", price: 1200 }
                ]
            },
            additionalInfo: "Includes sound playback module.",
            forte: "Installation Art",
            keywords: "installation,industrial,sound,evocative",
            contactInfo: "artist9@example.com",
            showContactInfo: true,
            status: "published"
        },
        {
            author: "60c72b2f9b1e8a5f4d8e7f42",
            image: "https://picsum.photos/id/110/800/600",
            title: "Geometric Precision",
            yearOfMaking: "2020",
            description: "Laser-cut wood panel with intricate geometric patterns.",
            pricingOptions: {
                currency: "INR",
                sizesAndPrices: [
                    { size: "24×24 in", price: 8000 },
                    { size: "36×36 in", price: 12000 }
                ]
            },
            forte: "Woodwork",
            keywords: "wood,laser-cut,geometric,precision",
            contactInfo: "artist10@example.com",
            showContactInfo: false,
            status: "published"
        },
        {
            author: "60c72b2f9b1e8a5f4d8e7f43",
            image: "https://picsum.photos/id/111/800/600",
            title: "Echoes of Time",
            yearOfMaking: "2023",
            description: "Photorealistic pencil drawing of an antique clock.",
            pricingOptions: {
                currency: "USD",
                sizesAndPrices: [
                    { size: "18×18 in", price: 220 },
                    { size: "24×24 in", price: 350 }
                ]
            },
            forte: "Pencil Drawing",
            keywords: "pencil,photorealistic,antique,clock",
            contactInfo: "artist11@example.com",
            showContactInfo: true,
            status: "published"
        },
        {
            author: "60c72b2f9b1e8a5f4d8e7f44",
            image: "https://picsum.photos/id/112/800/600",
            title: "Whispering Waves",
            yearOfMaking: "2022",
            description: "Ceramic sculpture inspired by ocean currents.",
            pricingOptions: {
                currency: "EUR",
                sizesAndPrices: [
                    { size: "Medium", price: 450 },
                    { size: "Large", price: 750 }
                ]
            },
            additionalInfo: "Hand-glazed finish.",
            forte: "Ceramics",
            keywords: "ceramic,ocean,waves,sculpture",
            contactInfo: "artist12@example.com",
            showContactInfo: false,
            status: "draft"
        },
        {
            author: "60c72b2f9b1e8a5f4d8e7f45",
            image: "https://picsum.photos/id/113/800/600",
            title: "Cosmic Ballet",
            yearOfMaking: "2024",
            description: "Digital animation still capturing a dance of galaxies.",
            pricingOptions: {
                currency: "USD",
                sizesAndPrices: [
                    { size: "Print (16×16 in)", price: 140 },
                    { size: "Canvas (24×24 in)", price: 260 }
                ]
            },
            forte: "Digital Animation",
            keywords: "digital,animation,space,galaxies",
            contactInfo: "artist13@example.com",
            showContactInfo: true,
            status: "published"
        },
        {
            author: "60c72b2f9b1e8a5f4d8e7f46",
            image: "https://picsum.photos/id/114/800/600",
            title: "Echoes of the Forest",
            yearOfMaking: "2021",
            description: "Sound sculpture using natural wood and field recordings.",
            pricingOptions: {
                currency: "GBP",
                sizesAndPrices: [
                    { size: "Standard", price: 500 },
                    { size: "Deluxe", price: 950 }
                ]
            },
            additionalInfo: "Includes playback device.",
            forte: "Sound Art",
            keywords: "sound,forest,sculpture,natural",
            contactInfo: "artist14@example.com",
            showContactInfo: false,
            status: "published"
        },
        {
            author: "60c72b2f9b1e8a5f4d8e7f47",
            image: "https://picsum.photos/id/115/800/600",
            title: "Spectrum Shift",
            yearOfMaking: "2023",
            description: "Interactive light installation responding to viewer movement.",
            pricingOptions: {
                currency: "USD",
                sizesAndPrices: [
                    { size: "Installation Kit", price: 2000 }
                ]
            },
            additionalInfo: "Requires USB power supply.",
            forte: "Interactive Installation",
            keywords: "interactive,light,installation,movement",
            contactInfo: "artist15@example.com",
            showContactInfo: true,
            status: "draft"
        }
    ]

    return (
        <section id="marketplace" className="py-16 px-8 max-w-7xl mx-auto">
            <h2 className="text-[2.5rem] font-bold text-center mb-12 text-gray-700">
                Featured Marketplace
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {newData.slice(0, 4).map((it, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transform hover:-translate-y-2 transition duration-[0.3s] ease-in-out"
                    >
                        <div className="relative h-52 overflow-hidden">
                            <img
                                src={it.image}
                                alt={it.title}
                                className="object-cover w-full h-full"
                            />
                            {/* Show the starting price */}
                            <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-md font-semibold">
                                {`${it.pricingOptions.currency} ${it.pricingOptions.sizesAndPrices[0].price}`}
                            </div>
                        </div>
                        <div className="p-6 flex flex-col justify-between">
                            <div>
                                <h4 className="font-bold text-lg mb-1">{it.title}</h4>
                                <p className="text-gray-600 text-sm mb-1">{it.forte}</p>
                                <p className="text-gray-500 text-sm mb-4">{it.description}</p>
                                <p className="text-xs text-gray-400 mb-2">Year: {it.yearOfMaking}</p>
                            </div>
                            {it.showContactInfo && (
                                <p className="text-xs text-gray-400 mb-2">
                                    Contact: {it.contactInfo}
                                </p>
                            )}
                            <button className="mt-4 w-full py-3 text-sm bg-blue-500 text-white rounded-full font-semibold transition hover:bg-blue-600">
                                Add to Collection
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FeaturedMarketplace;