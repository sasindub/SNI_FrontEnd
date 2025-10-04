export const laptops = [
  {
    id: 1,
    name: "SNI Phantom X1",
    category: "Gaming",
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

export const categories = ["All", "Gaming", "Professional", "Content Creation"];

export const priceRanges = [
  { label: "Under $1,500", min: 0, max: 1500 },
  { label: "$1,500 - $2,000", min: 1500, max: 2000 },
  { label: "$2,000 - $2,500", min: 2000, max: 2500 },
  { label: "$2,500+", min: 2500, max: Infinity }
];
