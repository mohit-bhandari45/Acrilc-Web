export interface Artwork {
  title: string;
  artist: string;
  price: string;
  category: string;
  desc: string;
  svg: string;
}

export const heroImages = [
    "https://i.ibb.co/SwkLzLNd/image-from-rawpixel-id-3848165-jpeg.jpg",
    "https://i.ibb.co/m51z94Hk/image-from-rawpixel-id-8961718-original.jpg",
    "https://i.ibb.co/6SCZnCG/image-from-rawpixel-id-3076119-jpeg.jpg",
    "https://i.ibb.co/vCYWQwG4/image-from-rawpixel-id-3844930-jpeg-1.jpg",
    "https://i.ibb.co/n2qqdMR/image-from-rawpixel-id-3049257-jpeg.jpg",
    "https://i.ibb.co/1G838n7r/image-from-rawpixel-id-6033811-original.jpg",
    "https://i.ibb.co/LdJc3CVJ/image-from-rawpixel-id-3848277-jpeg.jpg",
];

export const artworks: Artwork[] = [
    {
      title: "Concentric Harmony",
      artist: "Mira Chen",
      price: "420",
      category: "Ceramic",
      desc: "A mesmerizing piece that explores the beauty of symmetry and color through concentric forms.",
      svg: `<svg width="80" height="80"><circle cx="40" cy="40" r="36" fill="#E2725B"/><circle cx="40" cy="40" r="24" fill="#D4A373"/><circle cx="40" cy="40" r="12" fill="#2C3E50"/></svg>`,
    },
    {
      title: "Nested Squares",
      artist: "James Wilson",
      price: "350",
      category: "Woodwork",
      desc: "A geometric exploration of space and depth, crafted with precision and care.",
      svg: `<svg width="80" height="80"><rect x="60" y="30" width="60" height="black" fill="black"/><rect x="20" y="20" width="40" height="40" fill="#D4A373"/><rect x="30" y="30" width="20" height="20" fill="#E2725B"/></svg>`,
    },
    {
      title: "Linear Composition",
      artist: "Thomas Reed",
      price: "520",
      category: "Painting",
      desc: "A study in minimalism and rhythm, this piece uses line and color to evoke movement and balance.",
      svg: `<svg width="80" height="80"><rect x="20" y="20" width="40" height="6" fill="#E2725B"/><rect x="20" y="34" width="40" height="6" fill="#D4A373"/><rect x="20" y="48" width="40" height="6" fill="#2C3E50"/></svg>`,
    },
    {
      title: "Diamond Layers",
      artist: "Sofia Mendez",
      price: "390",
      category: "Jewelry",
      desc: "A striking piece that layers geometric forms to create a sense of depth and intrigue.",
      svg: `<svg width="80" height="80"><rect x="20" y="20" width="40" height="40" fill="#2C3E50"/><rect x="30" y="30" width="20" height="20" fill="#E2725B"/></svg>`,
    },
  ];