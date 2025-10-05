import React from 'react';

const About = () => {
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
              Pioneering the future of computing with innovative technology, exceptional craftsmanship, 
              and an unwavering commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-8">
                Our <span className="text-primary">Story</span>
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Founded in 2020 by a team of passionate engineers and gaming enthusiasts, 
                  SNI emerged from a simple vision: to create devices that don't compromise 
                  on performance, quality, or innovation.
                </p>
                <p>
                  What started as a small startup in a Silicon Valley garage has grown into 
                  a global leader in premium technology manufacturing. Our journey has been 
                  driven by one core principle: pushing the boundaries of what's possible 
                  in computing and audio technology.
                </p>
                <p>
                  Today, SNI devices power creators, gamers, and professionals worldwide, 
                  delivering the perfect blend of cutting-edge technology and elegant design. 
                  We're not just building devices; we're crafting the future of technology.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
                <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-4xl">🏭</span>
                    </div>
                    <p className="text-gray-600">SNI Manufacturing Facility</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-red-100 rounded-full animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-100 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Our <span className="text-primary">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at SNI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center group hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-200">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Innovation</h3>
              <p className="text-gray-600">
                We constantly push the boundaries of technology, always staying ahead of the curve 
                with breakthrough innovations in device design and performance.
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
                Every SNI device undergoes rigorous testing and quality control to ensure 
                exceptional performance and reliability that our customers can trust.
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
                Our customers are at the heart of everything we do. We listen, learn, and 
                continuously improve to exceed their expectations and deliver exceptional experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              SNI by the <span className="text-primary">Numbers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our achievements and impact in the global technology market
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                500K+
              </div>
              <div className="text-gray-600 text-lg">Devices Sold</div>
              <div className="text-sm text-gray-500 mt-2">Worldwide</div>
            </div>

            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-bold text-red-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                99.8%
              </div>
              <div className="text-gray-600 text-lg">Customer Satisfaction</div>
              <div className="text-sm text-gray-500 mt-2">Based on reviews</div>
            </div>

            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <div className="text-gray-600 text-lg">Countries Served</div>
              <div className="text-sm text-gray-500 mt-2">Global presence</div>
            </div>

            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-bold text-red-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-gray-600 text-lg">Support Available</div>
              <div className="text-sm text-gray-500 mt-2">Expert assistance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Meet Our <span className="text-primary">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The brilliant minds behind SNI's innovation and success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center group hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-200">
              <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">👨‍💼</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Alex Chen</h3>
              <p className="text-primary mb-4">CEO & Co-Founder</p>
              <p className="text-gray-600 text-sm">
                Former Intel engineer with 15+ years in semiconductor design. 
                Passionate about pushing the boundaries of mobile computing.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center group hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-200">
              <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">👩‍💻</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Sarah Martinez</h3>
              <p className="text-red-600 mb-4">CTO & Co-Founder</p>
              <p className="text-gray-600 text-sm">
                Ex-NVIDIA engineer specializing in GPU architecture. 
                Leads our R&D team in developing next-gen graphics solutions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center group hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-200">
              <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">👨‍🎨</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">David Kim</h3>
              <p className="text-primary mb-4">Head of Design</p>
              <p className="text-gray-600 text-sm">
                Award-winning industrial designer with expertise in premium electronics. 
                Crafts the elegant aesthetics that define SNI devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-200">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Ready to Experience <span className="text-primary">SNI</span>?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have made the switch to SNI devices. 
              Discover the perfect blend of performance, quality, and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                Explore Our Collection
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
