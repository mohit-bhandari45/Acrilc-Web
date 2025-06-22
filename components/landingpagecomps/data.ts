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

export interface NewArtWork {
  title: string;
  artist: string;
  artistLink: string;
  price: string;
  category: string;
  desc: string;
  image: string;
  link: string;
}

export const newArtworks: NewArtWork[] = [
  {
    title: "Wall Art Zen Canvas Painting",
    artist: "Amoy Art",
    artistLink: "https://www.amazon.in/s?k=Amoy+Art&ref=bl_dp_s_web_0",
    price: "21,940",
    category: "Painting",
    desc: "Contemporary Pictures Modern Artwork for Bedroom Living Room Bathroom Decoration. 4 Panels Canvas Art Ready to Hang.",
    image: 'https://m.media-amazon.com/images/I/61nZEoWCD6L._SL1000_.jpg',
    link: "https://www.amazon.in/Art-Street-Tropical-Green-Framed-Canvas/dp/B07SXGK3MW"
  },
  {
    title: "Geometric Wood Wall Panels",
    artist: "WorkShopIdeasUA",
    artistLink: "https://www.etsy.com/in-en/shop/WorkShopIdeasUA?ref=shop-header-name&listing_id=1435680449&from_page=listing",
    price: "12,459+",
    category: "Woodwork",
    desc: "A set of three laser-cut birch plywood panels, finished with a protective matte varnish—modern, minimalist headboard or living-room décor.",
    image: 'https://i.etsystatic.com/13828341/r/il/7d9fa0/4708740350/il_1140xN.4708740350_kb22.jpg',
    link: "https://www.etsy.com/listing/1435680449/geometric-wood-wall-panels-set-of-3"
  },
  {
    title: 'MDF Framed 3D Wall Painting',
    artist: 'AMOHA SHOP',
    artistLink: 'https://www.amazon.in/s?k=AMOHA+SHOP&ref=bl_dp_s_web_0',
    price: '1,499',
    category: 'Painting',
    desc: 'AMOHA SHOP Set of Five MDF Framed 3D Wall Painting for Home Decoration, Big Size Painting for Living Room, Bedroom (24x50 inches) DR 18',
    image: 'https://m.media-amazon.com/images/I/81BCONaxj9L._SL1500_.jpg',
    link: 'https://www.amazon.in/AMOHA-SHOP-Painting-Decoration-Bedroom/dp/B0DBVT4JGZ/ref=sr_1_13?dib=eyJ2IjoiMSJ9.je49HoHFID-RoquQw3k4UCahsBE6nJPUC4aDTRpZmIFYPiZBEvu38koe04lt6WZCVeF3vt8YElv2tJY5TKQVW_pRRLmjeAucfnXos6GvJwli1zAcOqqNYARaTuEhzYXzqXTRy4yCfoueVtn6RT_xKYRP5lG5xUm4PhfXhTFrwZ4Xo68lY9VaypTgKLuU_WQ7OvQw-pB_5NDNtcYvSEjTd3UjSXZYlH0Svhazhhp9ryOShZcTm8CqN4-7svoL7IKHKQIIXtyn9IeO-8x-DtQBNLWAnfn-xitAiwQSmRsz_D8.yl3br-OpP0jcrLKfSXsxHB8FGjRYsWqf8WBBtl2Uaro&dib_tag=se&keywords=Amoy%2BArt&nsdOptOutParam=true&qid=1750525370&sr=8-13&th=1'
  },
  {
    title: '3D Wooden World Map',
    artist: 'WorkShopIdeasUA',
    artistLink: 'https://www.etsy.com/in-en/shop/WorkShopIdeasUA?ref=shop-header-name&listing_id=1435680449&from_page=listing',
    price: '7,081+',
    category: 'Woodwork',
    desc: '3D Wooden World Map, 5th Anniversary Gift, World Map Wall Art, Wall Decor, Housewarming Gift, Wedding Gift',
    image: 'https://i.etsystatic.com/13828341/r/il/ab15ad/4873016746/il_794xN.4873016746_c75y.jpg',
    link: 'https://www.etsy.com/in-en/listing/1473812767/3d-wooden-world-map-5th-anniversary-gift?ref=shop_home_feat_3&frs=1&logging_key=eaf5b0eb461e71a74af69e5c93703eb1718a6b66%3A1473812767'
  },
  {
    title: 'Kingfisher Ceramic Bird',
    artist: 'JehnCeramics',
    artistLink: 'https://www.etsy.com/in-en/shop/JehnCeramics?ref=shop-header-name&listing_id=590361226&from_page=listing',
    price: '4,302',
    category: 'Ceramic',
    desc: 'Kingfisher Ceramic Bird | Handmade Ceramic Figurine | Bird Lover Gift',
    image: 'https://i.etsystatic.com/17142610/r/il/d84dc5/1513005609/il_1140xN.1513005609_cunf.jpg',
    link: 'https://www.etsy.com/in-en/listing/590361226/kingfisher-ceramic-bird-handmade-ceramic?ls=s&ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=ceramic+artwork&ref=sr_gallery-1-2&sr_prefetch=1&etp=1&sts=1&content_source=ed45ade13db58fa55340d2097dd3b036f0065393%253A590361226&organic_search_click=1&logging_key=ed45ade13db58fa55340d2097dd3b036f0065393%3A590361226'
  },
  {
    title: 'Watches van gogh',
    artist: 'RedMadagaskar',
    artistLink: 'https://www.etsy.com/in-en/shop/RedMadagaskar?ref=shop-header-name&listing_id=593802746&from_page=listing',
    price: '1,345+',
    category: 'Jewelry',
    desc: "Watches van gogh, starry night watch, watch picture, watch art, women's watches, men's watches, blue watches, watch hand made",
    image: 'https://i.etsystatic.com/14462467/r/il/fc388b/2440348439/il_794xN.2440348439_kv0h.jpg',
    link: 'https://www.etsy.com/in-en/listing/593802746/watches-van-gogh-starry-night-watch?ls=s&ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=Jewelry+artwork&ref=sr_gallery-1-13&sr_prefetch=1&cns=1&content_source=ca680ae1bded9f66ec8c216c3e74bb17cb78806e%253A593802746&organic_search_click=1&logging_key=ca680ae1bded9f66ec8c216c3e74bb17cb78806e%3A593802746'
  },
  {
    title: 'White wall art triptych',
    artist: 'LouiseFultonStudio',
    artistLink: 'https://www.etsy.com/in-en/shop/LouiseFultonStudio?ref=shop-header-name&listing_id=1273109057&from_page=listing',
    price: '15,655',
    category: 'Ceramic',
    desc: 'White wall art triptych, handmade ceramic classic sculpture of face in three parts, hear no see no speak no evil',
    image: 'https://i.etsystatic.com/10954097/r/il/c32411/4029911566/il_794xN.4029911566_mri1.jpg',
    link: 'https://www.etsy.com/in-en/listing/1273109057/white-wall-art-triptych-handmade-ceramic?ls=s&ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=ceramic+artwork&ref=sr_gallery-1-44&sr_prefetch=1&etp=1&cns=1&sts=1&content_source=cff4bf5e3b230042b0ed3324330abbc2b082f3d2%253A1273109057&organic_search_click=1&logging_key=cff4bf5e3b230042b0ed3324330abbc2b082f3d2%3A1273109057'
  }
];

