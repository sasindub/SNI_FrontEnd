// Import E18 images (Gray)
import E18_1 from '../assets/laptops/E18/Copy of XG8A2450.jpg';
import E18_2 from '../assets/laptops/E18/Copy of XG8A2453.jpg';
import E18_3 from '../assets/laptops/E18/Copy of XG8A2454.jpg';
import E18_4 from '../assets/laptops/E18/Copy of XG8A2456.jpg';
import E18_5 from '../assets/laptops/E18/Copy of XG8A2459.jpg';
import E18_6 from '../assets/laptops/E18/Copy of XG8A2479.jpg';
import E18_7 from '../assets/laptops/E18/Copy of XG8A2481.jpg';

// Import E180i7 images (Black)
import E180i7_1 from '../assets/laptops/E180i7/Copy of XG8A2467.jpg';
import E180i7_2 from '../assets/laptops/E180i7/Copy of XG8A2469.jpg';
import E180i7_3 from '../assets/laptops/E180i7/Copy of XG8A2470.jpg';
import E180i7_4 from '../assets/laptops/E180i7/Copy of XG8A2472.jpg';
import E180i7_5 from '../assets/laptops/E180i7/Copy of XG8A2473.jpg';
import E180i7_6 from '../assets/laptops/E180i7/Copy of XG8A2474.jpg';
import E180i7_7 from '../assets/laptops/E180i7/Copy of XG8A2483.jpg';

export const laptops = [
  {
    id: 1,
    name: "SNL CoreBook E18",
    model: "TK-E18",
    category: "Professional",
    deviceType: "laptop",
    image: E18_1,
    images: [E18_1, E18_2, E18_3, E18_4, E18_5, E18_6, E18_7],
    specs: {
      brand: "SNL",
      platform: "Intel Core I7-13620H",
      display: "15.6\" 1920*1080",
      ram: "16GB RAM",
      storage: "512GB SSD",
      os: "Windows 11 Pro",
      io: "2*USB 3.2 Gen 1, 1x HDMI, 1x RJ45, 1x Earphone jack, 1x Micro SD slot",
      wireless: "Wireless 802.11 a/f/g/n/ac + Bluetooth",
      power: "PD 65W fast charger",
      dimension: "357.5*229.5*19.5mm",
      color: "Gray",
      weight: "1.65kg",
      gpu: "GPU INTEGRATED",
      battery: "3Cell 5000mAH 11.4v"
    },
    features: ["Intel Core i7-13620H", "Windows 11 Pro", "16GB RAM / 512GB SSD"],
    rating: 4.8,
    reviews: 156
  },
  {
    id: 2,
    name: "SNL CoreBook E180i7",
    model: "TK-E180i7",
    category: "Professional",
    deviceType: "laptop",
    image: E180i7_1,
    images: [E180i7_1, E180i7_2, E180i7_3, E180i7_4, E180i7_5, E180i7_6, E180i7_7],
    specs: {
      brand: "SNL",
      platform: "Intel Core I7-13620H",
      display: "15.6\" 1920*1080",
      ram: "16GB RAM",
      storage: "512GB SSD",
      os: "Windows 11 Pro",
      io: "3*USB 3.2 Gen 1, 1x HDMI, 1x RJ45, 1*TYPE C 3.2 Gen 1, 1x Earphone jack, 1x Micro SD slot",
      wireless: "Wireless 802.11 a/f/g/n/ac + Bluetooth",
      power: "PD 65W fast charger",
      dimension: "357.5*229.5*19.5mm",
      color: "Black",
      weight: "1.65kg",
      gpu: "GPU INTEGRATED",
      battery: "3Cell 5000mAH 11.4v"
    },
    features: ["Intel Core i7-13620H", "Windows 11 Pro", "16GB RAM / 512GB SSD"],
    rating: 4.8,
    reviews: 142
  }
];

export const pcs = [
  {
    id: 7,
    name: "SNI Tower Pro",
    category: "Gaming",
    deviceType: "pc",
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

export const accessories = [
  {
    id: 13,
    name: "SNI Gaming Mouse Pro",
    category: "Gaming",
    deviceType: "accessory",
    image: require("../assets/products/Accessories.jpg"),
    specs: {
      sensor: "Optical 16000 DPI",
      connectivity: "Wireless + Wired",
      battery: "50 hours",
      buttons: "Programmable RGB",
      weight: "85g"
    },
    features: ["RGB Lighting", "Wireless", "Ergonomic"],
    rating: 4.8,
    reviews: 156
  },
  {
    id: 14,
    name: "SNI Mechanical Keyboard",
    category: "Professional",
    deviceType: "accessory",
    image: require("../assets/products/Accessories.jpg"),
    specs: {
      switches: "Cherry MX Blue",
      connectivity: "USB-C",
      backlight: "RGB Per-key",
      layout: "Full Size",
      material: "Aluminum Frame"
    },
    features: ["Mechanical Switches", "RGB Backlight", "Durable Build"],
    rating: 4.7,
    reviews: 89
  }
];

export const allInOne = [
  {
    id: 15,
    name: "SNI All-in-One Pro",
    category: "Professional",
    deviceType: "all-in-one",
    image: require("../assets/products/AllinOne.png"),
    specs: {
      cpu: "Intel Core i7-13700",
      gpu: "Intel Iris Xe",
      ram: "16GB DDR4",
      storage: "512GB NVMe SSD",
      display: "27\" 4K Touch",
      connectivity: "WiFi 6 + Bluetooth"
    },
    features: ["4K Touch Display", "Space Saving", "Modern Design"],
    rating: 4.6,
    reviews: 73
  }
];

export const kidsTablets = [
  {
    id: 16,
    name: "SNI KidsPad",
    category: "Educational",
    deviceType: "kids-tablet",
    image: require("../assets/products/kidsTablet.png"),
    specs: {
      display: "10.1\" HD",
      storage: "32GB",
      battery: "8 hours",
      parental: "Parental Controls",
      durability: "Shock Resistant"
    },
    features: ["Educational Apps", "Parental Controls", "Durable Design"],
    rating: 4.5,
    reviews: 234
  }
];

export const miniPcs = [
  {
    id: 17,
    name: "SNI Mini Station",
    category: "Professional",
    deviceType: "mini-pc",
    image: require("../assets/products/miniPc.jpg"),
    specs: {
      cpu: "Intel Core i5-12400",
      gpu: "Intel UHD Graphics",
      ram: "8GB DDR4",
      storage: "256GB NVMe SSD",
      size: "Compact 4x4 inches",
      connectivity: "WiFi 6 + Ethernet"
    },
    features: ["Compact Size", "Low Power", "Silent Operation"],
    rating: 4.7,
    reviews: 112
  }
];

export const tabletPcs = [
  {
    id: 18,
    name: "SNI Tablet Pro",
    category: "Professional",
    deviceType: "tablet-pc",
    image: require("../assets/products/tabletPc.jpg"),
    specs: {
      display: "13.3\" 2K Touch",
      cpu: "Intel Core i5-1235U",
      ram: "8GB LPDDR4",
      storage: "512GB NVMe SSD",
      battery: "12 hours",
      connectivity: "WiFi 6 + 4G LTE"
    },
    features: ["Touch Interface", "Detachable Keyboard", "Long Battery"],
    rating: 4.6,
    reviews: 89
  }
];

export const allProducts = [...laptops, ...pcs, ...ipods, ...accessories, ...allInOne, ...kidsTablets, ...miniPcs, ...tabletPcs];

export const categories = ["All", "Gaming", "Professional", "Content Creation", "Premium", "Portable", "Classic", "Educational"];
export const deviceTypes = ["All", "laptop", "pc", "ipod", "accessory", "all-in-one", "kids-tablet", "mini-pc", "tablet-pc"];

export const priceRanges = [
  { label: "Under $1,500", min: 0, max: 1500 },
  { label: "$1,500 - $2,000", min: 1500, max: 2000 },
  { label: "$2,000 - $2,500", min: 2000, max: 2500 },
  { label: "$2,500+", min: 2500, max: Infinity }
];
