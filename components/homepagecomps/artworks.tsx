const LatestArtworks = () => {
    const artworks = [
        { title: 'Abstract Serenity', artist: 'Reshma Venkatraman', height: 'h-[350px]', gradient: 'from-[#ff9a9e] to-[#fecfef]' },
        { title: 'Digital Dreams', artist: 'Kiran Nayak', height: 'h-[250px]', gradient: 'from-[#667eea] to-[#764ba2]' },
        { title: 'Ceramic Harmony', artist: 'Priya Sharma', height: 'h-[300px]', gradient: 'from-[#f093fb] to-[#f5576c]' },
        { title: 'Ocean Waves', artist: 'Arjun Mehta', height: 'h-[230px]', gradient: 'from-[#4facfe] to-[#00f2fe]' },
        { title: "Nature's Embrace", artist: 'Meera Patel', height: 'h-[370px]', gradient: 'from-[#43e97b] to-[#38f9d7]' },
        { title: 'Sunset Glory', artist: 'Bharat Sharma', height: 'h-[270px]', gradient: 'from-[#fa709a] to-[#fee140]' },
    ];
    return (
        <section id="artworks" className="py-16 px-8 max-w-7xl mx-auto">
            <h2 className="text-[2.5rem] font-bold text-center mb-12 text-gray-700">Latest Artworks</h2>
            <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
                {artworks.map((art, i) => (
                    <div key={i} className="bg-white rounded-xl overflow-hidden break-inside-avoid shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-[0.3s] ease-in-out">
                        <div className={`${art.height} bg-gradient-to-r ${art.gradient}`}></div>
                        <div className="p-4">
                            <h4 className="font-semibold mb-1">{art.title}</h4>
                            <p className="text-gray-600 text-sm">by {art.artist}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default LatestArtworks;