export const laptops = [
  {
    id: 1,
    name: "SNI Phantom X1",
    category: "Gaming",
    deviceType: "laptop",
    price: 2499,
    image: require("../assets/laptop-gaming.jpg"),
    specs: {
      cpu: "Intel Core i9-13900H",
      gpu: "RTX 4080",
      ram: "32GB DDR5",
      storage: "1TB NVMe SSD",
      display: "17.3\" 4K 144Hz",
      battery: "90Wh"
    },
    features: ["RGB Backlit Keyboard", "Advanced Cooling", "Premium Build"],
    rating: 4.9,
    reviews: 127
  },
  {
    id: 2,
    name: "SNI ProBook 15",
    category: "Professional",
    deviceType: "laptop",
    price: 1899,
    image: require("../assets/laptop-business.jpg"),
    specs: {
      cpu: "Intel Core i7-13700H",
      gpu: "RTX 4060",
      ram: "16GB DDR5",
      storage: "512GB NVMe SSD",
      display: "15.6\" 2K 120Hz",
      battery: "70Wh"
    },
    features: ["Business Grade Security", "All-Day Battery", "Sleek Design"],
    rating: 4.7,
    reviews: 89
  },
  {
    id: 3,
    name: "SNI Velocity V2",
    category: "Gaming",
    deviceType: "laptop",
    price: 3299,
    image: require("../assets/laptop-gaming.jpg"),
    specs: {
      cpu: "AMD Ryzen 9 7940HX",
      gpu: "RTX 4090",
      ram: "64GB DDR5",
      storage: "2TB NVMe SSD",
      display: "18\" 4K 165Hz",
      battery: "99Wh"
    },
    features: ["Liquid Cooling", "Mechanical Keyboard", "Premium Audio"],
    rating: 4.9,
    reviews: 156
  },
  {
    id: 4,
    name: "SNI WorkStation Pro",
    category: "Professional",
    deviceType: "laptop",
    price: 2799,
    image: require("../assets/laptop-workstation.jpg"),
    specs: {
      cpu: "Intel Core i9-13900HX",
      gpu: "RTX 4070",
      ram: "32GB DDR5",
      storage: "1TB NVMe SSD",
      display: "16\" 3K 120Hz",
      battery: "85Wh"
    },
    features: ["ISV Certified", "Enterprise Support", "Durable Build"],
    rating: 4.8,
    reviews: 73
  },
  {
    id: 5,
    name: "SNI Stream 14",
    category: "Content Creation",
    deviceType: "laptop",
    price: 1599,
    image: require("../assets/laptop-ultrabook.jpg"),
    specs: {
      cpu: "AMD Ryzen 7 7735HS",
      gpu: "RTX 4050",
      ram: "16GB DDR5",
      storage: "512GB NVMe SSD",
      display: "14\" 2.8K 90Hz",
      battery: "65Wh"
    },
    features: ["Color Accurate Display", "Lightweight", "Creator Tools"],
    rating: 4.6,
    reviews: 94
  },
  {
    id: 6,
    name: "SNI Elite X1",
    category: "Gaming",
    deviceType: "laptop",
    price: 1999,
    image: require("../assets/laptop-gaming.jpg"),
    specs: {
      cpu: "Intel Core i7-13650HX",
      gpu: "RTX 4070",
      ram: "16GB DDR5",
      storage: "1TB NVMe SSD",
      display: "15.6\" 2K 165Hz",
      battery: "80Wh"
    },
    features: ["High Refresh Rate", "Advanced RGB", "Optimized Gaming"],
    rating: 4.7,
    reviews: 112
  }
];

export const pcs = [
  {
    id: 7,
    name: "SNI Tower Pro",
    category: "Gaming",
    deviceType: "pc",
    price: 3299,
    image: require("../assets/laptop-workstation.jpg"),
    specs: {
      cpu: "Intel Core i9-13900K",
      gpu: "RTX 4090",
      ram: "64GB DDR5",
      storage: "2TB NVMe SSD",
      display: "Support 4K 144Hz",
      power: "1000W 80+ Gold"
    },
    features: ["Liquid Cooling", "RGB Lighting", "Premium Case"],
    rating: 4.9,
    reviews: 89
  },
  {
    id: 8,
    name: "SNI Compact Mini",
    category: "Professional",
    deviceType: "pc",
    price: 1899,
    image: require("../assets/laptop-business.jpg"),
    specs: {
      cpu: "Intel Core i7-13700",
      gpu: "RTX 4060",
      ram: "32GB DDR5",
      storage: "1TB NVMe SSD",
      display: "Support 4K 60Hz",
      power: "650W 80+ Gold"
    },
    features: ["Compact Design", "Quiet Operation", "Business Ready"],
    rating: 4.7,
    reviews: 156
  },
  {
    id: 9,
    name: "SNI Creator Station",
    category: "Content Creation",
    deviceType: "pc",
    price: 4599,
    image: require("../assets/laptop-workstation.jpg"),
    specs: {
      cpu: "AMD Ryzen 9 7950X",
      gpu: "RTX 4080",
      ram: "128GB DDR5",
      storage: "4TB NVMe SSD",
      display: "Support 8K 60Hz",
      power: "1200W 80+ Platinum"
    },
    features: ["8K Ready", "Professional Grade", "Creator Optimized"],
    rating: 4.9,
    reviews: 73
  }
];

export const ipods = [
  {
    id: 10,
    name: "SNI Pod Pro",
    category: "Premium",
    deviceType: "ipod",
    price: 399,
    image: require("../assets/laptop-ultrabook.jpg"),
    specs: {
      storage: "256GB",
      battery: "40 hours",
      display: "3.5\" Retina",
      audio: "Lossless Audio",
      connectivity: "WiFi + Bluetooth",
      water: "IPX7 Waterproof"
    },
    features: ["Lossless Audio", "Premium Build", "Long Battery"],
    rating: 4.8,
    reviews: 234,
    isPreOrder: true
  },
  {
    id: 11,
    name: "SNI Pod Air",
    category: "Portable",
    deviceType: "ipod",
    price: 299,
    image: require("../assets/laptop-ultrabook.jpg"),
    specs: {
      storage: "128GB",
      battery: "30 hours",
      display: "3.2\" HD",
      audio: "High-Res Audio",
      connectivity: "Bluetooth 5.0",
      water: "IPX5 Water Resistant"
    },
    features: ["Lightweight", "Wireless", "Affordable"],
    rating: 4.6,
    reviews: 189,
    isPreOrder: true
  },
  {
    id: 12,
    name: "SNI Pod Classic",
    category: "Classic",
    deviceType: "ipod",
    price: 199,
    image: require("../assets/laptop-ultrabook.jpg"),
    specs: {
      storage: "64GB",
      battery: "25 hours",
      display: "2.8\" LCD",
      audio: "Standard Audio",
      connectivity: "USB-C",
      water: "Basic Protection"
    },
    features: ["Classic Design", "Simple Interface", "Budget Friendly"],
    rating: 4.4,
    reviews: 145,
    isPreOrder: false
  }
];

export const allProducts = [...laptops, ...pcs, ...ipods];

export const categories = ["All", "Gaming", "Professional", "Content Creation", "Premium", "Portable", "Classic"];
export const deviceTypes = ["All", "laptop", "pc", "ipod"];

export const priceRanges = [
  { label: "Under $1,500", min: 0, max: 1500 },
  { label: "$1,500 - $2,000", min: 1500, max: 2000 },
  { label: "$2,000 - $2,500", min: 2000, max: 2500 },
  { label: "$2,500+", min: 2500, max: Infinity }
];
