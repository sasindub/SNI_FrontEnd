import React from 'react';
import { Search, ChevronRight, Cpu, Monitor, HardDrive, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-sni-dark via-sni-navy to-sni-blue"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${require('../assets/hero-bg.jpg')})`,
          opacity: 0.3
        }}
      ></div>
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-sni-cyan/20 to-sni-purple/20 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-sni-purple/20 to-sni-cyan/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-sni-cyan/20 to-sni-purple/20 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full glass mb-8">
            <span className="w-2 h-2 bg-sni-cyan rounded-full animate-glow mr-3"></span>
            <span className="text-white text-sm font-medium">Next-Gen Technology</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            <span className="block">Premium</span>
            <span className="block gradient-text text-glow">SNI Laptops</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience unparalleled performance with our cutting-edge gaming and professional laptops. 
            Built for creators, gamers, and professionals who demand excellence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="btn-primary text-lg px-8 py-4 group">
              <span className="flex items-center">
                Explore Collection
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              Watch Demo
            </button>
          </div>

         {/* Stats */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
              {[
                { icon: Cpu, label: "Latest Processors", value: "Intel & AMD" },
                { icon: Monitor, label: "Display", value: "Up to 4K" },
                { icon: HardDrive, label: "Storage", value: "Up to 4TB" },
                { icon: Zap, label: "Performance", value: "Next-Gen" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="glass rounded-xl p-4 hover:bg-white/10 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="font-semibold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
