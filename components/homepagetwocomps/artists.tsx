import React from 'react'

const FeaturedArtists = () => {
    const artists = [
        { name: 'Reshma Venkatraman', type: 'Acrylic Artist', location: 'Bangalore, India', followers: '1500+', img: 'https://randomuser.me/api/portraits/women/1.jpg' },
        { name: 'Kiran Nayak', type: '2D Digital Painter', location: 'Mangalore, India', followers: '1500+', img: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { name: 'Bharat Sharma', type: 'Video Editor', location: 'New Delhi, India', followers: '150+', img: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { name: 'Priya Sharma', type: 'Ceramic Artist', location: 'Jaipur, India', followers: '2200+', img: 'https://randomuser.me/api/portraits/women/4.jpg' },
        { name: 'Arjun Mehta', type: 'Textile Designer', location: 'Mumbai, India', followers: '890+', img: 'https://randomuser.me/api/portraits/men/5.jpg' },
        { name: 'Meera Patel', type: 'Sculptor', location: 'Ahmedabad, India', followers: '1800+', img: 'https://randomuser.me/api/portraits/women/6.jpg' },
    ];
    return (
        <section id="artists" className="py-16 px-8 max-w-7xl mx-auto">
            <h2 className="text-[2.5rem] font-bold text-center mb-12 text-gray-700">Featured Artists</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {artists.map((a, idx) => (
                    <div key={idx} className="bg-white rounded-[20px] shadow-lg overflow-hidden transform transition hover:-translate-y-2 duration-[0.3s] ease-in-out hover:shadow-2xl">
                        <div className="relative h-72 bg-gradient-to-tr from-[#f093fb] to-[#f5576c]">
                            <div className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2.5 rounded-full text-sm font-semibold">
                                {a.followers} Followers
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <img src={a.img} alt={a.name} className="w-10 h-10 rounded-full border border-gray-200 shadow-sm object-cover" />
                                <h3 className="text-lg font-bold">{a.name}</h3>
                            </div>
                            <p className="text-blue-500 font-semibold mb-1">{a.type}</p>
                            <p className="text-gray-500 text-sm">📍 {a.location}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FeaturedArtists;