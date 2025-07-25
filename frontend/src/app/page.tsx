// LIANJIN LED - Modern Professional Homepage
export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Modern Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">LIANJIN LED</h1>
                <span className="text-xs text-secondary">联锦光电</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-primary font-medium">Home</a>
              <a href="/products" className="text-secondary hover:text-primary transition-colors">Products</a>
              <a href="/about" className="text-secondary hover:text-primary transition-colors">About</a>
              <a href="/contact" className="text-secondary hover:text-primary transition-colors">Contact</a>
              <a href="/contact" className="btn btn-primary btn-sm">Get Quote</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Modern Design */}
      <section className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  🏆 Leading LED Manufacturer Since 2007
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Innovative
                  <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"> LED Display</span>
                  <br />Solutions
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Professional LED display manufacturer serving 160+ countries worldwide with cutting-edge technology and exceptional quality.
                </p>
                <p className="text-lg text-gray-500">
                  专业LED显示屏制造商，为全球160+国家提供尖端技术和卓越品质
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/products" className="btn btn-primary btn-lg px-8 py-4 text-lg">
                  Explore Products
                </a>
                <a href="/contact" className="btn btn-secondary btn-lg px-8 py-4 text-lg">
                  Get Consultation
                </a>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50K㎡</div>
                  <div className="text-sm text-gray-600">Factory Area</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">160+</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">17+</div>
                  <div className="text-sm text-gray-600">Years</div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8">
                <div className="aspect-video bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">📺</div>
                    <div className="text-xl font-semibold">LED Display Technology</div>
                    <div className="text-sm opacity-90 mt-2">Ultra-High Resolution • Energy Efficient • Reliable</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-1">🏭</div>
                    <div className="text-xs font-medium">Manufacturing</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-1">🔬</div>
                    <div className="text-xs font-medium">R&D</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl mb-1">🌍</div>
                    <div className="text-xs font-medium">Global</div>
                  </div>
                </div>
              </div>
              {/* Background decoration */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-amber-200 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories - Modern Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Product Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive LED display solutions engineered for excellence across diverse applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Fine Pitch LED */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                  <span className="text-3xl">📺</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fine Pitch LED Display</h3>
                <p className="text-gray-600 mb-4">Ultra-high resolution displays for control rooms and premium commercial applications</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div>• X3-SMD, X3-COB, Mi-Pro Series</div>
                  <div>• P0.9 - P1.87 pixel pitch</div>
                  <div>• 4K/8K resolution support</div>
                </div>
                <div className="mt-6">
                  <a href="/products" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                    Learn More →
                  </a>
                </div>
              </div>
            </div>

            {/* Rental LED */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                  <span className="text-3xl">🎭</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Rental LED Display</h3>
                <p className="text-gray-600 mb-4">Lightweight, quick-assembly displays for events, concerts, and touring applications</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div>• R3, R Series, XR Virtual Production</div>
                  <div>• Quick lock assembly system</div>
                  <div>• Curved configurations available</div>
                </div>
                <div className="mt-6">
                  <a href="/products" className="text-purple-600 font-medium hover:text-purple-800 transition-colors">
                    Learn More →
                  </a>
                </div>
              </div>
            </div>

            {/* Outdoor LED */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                  <span className="text-3xl">🏢</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Outdoor LED Display</h3>
                <p className="text-gray-600 mb-4">High-brightness, weatherproof displays for outdoor advertising and digital billboards</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div>• ES Series, Ti Series Energy-saving</div>
                  <div>• Up to 8000 nits brightness</div>
                  <div>• IP65 weatherproof rating</div>
                </div>
                <div className="mt-6">
                  <a href="/products" className="text-green-600 font-medium hover:text-green-800 transition-colors">
                    Learn More →
                  </a>
                </div>
              </div>
            </div>

            {/* Meeting Display */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-200 transition-colors">
                  <span className="text-3xl">💼</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Meeting Display</h3>
                <p className="text-gray-600 mb-4">All-in-one LED solutions with touch functionality for modern conference rooms</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div>• MeeUs All-in-One Series</div>
                  <div>• Interactive touch capability</div>
                  <div>• Wireless presentation support</div>
                </div>
                <div className="mt-6">
                  <a href="/products" className="text-amber-600 font-medium hover:text-amber-800 transition-colors">
                    Learn More →
                  </a>
                </div>
              </div>
            </div>

            {/* Creative LED */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-pink-200 transition-colors">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Creative LED Display</h3>
                <p className="text-gray-600 mb-4">Innovative transparent, flexible, and custom-shaped displays for unique installations</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div>• Transparent & Flexible options</div>
                  <div>• Custom shapes & sizes</div>
                  <div>• Architectural integration</div>
                </div>
                <div className="mt-6">
                  <a href="/products" className="text-pink-600 font-medium hover:text-pink-800 transition-colors">
                    Learn More →
                  </a>
                </div>
              </div>
            </div>

            {/* Poster LED */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-200 transition-colors">
                  <span className="text-3xl">📱</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Poster LED Display</h3>
                <p className="text-gray-600 mb-4">Compact digital signage solutions for retail, hospitality, and corporate environments</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <div>• G-T4, G-X4, G-T5 Series</div>
                  <div>• Ultra-thin design</div>
                  <div>• Remote content management</div>
                </div>
                <div className="mt-6">
                  <a href="/products" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
                    Learn More →
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a href="/products" className="btn btn-primary btn-lg px-8 py-4">
              View All Products
            </a>
          </div>
        </div>
      </section>

      {/* Company Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose LIANJIN LED</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              17 years of excellence in LED display manufacturing with world-class facilities and global reach
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🏭</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Manufacturing</h3>
              <p className="text-gray-600 leading-relaxed">
                50,000㎡ total facility with 20,000㎡ production workshop equipped with world-class Panasonic SMT machines and automated testing systems
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🔬</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">R&D Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                Dedicated research team developing next-generation LED technologies with focus on energy efficiency and innovative display solutions
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🌍</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Service</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive sales network covering 160+ countries with 24/7 technical support and local service partnerships worldwide
              </p>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Certifications & Standards</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="font-bold text-blue-600 text-lg">ISO45001</div>
                <div className="text-sm text-gray-600">Quality System</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="font-bold text-blue-600 text-lg">CE</div>
                <div className="text-sm text-gray-600">European</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="font-bold text-blue-600 text-lg">FCC</div>
                <div className="text-sm text-gray-600">US Standard</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="font-bold text-blue-600 text-lg">3C</div>
                <div className="text-sm text-gray-600">China</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="font-bold text-blue-600 text-lg">RoHS</div>
                <div className="text-sm text-gray-600">Environmental</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="font-bold text-blue-600 text-lg">TUV</div>
                <div className="text-sm text-gray-600">Safety</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your LED Project?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Get expert consultation and custom solutions from our LED display specialists
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn bg-white text-blue-600 hover:bg-gray-100 btn-lg px-8 py-4">
              Get Free Consultation
            </a>
            <a href="tel:+8675582595016" className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600 btn-lg px-8 py-4">
              Call +86 755-8259-5016
            </a>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">L</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">LIANJIN LED</h4>
                  <span className="text-sm text-gray-400">联锦光电</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Professional LED display manufacturer since 2007, committed to delivering innovative visual solutions worldwide.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-lg mb-4">Products</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/products" className="hover:text-white transition-colors">Fine Pitch LED Display</a></li>
                <li><a href="/products" className="hover:text-white transition-colors">Rental LED Display</a></li>
                <li><a href="/products" className="hover:text-white transition-colors">Outdoor LED Display</a></li>
                <li><a href="/products" className="hover:text-white transition-colors">Creative LED Solutions</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-lg mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">Manufacturing</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">Quality Control</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Global Partners</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-lg mb-4">Contact</h5>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <span>📞</span>
                  <span>+86 755-8259-5016</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✉️</span>
                  <span>bruce@lianjinled.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📍</span>
                  <span>Shenzhen, China</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-400">
              © 2024 Shenzhen Lianjin Photoelectricity Co., Ltd. All rights reserved. | 深圳联锦光电有限公司 版权所有
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}