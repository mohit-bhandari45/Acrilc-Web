const FeaturedMarketplace = () => {
    const items = [
        { title: 'Handcrafted Mandala Art', price: '₹15,999', desc: 'Beautiful intricate mandala painting with gold accents, perfect for meditation spaces.' },
        { title: 'Ceramic Vase Collection', price: '₹8,500', desc: 'Set of 3 handmade ceramic vases with unique textures and earth tones.' },
        { title: 'Bronze Sculpture', price: '₹25,000', desc: 'Limited edition bronze sculpture depicting classical Indian dance forms.' },
        { title: 'Handwoven Textile Art', price: '₹12,000', desc: 'Traditional handwoven textile with contemporary design elements.' },
    ];
    return (
        <section id="marketplace" className="py-16 px-8 max-w-7xl mx-auto">
            <h2 className="text-[2.5rem] font-bold text-center mb-12 text-gray-700">Featured Marketplace</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((it, j) => (
                    <div key={j} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transform hover:-translate-y-2 transition duration-[0.3s] ease-in-out">
                        <div className="relative h-52 bg-gradient-to-r from-indigo-400 to-purple-400">
                            <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-md font-semibold">
                                {it.price}
                            </div>
                        </div>
                        <div className="p-6 flex flex-col justify-between">
                            <div>
                                <h4 className="font-bold text-lg mb-2">{it.title}</h4>
                                <p className="text-gray-500 text-sm mb-4">{it.desc}</p>
                            </div>
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