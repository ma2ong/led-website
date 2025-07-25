// Lianjin LED Homepage - Professional LED Display Solutions
export default function HomePage() {
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
              <span className="text-sm">Professional LED Display Manufacturer</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="py-3xl bg-primary text-light">
          <div className="container text-center">
            <div className="fade-in">
              <h2 className="text-5xl font-bold mb-lg text-light">
                Innovative LED Display Solutions
              </h2>
              <p className="text-xl mb-md opacity-90">
                Leading manufacturer of high-quality LED displays for global markets
              </p>
              <p className="text-lg mb-xl opacity-80">
                创新LED显示解决方案 | 全球市场的高品质LED显示屏制造商
              </p>
              <div className="flex flex-col md:flex-row gap-md justify-center">
                <a href="#products" className="btn btn-secondary btn-lg">
                  Our Products
                </a>
                <a href="#contact" className="btn btn-primary btn-lg bg-accent border-accent">
                  Get Quote
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-2xl">
          <div className="container">
            <div className="text-center mb-2xl">
              <h3 className="text-4xl font-bold mb-lg">Why Choose Lianjin LED</h3>
              <p className="text-xl text-secondary max-w-3xl mx-auto">
                Over 15 years of expertise in LED display manufacturing with cutting-edge technology
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
              <div className="card text-center slide-up">
                <div className="card-body">
                  <div className="text-4xl mb-lg">🏭</div>
                  <h4 className="font-bold mb-md text-primary">Manufacturing Excellence</h4>
                  <p className="text-sm text-secondary">State-of-the-art production facilities with ISO certification</p>
                </div>
              </div>
              <div className="card text-center slide-up">
                <div className="card-body">
                  <div className="text-4xl mb-lg">🔬</div>
                  <h4 className="font-bold mb-md text-primary">R&D Innovation</h4>
                  <p className="text-sm text-secondary">Dedicated research team developing next-gen LED technology</p>
                </div>
              </div>
              <div className="card text-center slide-up">
                <div className="card-body">
                  <div className="text-4xl mb-lg">🌍</div>
                  <h4 className="font-bold mb-md text-primary">Global Reach</h4>
                  <p className="text-sm text-secondary">Serving customers in 50+ countries worldwide</p>
                </div>
              </div>
              <div className="card text-center slide-up">
                <div className="card-body">
                  <div className="text-4xl mb-lg">⚡</div>
                  <h4 className="font-bold mb-md text-primary">Fast Delivery</h4>
                  <p className="text-sm text-secondary">Quick turnaround with comprehensive after-sales support</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-2xl bg-secondary">
          <div className="container">
            <div className="text-center mb-2xl">
              <h3 className="text-4xl font-bold mb-lg">Our Product Range</h3>
              <p className="text-xl text-secondary max-w-3xl mx-auto">
                Comprehensive LED display solutions for every application
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl">
              <div className="card">
                <div className="card-body">
                  <h4 className="text-2xl font-bold mb-lg text-primary">Outdoor LED Displays</h4>
                  <div className="grid grid-cols-2 gap-md mb-lg">
                    <div className="text-center p-md bg-primary text-light rounded">
                      <div className="text-2xl mb-sm">🏢</div>
                      <div className="font-semibold text-sm">Fixed Installation</div>
                    </div>
                    <div className="text-center p-md bg-primary text-light rounded">
                      <div className="text-2xl mb-sm">📺</div>
                      <div className="font-semibold text-sm">Digital Billboards</div>
                    </div>
                  </div>
                  <ul className="space-y-sm text-sm">
                    <li className="flex items-start">
                      <span className="text-primary mr-sm">•</span>
                      <span>High brightness (5000-8000 nits) for daylight visibility</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-sm">•</span>
                      <span>IP65 weatherproof rating for all climates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-sm">•</span>
                      <span>Pixel pitches from P2.5 to P10</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="card">
                <div className="card-body">
                  <h4 className="text-2xl font-bold mb-lg text-primary">Indoor LED Displays</h4>
                  <div className="grid grid-cols-2 gap-md mb-lg">
                    <div className="text-center p-md bg-accent text-light rounded">
                      <div className="text-2xl mb-sm">🏠</div>
                      <div className="font-semibold text-sm">Fine Pitch</div>
                    </div>
                    <div className="text-center p-md bg-accent text-light rounded">
                      <div className="text-2xl mb-sm">🎭</div>
                      <div className="font-semibold text-sm">Stage Displays</div>
                    </div>
                  </div>
                  <ul className="space-y-sm text-sm">
                    <li className="flex items-start">
                      <span className="text-primary mr-sm">•</span>
                      <span>Ultra-fine pixel pitches from P0.9 to P4</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-sm">•</span>
                      <span>4K/8K resolution support</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-sm">•</span>
                      <span>Low power consumption with excellent heat dissipation</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <h4 className="text-2xl font-bold mb-lg text-primary">Rental LED Displays</h4>
                  <div className="grid grid-cols-2 gap-md mb-lg">
                    <div className="text-center p-md bg-success text-light rounded">
                      <div className="text-2xl mb-sm">🎪</div>
                      <div className="font-semibold text-sm">Event Screens</div>
                    </div>
                    <div className="text-center p-md bg-success text-light rounded">
                      <div className="text-2xl mb-sm">🎵</div>
                      <div className="font-semibold text-sm">Concert Displays</div>
                    </div>
                  </div>
                  <ul className="space-y-sm text-sm">
                    <li className="flex items-start">
                      <span className="text-primary mr-sm">•</span>
                      <span>Lightweight design for easy transportation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-sm">•</span>
                      <span>Quick assembly with magnetic connections</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-sm">•</span>
                      <span>Curved and flexible configurations available</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <h4 className="text-2xl font-bold mb-lg text-primary">Creative LED Solutions</h4>
                  <div className="grid grid-cols-2 gap-md mb-lg">
                    <div className="text-center p-md bg-warning text-dark rounded">
                      <div className="text-2xl mb-sm">✨</div>
                      <div className="font-semibold text-sm">Custom Shapes</div>
                    </div>
                    <div className="text-center p-md bg-warning text-dark rounded">
                      <div className="text-2xl mb-sm">🔄</div>
                      <div className="font-semibold text-sm">Flexible Strips</div>
                    </div>
                  </div>
                  <ul className="space-y-sm text-sm">
                    <li className="flex items-start">
                      <span className="text-primary mr-sm">•</span>
                      <span>Transparent, curved, and spherical displays</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-sm">•</span>
                      <span>Interactive touch-enabled screens</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-sm">•</span>
                      <span>Custom design and engineering services</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Info Section */}
        <section id="about" className="py-2xl">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl items-center">
              <div>
                <h3 className="text-4xl font-bold mb-lg">About Lianjin LED</h3>
                <h4 className="text-xl text-primary mb-md">关于联锦光电</h4>
                <p className="text-lg mb-md text-secondary">
                  Founded in 2009, Lianjin LED has grown to become a leading manufacturer of professional LED display solutions. Based in Shenzhen, China, we combine advanced manufacturing capabilities with innovative design to deliver exceptional visual experiences worldwide.
                </p>
                <p className="text-md mb-lg text-secondary opacity-80">
                  成立于2009年，联锦光电已发展成为专业LED显示解决方案的领先制造商。我们总部位于中国深圳，将先进的制造能力与创新设计相结合，为全球客户提供卓越的视觉体验。
                </p>
                <div className="grid grid-cols-2 gap-md">
                  <div className="text-center p-md border border-primary rounded">
                    <div className="text-2xl font-bold text-primary">15+</div>
                    <div className="text-sm text-secondary">Years Experience</div>
                  </div>
                  <div className="text-center p-md border border-primary rounded">
                    <div className="text-2xl font-bold text-primary">50+</div>
                    <div className="text-sm text-secondary">Countries Served</div>
                  </div>
                  <div className="text-center p-md border border-primary rounded">
                    <div className="text-2xl font-bold text-primary">1000+</div>
                    <div className="text-sm text-secondary">Projects Completed</div>
                  </div>
                  <div className="text-center p-md border border-primary rounded">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-secondary">Technical Support</div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h4 className="text-2xl font-bold mb-lg text-primary">Our Certifications</h4>
                  <div className="grid grid-cols-2 gap-md">
                    <div className="text-center p-md bg-secondary rounded">
                      <div className="text-lg font-bold text-primary">ISO 9001</div>
                      <div className="text-sm text-secondary">Quality Management</div>
                    </div>
                    <div className="text-center p-md bg-secondary rounded">
                      <div className="text-lg font-bold text-primary">CE</div>
                      <div className="text-sm text-secondary">European Conformity</div>
                    </div>
                    <div className="text-center p-md bg-secondary rounded">
                      <div className="text-lg font-bold text-primary">FCC</div>
                      <div className="text-sm text-secondary">US Compliance</div>
                    </div>
                    <div className="text-center p-md bg-secondary rounded">
                      <div className="text-lg font-bold text-primary">RoHS</div>
                      <div className="text-sm text-secondary">Environmental</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-2xl bg-secondary">
          <div className="container">
            <div className="text-center mb-2xl">
              <h3 className="text-4xl font-bold mb-lg">Contact Us</h3>
              <p className="text-xl text-secondary">
                Ready to discuss your LED display project? Get in touch with our experts.
              </p>
              <p className="text-md text-secondary opacity-80">
                准备讨论您的LED显示项目？请联系我们的专家。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              <div className="card text-center">
                <div className="card-body">
                  <div className="text-4xl mb-lg">📞</div>
                  <h4 className="font-bold mb-md">Phone / 电话</h4>
                  <p className="text-primary font-semibold">+86 755-2345-6789</p>
                  <p className="text-sm text-secondary">24/7 Technical Support</p>
                </div>
              </div>
              <div className="card text-center">
                <div className="card-body">
                  <div className="text-4xl mb-lg">✉️</div>
                  <h4 className="font-bold mb-md">Email / 邮箱</h4>
                  <p className="text-primary font-semibold">sales@lianjinled.com</p>
                  <p className="text-sm text-secondary">Quick Response Guaranteed</p>
                </div>
              </div>
              <div className="card text-center">
                <div className="card-body">
                  <div className="text-4xl mb-lg">📍</div>
                  <h4 className="font-bold mb-md">Address / 地址</h4>
                  <p className="text-secondary">Building A, LED Industrial Park<br />Bao'an District, Shenzhen, China</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-light py-2xl">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-lg mb-xl">
            <div>
              <h4 className="font-bold mb-lg text-light">LIANJIN LED</h4>
              <p className="text-sm opacity-80 mb-md">
                Professional LED display manufacturer committed to delivering innovative visual solutions worldwide.
              </p>
              <p className="text-xs opacity-60">
                专业LED显示屏制造商，致力于为全球提供创新的视觉解决方案。
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-lg text-light">Products</h5>
              <ul className="text-sm space-y-sm opacity-80">
                <li>Outdoor LED Displays</li>
                <li>Indoor LED Displays</li>
                <li>Rental LED Screens</li>
                <li>Creative LED Solutions</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-lg text-light">Services</h5>
              <ul className="text-sm space-y-sm opacity-80">
                <li>Custom Design</li>
                <li>Installation Support</li>
                <li>Technical Training</li>
                <li>Maintenance Service</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-lg text-light">Company</h5>
              <ul className="text-sm space-y-sm opacity-80">
                <li>About Us</li>
                <li>Quality Control</li>
                <li>Global Partners</li>
                <li>News & Events</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-lg text-center">
            <p className="text-sm opacity-60">
              © 2024 Lianjin LED Technology Co., Ltd. All rights reserved. | 
              <span className="ml-sm">深圳联锦光电有限公司 版权所有</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}