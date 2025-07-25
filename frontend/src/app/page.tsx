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

        {/* Company Highlights Section */}
        <section className="py-2xl">
          <div className="container">
            <div className="text-center mb-2xl">
              <h3 className="text-4xl font-bold mb-lg">Why Choose LIANJIN LED</h3>
              <p className="text-xl text-secondary max-w-3xl mx-auto">
                Since 2007, we have been a leading high-tech enterprise specializing in LED display R&D, manufacturing, and global service
              </p>
            </div>
            
            {/* Key Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-lg mb-2xl">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-sm">50,000㎡</div>
                <div className="text-sm text-secondary">Total Factory Area</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-sm">160+</div>
                <div className="text-sm text-secondary">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-sm">2007</div>
                <div className="text-sm text-secondary">Established</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-sm">ISO</div>
                <div className="text-sm text-secondary">Certified Quality</div>
              </div>
            </div>

            {/* Core Advantages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              <div className="text-center">
                <div className="text-5xl mb-lg">🏭</div>
                <h4 className="text-xl font-bold mb-md text-primary">Advanced Manufacturing</h4>
                <p className="text-secondary">20,000㎡ production workshop with world-class equipment including Panasonic SMT machines</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-lg">🔬</div>
                <h4 className="text-xl font-bold mb-md text-primary">R&D Excellence</h4>
                <p className="text-secondary">Professional R&D team focused on innovation and next-generation LED technology development</p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-lg">🌍</div>
                <h4 className="text-xl font-bold mb-md text-primary">Global Service</h4>
                <p className="text-secondary">Comprehensive sales network covering 160+ countries with 24/7 technical support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Categories Section */}
        <section id="products" className="py-2xl bg-secondary">
          <div className="container">
            <div className="text-center mb-2xl">
              <h3 className="text-4xl font-bold mb-lg">Product Categories</h3>
              <p className="text-xl text-secondary max-w-3xl mx-auto">
                Professional LED display solutions for diverse applications worldwide
              </p>
            </div>
            
            {/* Main Product Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg mb-2xl">
              <div className="card text-center">
                <div className="card-body">
                  <div className="text-5xl mb-lg">📺</div>
                  <h4 className="text-xl font-bold mb-md text-primary">Fine Pitch LED Display</h4>
                  <p className="text-sm text-secondary mb-md">X3-SMD, X3-COB, X3-Curve, Mi-Pro Series</p>
                  <p className="text-xs text-secondary">Ultra-high resolution for control rooms and commercial displays</p>
                </div>
              </div>
              
              <div className="card text-center">
                <div className="card-body">
                  <div className="text-5xl mb-lg">🎭</div>
                  <h4 className="text-xl font-bold mb-md text-primary">Rental LED Display</h4>
                  <p className="text-sm text-secondary mb-md">R3, R Series, XR Virtual Production</p>
                  <p className="text-xs text-secondary">Lightweight, quick assembly for events and stages</p>
                </div>
              </div>
              
              <div className="card text-center">
                <div className="card-body">
                  <div className="text-5xl mb-lg">🏢</div>
                  <h4 className="text-xl font-bold mb-md text-primary">Outdoor LED Display</h4>
                  <p className="text-sm text-secondary mb-md">ES Series, Ti Series Energy-saving</p>
                  <p className="text-xs text-secondary">High brightness, weatherproof for outdoor advertising</p>
                </div>
              </div>
              
              <div className="card text-center">
                <div className="card-body">
                  <div className="text-5xl mb-lg">💼</div>
                  <h4 className="text-xl font-bold mb-md text-primary">Meeting Display</h4>
                  <p className="text-sm text-secondary mb-md">MeeUs All-in-One LED Solution</p>
                  <p className="text-xs text-secondary">Interactive touch-enabled for conference rooms</p>
                </div>
              </div>
              
              <div className="card text-center">
                <div className="card-body">
                  <div className="text-5xl mb-lg">✨</div>
                  <h4 className="text-xl font-bold mb-md text-primary">Creative LED Display</h4>
                  <p className="text-sm text-secondary mb-md">Transparent, Flexible, Custom Shapes</p>
                  <p className="text-xs text-secondary">Innovative designs for unique installations</p>
                </div>
              </div>
              
              <div className="card text-center">
                <div className="card-body">
                  <div className="text-5xl mb-lg">📱</div>
                  <h4 className="text-xl font-bold mb-md text-primary">Poster LED Display</h4>
                  <p className="text-sm text-secondary mb-md">G-T4, G-X4, G-T5 Series</p>
                  <p className="text-xs text-secondary">Compact digital signage solutions</p>
                </div>
              </div>
            </div>

            {/* View All Products Button */}
            <div className="text-center">
              <a href="/products" className="btn btn-primary btn-lg">
                View All Products
              </a>
            </div>
          </div>
        </section>

        {/* About Company Section */}
        <section id="about" className="py-2xl">
          <div className="container">
            <div className="text-center mb-2xl">
              <h3 className="text-4xl font-bold mb-lg">About LIANJIN LED</h3>
              <h4 className="text-xl text-primary mb-md">关于联锦光电</h4>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl items-center">
              <div>
                <p className="text-lg mb-lg text-secondary">
                  Founded in 2007, Shenzhen Lianjin Photoelectricity Co., Ltd. is a national high-tech enterprise specializing in LED display R&D, manufacturing, sales, and engineering services. With registered capital of 20.1 million RMB, we operate from a 50,000㎡ facility with 20,000㎡ production workshop.
                </p>
                <p className="text-md mb-lg text-secondary opacity-80">
                  成立于2007年，深圳联锦光电有限公司是一家集LED显示屏研发、生产、销售、工程服务为一体的国家高新技术企业。注册资本2010万元人民币，总占地面积50000㎡，生产车间20000㎡。
                </p>
                
                {/* Company Mission */}
                <div className="mb-lg">
                  <h5 className="text-lg font-bold text-primary mb-md">Our Mission</h5>
                  <p className="text-secondary">Contributing to society, creating benefits for employees</p>
                  <p className="text-sm text-secondary opacity-80">为社会做贡献，为员工谋福利</p>
                </div>
              </div>
              
              <div>
                {/* Certifications */}
                <div className="card mb-lg">
                  <div className="card-body">
                    <h4 className="text-xl font-bold mb-lg text-primary">Certifications & Standards</h4>
                    <div className="grid grid-cols-3 gap-md">
                      <div className="text-center p-sm bg-secondary rounded">
                        <div className="font-bold text-primary">ISO45001</div>
                        <div className="text-xs text-secondary">Quality System</div>
                      </div>
                      <div className="text-center p-sm bg-secondary rounded">
                        <div className="font-bold text-primary">CE</div>
                        <div className="text-xs text-secondary">European</div>
                      </div>
                      <div className="text-center p-sm bg-secondary rounded">
                        <div className="font-bold text-primary">FCC</div>
                        <div className="text-xs text-secondary">US Standard</div>
                      </div>
                      <div className="text-center p-sm bg-secondary rounded">
                        <div className="font-bold text-primary">3C</div>
                        <div className="text-xs text-secondary">China</div>
                      </div>
                      <div className="text-center p-sm bg-secondary rounded">
                        <div className="font-bold text-primary">RoHS</div>
                        <div className="text-xs text-secondary">Environmental</div>
                      </div>
                      <div className="text-center p-sm bg-secondary rounded">
                        <div className="font-bold text-primary">TUV</div>
                        <div className="text-xs text-secondary">Safety</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Global Exhibitions */}
                <div className="card">
                  <div className="card-body">
                    <h4 className="text-xl font-bold mb-lg text-primary">Global Exhibitions</h4>
                    <div className="grid grid-cols-2 gap-sm text-sm text-secondary">
                      <div>• ISLE (China)</div>
                      <div>• ISE (Europe)</div>
                      <div>• Infocomm (Global)</div>
                      <div>• LED China (Shenzhen)</div>
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