import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Star, Shield, Zap, Cpu, Monitor, HardDrive } from "lucide-react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const laptops = [
    { 
      name: "SNI Phantom X1", 
      image: require('../assets/laptop-gaming.jpg'),
      price: "$2,499",
      tagline: "Gaming Beast",
      description: "Unleash maximum performance with RTX 4080 graphics and Intel i9 processor",
      specs: "RTX 4080 • Intel i9 • 32GB RAM • 1TB SSD"
    },
    { 
      name: "SNI Pro Max", 
      image: require('../assets/laptop-workstation.jpg'),
      price: "$3,299",
      tagline: "Professional Power",
      description: "Built for creators and professionals with workstation-grade performance",
      specs: "RTX 4090 • AMD Ryzen 9 • 64GB RAM • 2TB SSD"
    },
    { 
      name: "SNI Ultra Slim", 
      image: require('../assets/laptop-ultrabook.jpg'),
      price: "$1,899",
      tagline: "Ultra Portable",
      description: "Premium portability without compromising on performance",
      specs: "Intel i7 • 16GB RAM • 1TB SSD • 14\" Display"
    },
    { 
      name: "SNI Business Elite", 
      image: require('../assets/laptop-business.jpg'),
      price: "$2,199",
      tagline: "Business Excellence",
      description: "Designed for modern business professionals and entrepreneurs",
      specs: "Intel i7 • 32GB RAM • 2TB SSD • Security Features"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % laptops.length);
        setIsTransitioning(false);
      }, 300);
    }, 6000);
    return () => clearInterval(interval);
  }, [laptops.length]);

  const handleShopNow = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${require('../assets/hero-bg.jpg')})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-screen py-20 pt-24">
          
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-primary mr-3" />
                <span className="text-primary text-sm font-semibold tracking-wide uppercase">Next-Gen Technology</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                <span className="block animate-slide-up">Revolutionary</span>
                <span className="block text-primary animate-slide-up" style={{animationDelay: '0.2s'}}>SNI Laptops</span>
                <span className="block text-2xl md:text-3xl font-normal text-gray-300 mt-4 animate-slide-up" style={{animationDelay: '0.4s'}}>
                  {laptops[currentSlide].tagline}
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl leading-relaxed animate-fade-in" style={{animationDelay: '0.6s'}}>
                {laptops[currentSlide].description}
              </p>

              {/* Price Display */}
              <div className="mb-8 animate-slide-up" style={{animationDelay: '0.8s'}}>
                <span className="text-4xl md:text-5xl font-bold text-primary">
                  {laptops[currentSlide].price}
                </span>
                <span className="text-gray-400 text-lg ml-2">Starting from</span>
              </div>

              {/* Single CTA Button */}
              <div className="flex justify-center lg:justify-start mb-12 animate-slide-up" style={{animationDelay: '1s'}}>
                <button 
                  onClick={handleShopNow}
                  className="group relative px-12 py-4 bg-primary hover:bg-blue-600 text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10 flex items-center">
                    Shop Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in" style={{animationDelay: '1.2s'}}>
                {[
                  { icon: Cpu, label: "Latest Processors", value: "Intel & AMD" },
                  { icon: Monitor, label: "Display", value: "Up to 4K" },
                  { icon: HardDrive, label: "Storage", value: "Up to 4TB" },
                  { icon: Zap, label: "Performance", value: "Next-Gen" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-primary/50 transition-all duration-300 group"
                  >
                    <stat.icon className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-sm font-semibold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Modern Laptop Showcase */}
          <div className="relative animate-slide-up mt-6" style={{animationDelay: '0.4s'}}>
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              
              {/* Laptop Display */}
              <div className="relative mb-8">
                <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden bg-gray-50 shadow-lg">
                  <img
                    src={laptops[currentSlide].image}
                    alt={laptops[currentSlide].name}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
                    }`}
                  />
                  
                  {/* Product Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-full shadow-lg">
                      {laptops[currentSlide].tagline}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-black text-sm font-medium">4.9</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-black mb-3">
                  {laptops[currentSlide].name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {laptops[currentSlide].specs}
                </p>
                <div className="text-3xl font-bold text-primary mb-4">
                  {laptops[currentSlide].price}
                </div>
              </div>

              {/* Slider Navigation */}
              <div className="flex justify-center space-x-3 mb-8">
                {laptops.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setCurrentSlide(index);
                        setIsTransitioning(false);
                      }, 300);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-primary scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              {/* Features */}
              {/* <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-gray-600">3-Year</p>
                  <p className="text-sm font-semibold text-black">Warranty</p>
                </div>
                <div className="text-center">
                  <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Free</p>
                  <p className="text-sm font-semibold text-black">Shipping</p>
                </div>
                <div className="text-center">
                  <Star className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-gray-600">Premium</p>
                  <p className="text-sm font-semibold text-black">Support</p>
                </div>
              </div> */}

              {/* Single Action Button */}
              {/* <button 
                onClick={handleShopNow}
                className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <span className="flex items-center justify-center">
                  Order Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;