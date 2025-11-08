import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Warranty Check', path: '/warranty' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo - Always visible, keep original color */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
          >
            <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <img 
                src={require('../assets/navLogo.png')} 
                alt="SNL Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 ml-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                  className={`relative font-medium transition-all duration-300 hover:text-primary group ${
                    location.pathname === item.path 
                      ? location.pathname === '/' && !isScrolled
                        ? 'text-gray-200'
                        : 'text-primary'
                      : location.pathname === '/' && !isScrolled
                        ? 'text-white'
                        : 'text-black'
                  }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 transition-all duration-300 ${
                    location.pathname === '/' && !isScrolled
                      ? 'bg-gray-200'
                      : 'bg-primary'
                  } ${
                    location.pathname === item.path
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-100'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            {/* <Link
              to="/"
              className="btn-primary text-sm"
            >
              Shop Now
            </Link> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-300"
          >
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-text-primary font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:bg-gray-100 ${
                  location.pathname === item.path ? 'bg-gray-100 text-primary' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
