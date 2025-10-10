import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import commitmentImage from '../assets/commitment.png';
import buildingImage from '../assets/building.png';
import whoImage from '../assets/who.png';
import PdfViewerModal from '../components/PdfViewerModal';

const About = () => {
  const navigate = useNavigate();
  const [countStats, setCountStats] = useState({ devices: 0, countries: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);
  const whoSectionRef = useRef(null);
  const [whoScrollPosition, setWhoScrollPosition] = useState(0);
  const [pdfModal, setPdfModal] = useState({ isOpen: false, pdfUrl: '', title: '' });

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    // Observe all sections with fade-in animation
    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Counter animation for stats
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animate devices count
            let devicesCount = 0;
            const devicesInterval = setInterval(() => {
              devicesCount += 1;
              setCountStats(prev => ({ ...prev, devices: devicesCount }));
              if (devicesCount >= 50) clearInterval(devicesInterval);
            }, 30);

            // Animate countries count
            let countriesCount = 0;
            const countriesInterval = setInterval(() => {
              countriesCount += 1;
              setCountStats(prev => ({ ...prev, countries: countriesCount }));
              if (countriesCount >= 3) clearInterval(countriesInterval);
            }, 200);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Parallax effect for Who We Are section
  useEffect(() => {
    const handleScroll = () => {
      if (whoSectionRef.current) {
        const rect = whoSectionRef.current.getBoundingClientRect();
        const scrollPercentage = Math.max(0, Math.min(1, 1 - (rect.top / window.innerHeight)));
        setWhoScrollPosition(scrollPercentage * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExploreProducts = () => {
    navigate('/');
    setTimeout(() => {
      const productsSection = document.getElementById('products-section');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleContactTeam = () => {
    window.open('https://wa.me/YOUR_WHATSAPP_NUMBER', '_blank');
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

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-black"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              About <span className="text-primary">SNI</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Building the Future with Intelligent Solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-8">
                Our <span className="text-primary">Story</span>
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Softnet International (PVT) Ltd., established in 2025, is a proud member of the Softnet 
                  Group, carrying forward a legacy of innovation, quality, and customer trust built over 15+ 
                  years by Softnet Lanka (PVT) Ltd.
                </p>
                <p>
                  As a dynamic and future-driven company, SNI focuses on delivering premium-quality 
                  laptops, PCs, and IT devices to both local and international markets. Our mission is simple — 
                  to empower individuals and organizations with smarter, more reliable technology solutions.
                </p>
                <p>
                  What began as a vision under Softnet Lanka (PVT) Ltd. has evolved into a powerful network 
                  of companies operating with shared goals and values. Through constant innovation, strategic 
                  partnerships, and a passion for excellence, Softnet International continues to expand globally — 
                  delivering smarter technology and sustainable solutions for all.
                </p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img 
                  src={buildingImage} 
                  alt="Softnet International Building" 
                  className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-105 group-hover:rotate-1"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Badge */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-sm font-semibold text-gray-800">Softnet International</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="py-20 bg-gray-50 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1 overflow-hidden rounded-3xl shadow-2xl group">
              <img 
                src={commitmentImage} 
                alt="Our Commitment" 
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <div className="animate-slide-up order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-8">
                Our <span className="text-primary">Commitment</span>
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  We are dedicated to redefining excellence in the IT industry by ensuring every client receives 
                  unmatched service, dependable support, and cutting-edge technology.
                </p>
                <p>
                  From product selection to after-sales care, our team works tirelessly to maintain trust, 
                  transparency, and long-term relationships with every customer and partner.
                </p>
                <p>
                  Guided by the brand name SNL, we stand for trust, technology, and transformation. 
                  Our purpose is clear: to create a connected future where technology empowers progress for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Our <span className="text-primary">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at SNI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center group hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-200">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Innovation</h3>
              <p className="text-gray-600">
                We embrace change and continually seek new ways to enhance 
                technology and service.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center group hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-200">
              <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Quality</h3>
              <p className="text-gray-600">
                We are committed to delivering only the highest standards in every product 
                and solution.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center group hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-200">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Customer Focus</h3>
              <p className="text-gray-600">
                Our customers are the heart of everything we do, and their 
                satisfaction drives our success.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center group hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-200">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-4">IMPACT</h3>
              <p className="text-gray-600">
                We aim to make a lasting difference — in our industry, our communities, 
                and our world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section 
        ref={whoSectionRef}
        className="relative py-20 overflow-hidden fade-in-section group"
      >
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
          style={{
            backgroundImage: `url(${whoImage})`,
            transform: `translateY(${whoScrollPosition * 0.5}px) scale(1.05)`,
          }}
        >
          {/* Dark Overlay with hover effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 group-hover:from-black/85 group-hover:via-black/75 group-hover:to-black/85 transition-all duration-700"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
              Who We <span className="text-blue-400">Are</span>
            </h2>
            <div className="max-w-4xl mx-auto space-y-5 text-white text-lg leading-relaxed backdrop-blur-md bg-black/20 p-8 rounded-3xl transform group-hover:bg-black/30 group-hover:scale-[1.02] transition-all duration-500">
              <p className="text-lg md:text-xl transform group-hover:translate-x-2 transition-transform duration-500">
                We are <strong className="text-white font-bold">Softnet International (PVT) Ltd. (SNI)</strong> — a forward-thinking IT company 
                and a proud member of the Softnet family.
              </p>
              <p className="text-lg md:text-xl transform group-hover:translate-x-2 transition-transform duration-500 delay-75">
                Guided by the brand name <strong className="text-blue-400 font-bold">SNL</strong>, we stand for trust, technology, and transformation.
              </p>
              <p className="text-lg md:text-xl transform group-hover:translate-x-2 transition-transform duration-500 delay-150">
                Our purpose is clear: to create a connected future where technology empowers progress for everyone.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white fade-in-section" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              SNI by the <span className="text-primary">Numbers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our achievements and impact in the global technology market
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center group transform hover:scale-105 transition-all duration-500">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-4 transition-all duration-300">
                {countStats.devices}+
              </div>
              <div className="text-gray-600 text-lg font-semibold">Devices Sold</div>
              <div className="text-sm text-gray-500 mt-2">Premium Quality</div>
            </div>

            <div className="text-center group transform hover:scale-105 transition-all duration-500">
              <div className="text-5xl md:text-6xl font-bold text-red-600 mb-4 transition-all duration-300">
                {countStats.countries}
              </div>
              <div className="text-gray-600 text-lg font-semibold">Countries Served</div>
              <div className="text-sm text-gray-500 mt-2">Ethiopia, Sri Lanka, Thailand</div>
            </div>

            <div className="text-center group transform hover:scale-105 transition-all duration-500">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-4 transition-all duration-300">
                24/7
              </div>
              <div className="text-gray-600 text-lg font-semibold">Support Available</div>
              <div className="text-sm text-gray-500 mt-2">Expert assistance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50 fade-in-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Our <span className="text-primary">Subsidiaries</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A strong network of businesses under the Softnet Group
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center group hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-200">
              <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Softnet International</h3>
              <p className="text-primary mb-4">(PVT) Ltd</p>
              <p className="text-gray-600 text-sm">
                Leading provider of premium laptops, PCs, and IT devices for local and international markets.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center group hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-200">
              <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">MR Enterprise</h3>
              <p className="text-red-600 mb-4">Business Solutions</p>
              <p className="text-gray-600 text-sm">
                Delivering comprehensive business solutions and enterprise technology services.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center group hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-200">
              <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌏</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Shenzhen Sri Lanka</h3>
              <p className="text-green-600 mb-4">Trading Co. Limited</p>
              <p className="text-gray-600 text-sm">
                Bridging innovation between China and Sri Lanka in technology trading.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center group hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-200">
              <div className="w-24 h-24 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Lessq</h3>
              <p className="text-purple-600 mb-4">(PVT) Ltd</p>
              <p className="text-gray-600 text-sm">
                Innovative solutions provider focused on emerging technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white fade-in-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-200">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Ready to Experience <span className="text-primary">SNI</span>?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We are dedicated to redefining excellence in the IT industry by ensuring every client receives 
              unmatched service, dependable support, and cutting-edge technology. Join us in creating a connected 
              future where technology empowers progress for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleExploreProducts}
                className="btn-primary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300"
              >
                Explore Our Collection
              </button>
              <button 
                onClick={handleContactTeam}
                className="btn-secondary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300"
              >
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
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
                Building the future with intelligent solutions.
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
                  href="https://wa.me/YOUR_WHATSAPP_NUMBER"
                  target="_blank"
                  rel="noopener noreferrer"
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
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    Laptops
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    PCs
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    Accessories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-medium mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-400 text-sm">
                  <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Tech Street, Colombo, Sri Lanka</span>
                </li>
                <li className="flex items-center text-gray-400 text-sm">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+94 11 234 5678</span>
                </li>
                <li className="flex items-center text-gray-400 text-sm">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@sni.lk</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/about"
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs">
              Copyright © 2025 Softnet International (PVT) Ltd. All rights reserved.
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

export default About;
