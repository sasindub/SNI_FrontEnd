import React from 'react';
import { Search, ChevronRight, Cpu, Monitor, HardDrive, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gray-50"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${require('../assets/laptop-ultrabook.jpg')})`,
          opacity: 0.1
        }}
      ></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-100 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-red-100 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-blue-100 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-8">
            <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
            <span className="text-primary text-sm font-medium">Next-Gen Technology</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-text-primary mb-6 leading-tight">
            <span className="block">Premium</span>
            <span className="block" style={{color: '#757474'}}>SNI Technology</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience unparalleled performance with our cutting-edge laptops, PCs, and audio devices. 
            Built for creators, gamers, and professionals who demand excellence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="btn-primary text-lg px-8 py-4 group">
              <span className="flex items-center">
                Explore Collection
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
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
                  className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in border border-gray-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-text-secondary">{stat.label}</p>
                  <p className="font-semibold text-text-primary">{stat.value}</p>
                </div>
              ))}
            </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
