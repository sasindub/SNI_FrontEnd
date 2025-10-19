import React, { useState, useMemo, useEffect, useRef } from "react";
import SearchAndFilter from "../components/SearchAndFilter";
import LaptopCard from "../components/LaptopCard";
import QuickViewModal from "../components/QuickViewModal";
import PdfModal from "../components/PdfModal";
import OrderModal from "../components/OrderModal";
import PdfViewerModal from "../components/PdfViewerModal";
import { allProducts } from "../data/laptops";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    priceRange: null,
    deviceType: "All",
  });
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderProduct, setOrderProduct] = useState(null);
  const [pdfModal, setPdfModal] = useState({ isOpen: false, pdfUrl: '', title: '' });
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch =
        searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Object.values(product.specs).some((spec) =>
          String(spec).toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        product.features.some((feature) =>
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        filters.category === "All" || product.category === filters.category;

      const matchesDeviceType =
        filters.deviceType === "All" ||
        product.deviceType === filters.deviceType;

      const matchesPrice =
        !filters.priceRange ||
        (product.price >= filters.priceRange.min &&
          product.price < filters.priceRange.max);

      return (
        matchesSearch && matchesCategory && matchesDeviceType && matchesPrice
      );
    });
  }, [searchTerm, filters]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleQuickView = (product) => {
    setSelectedLaptop(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLaptop(null);
  };

  const handleOrder = (product) => {
    setOrderProduct(product);
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
    setOrderProduct(null);
  };

  const openPdfModal = (pdfType) => {
    let pdfUrl = '';
    let title = '';
    
    switch(pdfType) {
      case 'privacy':
        pdfUrl = require('../assets/privacypolicy.pdf');
        title = 'Privacy Policy';
        break;
      case 'terms':
        pdfUrl = require('../assets/tandc.pdf');
        title = 'Terms & Conditions';
        break;
      case 'cookies':
        pdfUrl = require('../assets/cookiespolicy.pdf');
        title = 'Cookies Policy';
        break;
      default:
        return;
    }
    
    setPdfModal({ isOpen: true, pdfUrl, title });
  };

  const closePdfModal = () => {
    setPdfModal({ isOpen: false, pdfUrl: '', title: '' });
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById("products-section");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Feature cards data
  const featureCards = [
    {
      title: "Lightning Fast",
      description:
        "Latest Intel & AMD processors with cutting-edge graphics for seamless performance.",
      stat: "23x",
      statLabel: "Faster Performance",
      color: "gray",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
    },
    {
      title: "Sleek Design",
      description:
        "Premium materials for a stylish, durable, and lightweight build.",
      stat: "100%",
      statLabel: "Premium",
      color: "gray",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      title: "All-Day Battery",
      description:
        "Long-lasting battery keeps you productive from morning to night.",
      stat: "18h",
      statLabel: "Extended Battery Life",
      color: "gray",
      icon: "M3.75 6.75h16.5M3.75 6.75C2.784 6.75 2 7.534 2 8.5v7c0 .966.784 1.75 1.75 1.75h16.5A1.75 1.75 0 0022 15.5v-7c0-.966-.784-1.75-1.75-1.75M3.75 6.75v-.5c0-.966.784-1.75 1.75-1.75h.5m15 0h.5c.966 0 1.75.784 1.75 1.75v.5M6 10.5h2.25M6 13.5h2.25M18 12a.75.75 0 100-1.5.75.75 0 000 1.5z",
    },
    {
      title: "Immersive Display",
      description:
        "High-resolution screens with vibrant colors for work and play.",
      stat: "2x",
      statLabel: "Brighter Display",
      color: "gray",
      icon: "M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25",
    },
    {
      title: "Next-Level Connectivity",
      description:
        "Wi-Fi 6, Thunderbolt, and multiple ports for fast, reliable connections.",
      stat: "Wi-Fi 6",
      statLabel: "Fast Connection",
      color: "gray",
      icon: "M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z",
    },
    {
      title: "24/7 Support",
      description: "Anytime customer service to ensure peace of mind.",
      stat: "24/7",
      statLabel: "Available",
      color: "gray",
      icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z",
    },
    {
      title: "Faster Performance",
      description: "Revolutionary processing power for smooth multitasking.",
      stat: "AI",
      statLabel: "Powered",
      color: "gray",
      icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z",
    },
    {
      title: "Center Stage Camera",
      description:
        "Advanced camera with Desk View for professional video calls.",
      stat: "12MP",
      statLabel: "HD Camera",
      color: "gray",
      icon: "M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z",
    },
  ];

  const colorClasses = {
    blue: {
      bg: "from-gray-50 to-gray-100",
      border: "border-black",
      iconBg: "bg-blue-600",
      text: "text-blue-600",
    },
    green: {
      bg: "from-gray-50 to-gray-100",
      border: "border-black",
      iconBg: "bg-green-600",
      text: "text-green-600",
    },
    gray: {
      bg: "from-gray-50 to-gray-100",
      border: "border-black",
      iconBg: "bg-gray-800",
      text: "text-gray-800",
    },
    purple: {
      bg: "from-gray-50 to-gray-100",
      border: "border-black",
      iconBg: "bg-purple-600",
      text: "text-purple-600",
    },
    orange: {
      bg: "from-gray-50 to-gray-100",
      border: "border-black",
      iconBg: "bg-orange-600",
      text: "text-orange-600",
    },
    teal: {
      bg: "from-gray-50 to-gray-100",
      border: "border-black",
      iconBg: "bg-teal-600",
      text: "text-teal-600",
    },
    red: {
      bg: "from-gray-50 to-gray-100",
      border: "border-black",
      iconBg: "bg-red-600",
      text: "text-red-600",
    },
    indigo: {
      bg: "from-gray-50 to-gray-100",
      border: "border-black",
      iconBg: "bg-indigo-600",
      text: "text-indigo-600",
    },
  };

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3);
  };

  // Auto-scroll for features section with smooth looping
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const learnMoreRef = useRef(null);
  const topProductsRef = useRef(null);
  const allProductsRef = useRef(null);

  const scrollHorizontally = (ref, delta) => {
    if (ref && ref.current) {
      ref.current.scrollBy({ left: delta, behavior: "smooth" });
    }
  };

  // Resolve video source with env override and robust fallback
  const rawVideoEnv = (process.env.REACT_APP_PRODUCTION_VIDEO_URL || "").trim();
  const videoSrc = rawVideoEnv
    ? rawVideoEnv.startsWith("http")
      ? rawVideoEnv
      : `${process.env.PUBLIC_URL || ""}${
          rawVideoEnv.startsWith("/") ? "" : "/"
        }${rawVideoEnv}`
    : `${process.env.PUBLIC_URL || ""}/productionVid.mp4`;

  useEffect(() => {
    const scrollContainer = document.getElementById("features-scroll");
    if (!scrollContainer) return;
    scrollContainerRef.current = scrollContainer;

    let animationId;
    const scrollSpeed = 1.2; // Smooth scrolling speed

    const smoothScroll = () => {
      if (!isPaused && scrollContainerRef.current) {
        scrollPositionRef.current += scrollSpeed;
        const maxScroll =
          scrollContainerRef.current.scrollWidth -
          scrollContainerRef.current.clientWidth;

        // Smooth loop: reset to start when reaching end
        if (scrollPositionRef.current >= maxScroll) {
          scrollPositionRef.current = 0;
        }

        scrollContainerRef.current.scrollLeft = scrollPositionRef.current;
      }
      animationId = requestAnimationFrame(smoothScroll);
    };

    animationId = requestAnimationFrame(smoothScroll);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused]);

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="mb-0">
                <div className="flex items-center justify-center lg:justify-start mb-0">
                  <img
                    src={require("../assets/snl_logo.png")}
                    alt="SNI Logo"
                    className="w-40 h-40 md:w-38 md:h-38 object-contain"
                    style={{
                      filter:
                        "brightness(0) saturate(100%) invert(17%) sepia(94%) saturate(7151%) hue-rotate(358deg) brightness(91%) contrast(118%)",
                    }}
                  />
                </div>
                <h1
                  className="text-3xl md:text-4xl font-light text-gray-600 tracking-tight"
                  style={{ marginTop: "-20px" }}
                >
                  From Imagination to Innovation <br /> SNL Makes It Real.
                </h1>
              </div>

              <p className="text-xl text-gray-600 mb-12 max-w-2xl leading-relaxed mt-2">
                Your Perfect Device Awaits — Discover Our Premium Selection
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={scrollToProducts}
                  className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 text-lg transform hover:scale-105"
                >
                  Shop Now
                </button>
                <button
                  onClick={() => setIsPdfModalOpen(true)}
                  className="px-8 py-3 text-blue-600 hover:text-blue-700 transition-all duration-300 text-lg border border-blue-600 rounded-full hover:bg-blue-50"
                >
                  Learn more
                </button>
              </div>
            </div>

            {/* Right Content - Laptop Showcase */}
            <div className="relative">
              <div className="relative animate-float">
                <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center overflow-hidden">
                  <img
                    src={require("../assets/laptop-gaming.jpg")}
                    alt="SNI Laptop"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>

                {/* Floating Specs */}
                <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Processor</div>
                  <div className="text-lg font-semibold text-black">
                    Intel Core i9
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Memory</div>
                  <div className="text-lg font-semibold text-black">
                    32GB RAM
                  </div>
                </div>

                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Graphics</div>
                  <div className="text-lg font-semibold text-black">
                    RTX 4080
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Carousel Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-4 tracking-tight">
              Explore Our <span className="text-blue-600">Device Range</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your Perfect Device Awaits — Discover Our Premium Selection
            </p>
          </div>

          {/* Product Carousel */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-50 to-gray-100 group">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {/* Laptop Slide */}
              <div className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-12">
                  <div>
                    <h3 className="text-4xl font-light text-black mb-4">
                      SNI Phantom X1
                    </h3>
                    <p className="text-xl text-gray-600 mb-6">Gaming Beast</p>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">
                          Intel Core i9 12th Gen
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">NVIDIA RTX 4080</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">32GB DDR5 RAM</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">1TB NVMe SSD</span>
                      </div>
                    </div>
                    <div className="text-3xl font-light text-black mb-6">
                      From $2,499
                    </div>
                    <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300">
                      Shop Now
                    </button>
                  </div>
                  <div className="relative">
                    <img
                      src={require("../assets/laptop-gaming.jpg")}
                      alt="SNI Phantom X1"
                      className="w-full h-80 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* PC Slide */}
              <div className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-12">
                  <div>
                    <h3 className="text-4xl font-light text-black mb-4">
                      SNI Tower Pro
                    </h3>
                    <p className="text-xl text-gray-600 mb-6">
                      Professional Power
                    </p>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-gray-700">
                          AMD Ryzen 9 7000 Series
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-gray-700">NVIDIA RTX 4090</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-gray-700">64GB DDR5 RAM</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-gray-700">2TB NVMe SSD</span>
                      </div>
                    </div>
                    <div className="text-3xl font-light text-black mb-6">
                      From $3,299
                    </div>
                    <button className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300">
                      Shop Now
                    </button>
                  </div>
                  <div className="relative">
                    <img
                      src={require("../assets/laptop-workstation.jpg")}
                      alt="SNI Tower Pro"
                      className="w-full h-80 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* iPod Slide */}
              <div className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-12">
                  <div>
                    <h3 className="text-4xl font-light text-black mb-4">
                      SNI Pod Pro
                    </h3>
                    <p className="text-xl text-gray-600 mb-6">Premium Audio</p>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-gray-700">
                          Lossless Audio Quality
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-gray-700">
                          Premium Build Quality
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-gray-700">Long Battery Life</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-gray-700">
                          Wireless Connectivity
                        </span>
                      </div>
                    </div>
                    <div className="text-3xl font-light text-black mb-6">
                      From $399
                    </div>
                    <button className="px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all duration-300">
                      Pre-Order Now
                    </button>
                  </div>
                  <div className="relative">
                    <img
                      src={require("../assets/laptop-ultrabook.jpg")}
                      alt="SNI Pod Pro"
                      className="w-full h-80 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Navigation */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-blue-600 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Colors & Specs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-4 tracking-tight">
              Explore Our <span className="text-blue-600">Product Lineup</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium colors, powerful specifications — tailored for you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Colors */}
            <div>
              <h3 className="text-2xl font-light text-black mb-8">
                Available Finishes
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    name: "Space Gray",
                    image: require("../assets/laptop-gaming.jpg"),
                    available: true,
                  },
                  {
                    name: "Midnight Black",
                    image: require("../assets/laptop-workstation.jpg"),
                    available: true,
                  },
                  {
                    name: "Silver",
                    image: require("../assets/laptop-ultrabook.jpg"),
                    available: true,
                  },
                  {
                    name: "Deep Blue",
                    image: require("../assets/laptop-business.jpg"),
                    available: false,
                  },
                ].map((color, index) => (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                      color.available
                        ? "border-gray-200 hover:border-blue-300 hover:shadow-xl"
                        : "border-gray-100 opacity-50"
                    }`}
                  >
                    <div className="aspect-video relative">
                      <img
                        src={color.image}
                        alt={color.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <p className="text-center font-medium text-black">
                            {color.name}
                          </p>
                          {!color.available && (
                            <p className="text-center text-sm text-gray-500 mt-1">
                              Coming Soon
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-center font-medium text-black">
                        {color.name}
                      </p>
                      {!color.available && (
                        <p className="text-center text-sm text-gray-500 mt-1">
                          Coming Soon
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div>
              <h3 className="text-2xl font-light text-black mb-8">
                Memory & Storage
              </h3>
              <div className="space-y-4">
                {[
                  { size: "8GB", storage: "256GB SSD", price: "$1,899" },
                  {
                    size: "16GB",
                    storage: "512GB SSD",
                    price: "$2,199",
                    recommended: true,
                  },
                  { size: "32GB", storage: "1TB SSD", price: "$2,699" },
                  { size: "64GB", storage: "2TB SSD", price: "$3,199" },
                ].map((spec, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                      spec.recommended
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xl font-light text-black">
                          {spec.size} Memory
                        </h4>
                        <p className="text-gray-600">{spec.storage}</p>
                        {spec.recommended && (
                          <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full mt-2">
                            Recommended
                          </span>
                        )}
                      </div>
                      <span className="text-xl font-light text-black">
                        {spec.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Collection - Apple Style Tiles */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-4 tracking-tight">
              Our <span className="text-blue-600">Collection</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Crafted for Every Taste — Explore premium designs and powerful
              specifications built for you.
            </p>
          </div>

          {/* Large Product Tiles */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Laptops */}
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-12 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full">
                <div className="mb-8">
                  <img
                    src={require("../assets/laptop-gaming.jpg")}
                    alt="Laptops"
                    className="w-full h-64 object-contain rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-3xl font-light text-black mb-4">Laptops</h3>
                <p className="text-gray-600 mb-6">
                  Powerful mobile computing for work and play
                </p>
                <div className="flex gap-4 justify-center">
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Learn more
                  </button>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Shop
                  </button>
                </div>
              </div>
            </div>

            {/* All-in-One */}
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full">
                <div className="mb-8">
                  <img
                    src={require("../assets/products/AllinOne.png")}
                    alt="All-in-One"
                    className="w-full h-64 object-contain rounded-3xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-3xl font-light text-black mb-4">All-in-One</h3>
                <p className="text-gray-600 mb-6">
                  Sleek desktop solutions with integrated displays
                </p>
                <div className="flex justify-center">
                  <span className="inline-flex items-center px-6 py-3 rounded-full text-lg font-medium bg-orange-100 text-orange-800">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>

            {/* Tablet PC */}
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full">
                <div className="mb-8">
                  <img
                    src={require("../assets/products/tabletPc.png")}
                    alt="Tablet PC"
                    className="w-full h-64 object-contain rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-3xl font-light text-black mb-4">Tablet PC</h3>
                <p className="text-gray-600 mb-6">
                  Versatile computing with touch interface
                </p>
                <div className="flex justify-center">
                  <span className="inline-flex items-center px-6 py-3 rounded-full text-lg font-medium bg-orange-100 text-orange-800">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Smaller Product Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Accessories */}
            <div className="group cursor-pointer">
              <div className="bg-gray-50 rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="mb-6">
                  <img
                    src={require("../assets/products/Accessories.jpg")}
                    alt="Accessories"
                    className="w-full h-48 object-contain rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-2xl font-light text-black mb-2">
                  Accessories
                </h4>
                <p className="text-gray-600 mb-4">Complete your setup</p>
                <div className="flex justify-center">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>

            {/* Kids Tablets */}
            <div className="group cursor-pointer">
              <div className="bg-gray-50 rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="mb-6">
                  <img
                    src={require("../assets/products/kidsTablet.png")}
                    alt="Kids Tablets"
                    className="w-full h-48 object-contain rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-2xl font-light text-black mb-2">Kids Tablets</h4>
                <p className="text-gray-600 mb-4">Educational and fun for young minds</p>
                <div className="flex justify-center">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>

            {/* Mini PC */}
            <div className="group cursor-pointer">
              <div className="bg-gray-50 rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="mb-6">
                  <img
                    src={require("../assets/products/miniPc.jpg")}
                    alt="Mini PC"
                    className="w-full h-48 object-contain rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="text-2xl font-light text-black mb-2">Mini PC</h4>
                <p className="text-gray-600 mb-4">Compact power in small form factor</p>
                <div className="flex justify-center">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Combined Why Choose SNI & Features Section - Horizontal Scroll */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-4 tracking-tight">
              Discover Why <span className="text-blue-600">SNI</span> is the
              Best Choice
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose SNI — There's Never Been a Better Time to Upgrade
            </p>
          </div>

          <div
            className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide"
            id="features-scroll"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ scrollBehavior: "auto" }}
          >
            {/* Render cards once */}
            {featureCards.map((card, index) => {
              const colors = colorClasses[card.color];
              return (
                <div
                  key={index}
                  className={`flex-shrink-0 w-80 h-[500px] rounded-3xl bg-gradient-to-br ${colors.bg} p-8 flex flex-col justify-between group cursor-pointer hover:shadow-2xl transition-all duration-500 border ${colors.border}`}
                >
                  <div>
                    <div
                      className={`w-20 h-20 ${colors.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                    >
                      {card.emoji ? (
                        <span className="text-3xl">{card.emoji}</span>
                      ) : (
                        <svg
                          className="w-10 h-10 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d={card.icon} />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-3xl font-light text-black mb-4">
                      {card.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {card.description}
                    </p>
                  </div>
                  <div>
                    <div className={`text-6xl font-light ${colors.text} mb-2`}>
                      {card.stat}
                    </div>
                    <p className="text-gray-600 text-lg">{card.statLabel}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* New Laptop Pre-Order Banner */}
        </div>
      </section>

      {/* Video Section - Full Width */}
      <section className="py-0 bg-black">
        <div className="relative w-full h-[60vh] overflow-hidden">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/productionVid.mp4" type="video/mp4" />
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-center text-center px-6">
            <div className="max-w-4xl">
              <h2 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-tight">
                Innovation in Every Detail
              </h2>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                Where cutting-edge technology meets timeless design
              </p>
              <button
                onClick={scrollToProducts}
                className="px-8 py-4 bg-white text-black rounded-full hover:bg-gray-100 transition-all duration-300 text-lg font-medium transform hover:scale-105"
              >
                Explore Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Get to Know SNI - Horizontal Scroll */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-4 tracking-tight">
              Learn More About <span className="text-blue-600">SNI</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes SNI the preferred choice for professionals and
              creators worldwide.
            </p>
          </div>

          <div className="relative group">
            <div
              ref={learnMoreRef}
              className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide"
            >
              {[
                {
                  title: "Innovation First",
                  description:
                    "Pushing technology boundaries with breakthrough device design and performance.",
                  image: require("../assets/laptop-gaming.jpg"),
                  color: "from-blue-500 to-blue-600",
                },
                {
                  title: "Premium Materials",
                  description:
                    "High-quality, durable, and elegant materials for a premium feel.",
                  image: require("../assets/laptop-workstation.jpg"),
                  color: "from-gray-500 to-gray-600",
                },
                {
                  title: "Global Reach",
                  description:
                    "Delivering cutting-edge solutions and support worldwide.",
                  image: require("../assets/laptop-ultrabook.jpg"),
                  color: "from-green-500 to-green-600",
                },
                {
                  title: "Customer Focus",
                  description:
                    "Personalized service and 24/7 support tailored to your needs.",
                  image: require("../assets/laptop-business.jpg"),
                  color: "from-purple-500 to-purple-600",
                },
                {
                  title: "Sustainable Future",
                  description:
                    "Eco-friendly practices and devices designed to protect the planet.",
                  image: require("../assets/laptop-gaming.jpg"),
                  color: "from-teal-500 to-teal-600",
                },
                {
                  title: "Advanced Technology",
                  description:
                    "Harnessing the latest processors, graphics, and connectivity for unmatched performance.",
                  image: require("../assets/laptop-workstation.jpg"),
                  color: "from-indigo-500 to-indigo-600",
                },
                {
                  title: "Design Excellence",
                  description:
                    "Sleek, modern, and functional designs that elevate your experience.",
                  image: require("../assets/laptop-ultrabook.jpg"),
                  color: "from-pink-500 to-pink-600",
                },
                {
                  title: "Reliability You Can Trust",
                  description:
                    "Dependable products and services built to exceed expectations.",
                  image: require("../assets/laptop-business.jpg"),
                  color: "from-cyan-500 to-cyan-600",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 h-96 rounded-3xl overflow-hidden relative group cursor-pointer"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90`}
                  ></div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-8">
                    <h3 className="text-2xl font-light text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollHorizontally(learnMoreRef, -320)}
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full items-center justify-center hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scrollHorizontally(learnMoreRef, 320)}
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full items-center justify-center hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-black mb-4 tracking-tight">
              Your Perfect Laptop Awaits
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our complete range of laptops, PCs, and audio devices.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12">
            <SearchAndFilter onSearch={handleSearch} onFilter={handleFilter} />
          </div>

          {/* Top Products - Horizontal Scroll */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-light text-black">Top Products</h3>
              <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300">
                View All →
              </button>
            </div>
            <div className="relative group">
              <div
                ref={topProductsRef}
                className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
              >
                {filteredProducts.slice(0, 6).map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 w-80 snap-center"
                  >
                    <LaptopCard
                      laptop={product}
                      onQuickView={handleQuickView}
                      onOrder={handleOrder}
                    />
                  </div>
                ))}
                {filteredProducts.length === 0 && (
                  <div className="flex-shrink-0 w-full text-center py-16">
                    <h3 className="text-2xl font-light text-black mb-4">
                      No top products found
                    </h3>
                    <p className="text-gray-600">Try adjusting your filters</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => scrollHorizontally(topProductsRef, -320)}
                className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full items-center justify-center hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100"
              >
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => scrollHorizontally(topProductsRef, 320)}
                className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full items-center justify-center hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100"
              >
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* All Products - Horizontal Scroll */}
          <div id="products-section">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-light text-black">All Products</h3>
              <p className="text-gray-600">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="relative group">
                <div
                  ref={allProductsRef}
                  className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
                >
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex-shrink-0 w-80 snap-center"
                    >
                      <LaptopCard
                        laptop={product}
                        onQuickView={handleQuickView}
                        onOrder={handleOrder}
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => scrollHorizontally(allProductsRef, -320)}
                  className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full items-center justify-center hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100"
                >
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => scrollHorizontally(allProductsRef, 320)}
                  className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full items-center justify-center hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100"
                >
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-black mb-4">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or filters to find what you're
                  looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilters({
                      category: "All",
                      priceRange: null,
                      deviceType: "All",
                    });
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img
                  src={require("../assets/snl_logo.png")}
                  alt="SNI Logo"
                  className="w-8 h-8 object-contain"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(17%) sepia(94%) saturate(7151%) hue-rotate(358deg) brightness(91%) contrast(118%)",
                  }}
                />
              </div>
              <p className="text-gray-400 leading-relaxed mb-4 text-sm">
                Revolutionizing computing with innovative technology and premium
                craftsmanship.
              </p>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-base font-medium mb-4">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    Laptops
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    PCs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    Audio
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    Accessories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-medium mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    Warranty
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs">
              Copyright © 2025 SNI Technology. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-3 md:mt-0">
              <button
                onClick={() => openPdfModal('privacy')}
                className="text-gray-400 hover:text-white transition-colors duration-300 text-xs cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => openPdfModal('terms')}
                className="text-gray-400 hover:text-white transition-colors duration-300 text-xs cursor-pointer"
              >
                Terms & Conditions
              </button>
              <button
                onClick={() => openPdfModal('cookies')}
                className="text-gray-400 hover:text-white transition-colors duration-300 text-xs cursor-pointer"
              >
                Cookies Policy
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Quick View Modal */}
      <QuickViewModal
        laptop={selectedLaptop}
        isOpen={isModalOpen}
        onClose={closeModal}
        onOrder={handleOrder}
      />

      {/* PDF Modal */}
      <PdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        pdfUrl={require("../assets/learnmore.pdf")}
      />

      {/* Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={closeOrderModal}
        product={orderProduct}
      />

      {/* PDF Viewer Modal */}
      <PdfViewerModal
        isOpen={pdfModal.isOpen}
        onClose={closePdfModal}
        pdfUrl={pdfModal.pdfUrl}
        title={pdfModal.title}
      />
    </div>
  );
};

export default Home;
