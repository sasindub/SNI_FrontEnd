import React, { useState, useEffect } from 'react';
import { Search, ChevronRight, Cpu, Monitor, HardDrive, Zap, Play, ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const laptops = [
    { 
      name: "SNI Phantom X1", 
      image: require('../assets/laptop-gaming.jpg'),
      price: "$2,499",
      tagline: "Gaming Beast"
    },
    { 
      name: "SNI Pro Max", 
      image: require('../assets/laptop-workstation.jpg'),
      price: "$3,299",
      tagline: "Professional Power"
    },
    { 
      name: "SNI Ultra Slim", 
      image: require('../assets/laptop-ultrabook.jpg'),
      price: "$1,899",
      tagline: "Ultra Portable"
    },
    { 
      name: "SNI Business Elite", 
      image: require('../assets/laptop-business.jpg'),
      price: "$2,199",
      tagline: "Business Excellence"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % laptops.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [laptops.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Electronic Signal Animation */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-ping"></div>
          <div className="absolute top-32 left-32 w-1 h-1 bg-red-500 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-40 left-40 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
          
          <div className="absolute top-60 right-32 w-2 h-2 bg-primary rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-80 right-20 w-1 h-1 bg-red-500 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
          
          <div className="absolute bottom-40 left-32 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '2.5s'}}></div>
          <div className="absolute bottom-60 right-40 w-2 h-2 bg-primary rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
        </div>

        {/* Circuit Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M10,0 L10,20 M0,10 L20,10" stroke="#007aff" strokeWidth="0.5" fill="none"/>
                <circle cx="10" cy="10" r="1" fill="#007aff"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)"/>
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-primary mr-3 animate-pulse" />
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

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl leading-relaxed animate-fade-in" style={{animationDelay: '0.6s'}}>
                Experience the future of computing with cutting-edge performance, 
                stunning displays, and revolutionary design that redefines what's possible.
              </p>

              {/* Price Display */}
              <div className="mb-8 animate-slide-up" style={{animationDelay: '0.8s'}}>
                <span className="text-4xl md:text-5xl font-bold text-primary">
                  {laptops[currentSlide].price}
                </span>
                <span className="text-gray-400 text-lg ml-2">Starting from</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-slide-up" style={{animationDelay: '1s'}}>
                <button className="btn-primary text-lg px-8 py-4 group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    Order Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button className="btn-secondary text-lg px-8 py-4 group border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  <span className="flex items-center">
                    <Play className="mr-2 w-5 h-5" />
                    Watch Demo
                  </span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in" style={{animationDelay: '1.2s'}}>
                {[
                  { icon: Cpu, label: "Latest Processors", value: "Intel & AMD" },
                  { icon: Monitor, label: "Display", value: "Up to 4K" },
                  { icon: HardDrive, label: "Storage", value: "Up to 4TB" },
                  { icon: Zap, label: "Performance", value: "Next-Gen" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-primary/50 transition-all duration-300 group hover:scale-105"
                  >
                    <stat.icon className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-sm font-semibold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Laptop Slider */}
          <div className="relative animate-slide-up" style={{animationDelay: '0.4s'}}>
            {/* Main Laptop Display */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl border border-white/10">
                <img
                  src={laptops[currentSlide].image}
                  alt={laptops[currentSlide].name}
                  className="w-full h-full object-cover transition-all duration-1000 transform hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Product Info */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {laptops[currentSlide].name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">
                      {laptops[currentSlide].price}
                    </span>
                    <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full border border-primary/30">
                      {laptops[currentSlide].tagline}
                    </span>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-primary rounded-3xl opacity-20 blur-lg animate-pulse"></div>
              </div>

              {/* Slider Navigation */}
              <div className="flex justify-center mt-6 space-x-3">
                {laptops.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-primary scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full animate-float blur-sm"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-red-500/20 rounded-full animate-float blur-sm" style={{animationDelay: '2s'}}></div>
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

      {/* Additional Animations */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-red-500 rounded-full animate-ping" style={{animationDelay: '4s'}}></div>
      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '5s'}}></div>
    </section>
  );
};

export default Hero;