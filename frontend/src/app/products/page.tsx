// Products Page - Based on Lianjin LED Brochure Content
export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-secondary">
      {/* Header Section */}
      <header className="bg-primary text-light py-lg">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold mb-0 text-light">LIANJIN LED</h1>
              <span className="ml-md text-sm opacity-90">联锦光电</span>
            </div>
            <div className="hidden md:flex items-center space-x-lg">
              <a href="/" className="text-light opacity-80 hover:opacity-100">Home</a>
              <a href="/about" className="text-light opacity-80 hover:opacity-100">About</a>
              <a href="/products" className="text-light">Products</a>
              <a href="/contact" className="text-light opacity-80 hover:opacity-100">Contact</a>
            </div>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <section className="py-xl bg-primary text-light">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-md">Product Categories</h2>
          <p className="text-xl opacity-90">Professional LED Display Solutions for Every Application</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-2xl">
        <div className="container">
          
          {/* Fine Pitch LED Display */}
          <section className="mb-3xl">
            <div className="card">
              <div className="card-body">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-lg text-primary">Fine Pitch LED Display</h3>
                    <h4 className="text-lg text-secondary mb-md">小间距LED显示屏</h4>
                    <p className="text-lg mb-lg text-secondary">
                      Ultra-high resolution displays perfect for control rooms, broadcast studios, and high-end commercial applications.
                    </p>
                    
                    <div className="mb-lg">
                      <h5 className="font-bold text-primary mb-md">Product Series:</h5>
                      <div className="grid grid-cols-2 gap-md">
                        <div className="p-md bg-secondary rounded">
                          <div className="font-bold">X3-SMD Series</div>
                          <div className="text-sm text-secondary">P0.9, P1.25, P1.56, P1.87</div>
                        </div>
                        <div className="p-md bg-secondary rounded">
                          <div className="font-bold">X3-COB Series</div>
                          <div className="text-sm text-secondary">P0.9, P1.25, P1.56</div>
                        </div>
                        <div className="p-md bg-secondary rounded">
                          <div className="font-bold">X3-Curve Series</div>
                          <div className="text-sm text-secondary">Curved displays</div>
                        </div>
                        <div className="p-md bg-secondary rounded">
                          <div className="font-bold">Mi-Pro Series</div>
                          <div className="text-sm text-secondary">Professional grade</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-lg">
                      <h5 className="font-bold text-primary mb-md">Key Features:</h5>
                      <ul className="space-y-sm">
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>Ultra-fine pixel pitch from P0.9 to P1.87</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>4K/8K resolution support</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>High refresh rate and grayscale</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>Seamless splicing technology</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-8xl mb-lg">📺</div>
                    <div className="text-sm text-secondary">
                      Applications: Control rooms, broadcast studios, conference rooms, commercial displays
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Rental LED Display */}
          <section className="mb-3xl">
            <div className="card">
              <div className="card-body">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl items-center">
                  <div className="text-center">
                    <div className="text-8xl mb-lg">🎭</div>
                    <div className="text-sm text-secondary">
                      Applications: Concerts, events, exhibitions, stage performances, virtual production
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-3xl font-bold mb-lg text-primary">Rental LED Display</h3>
                    <h4 className="text-lg text-secondary mb-md">租赁LED显示屏</h4>
                    <p className="text-lg mb-lg text-secondary">
                      Lightweight, quick-assembly displays designed for touring, events, and temporary installations.
                    </p>
                    
                    <div className="mb-lg">
                      <h5 className="font-bold text-primary mb-md">Product Series:</h5>
                      <div className="grid grid-cols-2 gap-md">
                        <div className="p-md bg-secondary rounded">
                          <div className="font-bold">R3 Series</div>
                          <div className="text-sm text-secondary">Outdoor/Indoor</div>
                        </div>
                        <div className="p-md bg-secondary rounded">
                          <div className="font-bold">R Series</div>
                          <div className="text-sm text-secondary">Standard rental</div>
                        </div>
                        <div className="p-md bg-secondary rounded">
                          <div className="font-bold">XR Series</div>
                          <div className="text-sm text-secondary">Virtual production</div>
                        </div>
                        <div className="p-md bg-secondary rounded">
                          <div className="font-bold">Dance Floor</div>
                          <div className="text-sm text-secondary">Interactive floor</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-lg">
                      <h5 className="font-bold text-primary mb-md">Key Features:</h5>
                      <ul className="space-y-sm">
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>Lightweight aluminum cabinet design</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>Quick lock system for fast assembly</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>High refresh rate for camera applications</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>Curved and flexible configurations</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Outdoor LED Display */}
          <section className="mb-3xl">
            <div className="card">
              <div className="card-body">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-lg text-primary">Outdoor LED Display</h3>
                    <h4 className="text-lg text-secondary mb-md">户外LED显示屏</h4>
                    <p className="text-lg mb-lg text-secondary">
                      High-brightness, energy-efficient displays built to withstand harsh outdoor environments.
                    </p>
                    
                    <div className="mb-lg">
                      <h5 className="font-bold text-primary mb-md">Product Series:</h5>
                      <div className="grid grid-cols-2 gap-md">
                        <div className="p-md bg-secondary rounded">
                          <div className="font-bold">ES Series</div>
                          <div className="text-sm text-secondary">Energy-saving</div>
                        </div>
                        <div className="p-md bg-secondary rounded">
                          <div className="font-bold">ES-C Series</div>
                          <div className="text-sm text-secondary">Curved outdoor</div>
                        </div>
                        <div className="p-md bg-secondary rounded">
                          <div className="font-bold">Ti Series</div>
                          <div className="text-sm text-secondary">High-end outdoor</div>
                        </div>
                        <div className="p-md bg-secondary rounded">
                          <div className="font-bold">Ti-C Series</div>
                          <div className="text-sm text-secondary">Curved Ti series</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-lg">
                      <h5 className="font-bold text-primary mb-md">Key Features:</h5>
                      <ul className="space-y-sm">
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>High brightness up to 8000 nits</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>IP65 weatherproof rating</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>Energy-saving technology</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>Wide viewing angle</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-8xl mb-lg">🏢</div>
                    <div className="text-sm text-secondary">
                      Applications: Digital billboards, building facades, sports stadiums, transportation hubs
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Meeting Display */}
          <section className="mb-3xl">
            <div className="card">
              <div className="card-body">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl items-center">
                  <div className="text-center">
                    <div className="text-8xl mb-lg">💼</div>
                    <div className="text-sm text-secondary">
                      Applications: Conference rooms, boardrooms, presentation halls, collaborative spaces
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-3xl font-bold mb-lg text-primary">Meeting Display</h3>
                    <h4 className="text-lg text-secondary mb-md">会议一体机</h4>
                    <p className="text-lg mb-lg text-secondary">
                      All-in-one LED display solutions with integrated touch functionality for modern meeting rooms.
                    </p>
                    
                    <div className="mb-lg">
                      <h5 className="font-bold text-primary mb-md">Product Series:</h5>
                      <div className="p-md bg-secondary rounded">
                        <div className="font-bold">MeeUs Series</div>
                        <div className="text-sm text-secondary">All-in-One LED Touching Solution</div>
                      </div>
                    </div>
                    
                    <div className="mb-lg">
                      <h5 className="font-bold text-primary mb-md">Key Features:</h5>
                      <ul className="space-y-sm">
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>Interactive touch functionality</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>4K ultra-high definition</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>Integrated computing system</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>Wireless presentation capability</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Creative LED Display */}
          <section className="mb-3xl">
            <div className="card">
              <div className="card-body">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-lg text-primary">Creative LED Display</h3>
                    <h4 className="text-lg text-secondary mb-md">创意LED显示屏</h4>
                    <p className="text-lg mb-lg text-secondary">
                      Innovative display solutions including transparent, flexible, and custom-shaped LED screens.
                    </p>
                    
                    <div className="mb-lg">
                      <h5 className="font-bold text-primary mb-md">Product Types:</h5>
                      <div className="grid grid-cols-2 gap-md">
                        <div className="p-md bg-secondary rounded">
                          <div className="font-bold">Transparent LED</div>
                          <div className="text-sm text-secondary">See-through displays</div>
                        </div>
                        <div className="p-md bg-secondary rounded">
                          <div className="font-bold">Flexible LED</div>
                          <div className="text-sm text-secondary">Bendable screens</div>
                        </div>
                        <div className="p-md bg-secondary rounded">
                          <div className="font-bold">Custom Shapes</div>
                          <div className="text-sm text-secondary">Unique designs</div>
                        </div>
                        <div className="p-md bg-secondary rounded">
                          <div className="font-bold">Spherical LED</div>
                          <div className="text-sm text-secondary">360° displays</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-lg">
                      <h5 className="font-bold text-primary mb-md">Key Features:</h5>
                      <ul className="space-y-sm">
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>Innovative design possibilities</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>Lightweight and flexible</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>Custom engineering services</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>Unique visual experiences</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-8xl mb-lg">✨</div>
                    <div className="text-sm text-secondary">
                      Applications: Retail stores, museums, architectural integration, art installations
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Poster LED Display */}
          <section className="mb-3xl">
            <div className="card">
              <div className="card-body">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl items-center">
                  <div className="text-center">
                    <div className="text-8xl mb-lg">📱</div>
                    <div className="text-sm text-secondary">
                      Applications: Retail advertising, shopping malls, airports, hotels, corporate lobbies
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-3xl font-bold mb-lg text-primary">Poster LED Display</h3>
                    <h4 className="text-lg text-secondary mb-md">LED海报屏</h4>
                    <p className="text-lg mb-lg text-secondary">
                      Compact digital signage solutions perfect for advertising and information display.
                    </p>
                    
                    <div className="mb-lg">
                      <h5 className="font-bold text-primary mb-md">Product Series:</h5>
                      <div className="grid grid-cols-3 gap-md">
                        <div className="p-md bg-secondary rounded">
                          <div className="font-bold">G-T4 Series</div>
                          <div className="text-sm text-secondary">Standard poster</div>
                        </div>
                        <div className="p-md bg-secondary rounded">
                          <div className="font-bold">G-X4 Series</div>
                          <div className="text-sm text-secondary">Premium poster</div>
                        </div>
                        <div className="p-md bg-secondary rounded">
                          <div className="font-bold">G-T5 Series</div>
                          <div className="text-sm text-secondary">Advanced poster</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-lg">
                      <h5 className="font-bold text-primary mb-md">Key Features:</h5>
                      <ul className="space-y-sm">
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>Ultra-thin design</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>Easy content management</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>Single/double-sided options</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>Remote control capability</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="text-center">
            <div className="card">
              <div className="card-body">
                <h3 className="text-2xl font-bold mb-md text-primary">Need a Custom Solution?</h3>
                <p className="text-lg mb-lg text-secondary">
                  Our engineering team can design and manufacture LED displays tailored to your specific requirements.
                </p>
                <div className="flex flex-col md:flex-row gap-md justify-center">
                  <a href="/contact" className="btn btn-primary btn-lg">
                    Contact Our Experts
                  </a>
                  <a href="mailto:sales@lianjinled.com" className="btn btn-secondary btn-lg">
                    Request Quote
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-light py-2xl">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-lg mb-xl">
            <div>
              <h4 className="font-bold mb-lg text-light">LIANJIN LED</h4>
              <p className="text-sm opacity-80">
                Professional LED display manufacturer since 2007
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-lg text-light">Products</h5>
              <ul className="text-sm space-y-sm opacity-80">
                <li>Fine Pitch LED Display</li>
                <li>Rental LED Display</li>
                <li>Outdoor LED Display</li>
                <li>Creative LED Solutions</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-lg text-light">Company</h5>
              <ul className="text-sm space-y-sm opacity-80">
                <li><a href="/" className="text-light opacity-80 hover:opacity-100">Home</a></li>
                <li><a href="/about" className="text-light opacity-80 hover:opacity-100">About Us</a></li>
                <li><a href="/contact" className="text-light opacity-80 hover:opacity-100">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-lg text-light">Contact</h5>
              <div className="text-sm space-y-sm opacity-80">
                <div>+86 755-8259-5016</div>
                <div>sales@lianjinled.com</div>
                <div>Shenzhen, China</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-lg text-center">
            <p className="text-sm opacity-60">
              © 2024 Shenzhen Lianjin Photoelectricity Co., Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}