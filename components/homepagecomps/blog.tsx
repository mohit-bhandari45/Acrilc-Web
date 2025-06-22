const Blog = () => {
    const posts = [
        {
            title: 'The Art of Sustainable Crafting',
            excerpt: 'Discover how modern artists are embracing eco-friendly materials and techniques to create stunning handcrafted pieces while preserving our planet.',
            author: 'Sambit Ghosh',
            readTime: '5 min read',
        },
        {
            title: 'AI and Authenticity in Art',
            excerpt: 'How artificial intelligence is revolutionizing the way we verify and celebrate authentic handcrafted art in the digital age.',
            author: 'Avantika',
            readTime: '7 min read',
        },
        {
            title: 'Building Your Artist Portfolio',
            excerpt: 'Essential tips for creating a compelling online portfolio that showcases your unique artistic vision and attracts potential buyers.',
            author: 'Sanpreet',
            readTime: '4 min read',
        },
    ];
    return (
        <section id="blog" className="py-16 px-8 max-w-7xl mx-auto">
            <h2 className="text-[2.5rem] font-bold text-center mb-12 text-gray-700">From Our Blog</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, idx) => (
                    <article
                        key={idx}
                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-[0.3s] ease-in-out"
                    >
                        <div className={`h-48 bg-gradient-to-r from-[#ff9a9e] to-[#fecfef]`}></div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                            <p className="text-gray-500 mb-6 text-sm">{post.excerpt}</p>
                            <div className="flex justify-between text-gray-500 text-xs">
                                <span>{post.author}</span>
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default Blog;