// Contact Page - Based on Lianjin LED Contact Information
export default function ContactPage() {
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
              <a href="/products" className="text-light opacity-80 hover:opacity-100">Products</a>
              <a href="/contact" className="text-light">Contact</a>
            </div>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <section className="py-xl bg-primary text-light">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-md">Contact Us</h2>
          <p className="text-xl opacity-90">Get in Touch with Our LED Display Experts</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-2xl">
        <div className="container">
          
          {/* Contact Information */}
          <section className="mb-3xl">
            <div className="text-center mb-2xl">
              <h3 className="text-3xl font-bold mb-lg text-primary">Contact Information</h3>
              <p className="text-xl text-secondary">
                Ready to discuss your LED display project? Our experts are here to help.
              </p>
              <p className="text-md text-secondary opacity-80">
                准备讨论您的LED显示项目？我们的专家随时为您提供帮助。
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              <div className="card text-center">
                <div className="card-body">
                  <div className="text-5xl mb-lg">📞</div>
                  <h4 className="text-xl font-bold mb-md text-primary">Phone / 电话</h4>
                  <p className="text-lg font-semibold text-primary mb-sm">+86 755-8259-5016</p>
                  <p className="text-sm text-secondary">24/7 Technical Support Available</p>
                  <p className="text-xs text-secondary opacity-80">24小时技术支持</p>
                </div>
              </div>
              
              <div className="card text-center">
                <div className="card-body">
                  <div className="text-5xl mb-lg">✉️</div>
                  <h4 className="text-xl font-bold mb-md text-primary">Email / 邮箱</h4>
                  <p className="text-lg font-semibold text-primary mb-sm">bruce@lianjinled.com</p>
                  <p className="text-sm text-secondary">Quick Response Guaranteed</p>
                  <p className="text-xs text-secondary opacity-80">保证快速回复</p>
                </div>
              </div>
              
              <div className="card text-center">
                <div className="card-body">
                  <div className="text-5xl mb-lg">📍</div>
                  <h4 className="text-xl font-bold mb-md text-primary">Address / 地址</h4>
                  <p className="text-md text-secondary mb-sm">
                    Building C, Tangtou First Industrial Zone<br />
                    Shiyan Street, Bao'an District<br />
                    Shenzhen, China
                  </p>
                  <p className="text-xs text-secondary opacity-80">
                    深圳市宝安区石岩街道塘头第一工业区C栋
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Inquiry Form */}
          <section className="mb-3xl">
            <div className="card">
              <div className="card-body">
                <h3 className="text-3xl font-bold mb-lg text-primary text-center">Send Us an Inquiry</h3>
                <h4 className="text-lg text-secondary mb-2xl text-center">发送询盘</h4>
                
                <form className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mb-lg">
                    <div>
                      <label className="block text-sm font-bold text-primary mb-sm">
                        Full Name / 姓名 *
                      </label>
                      <input 
                        type="text" 
                        className="w-full p-md border border-gray-300 rounded focus:border-primary focus:outline-none"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-primary mb-sm">
                        Company / 公司 *
                      </label>
                      <input 
                        type="text" 
                        className="w-full p-md border border-gray-300 rounded focus:border-primary focus:outline-none"
                        placeholder="Enter your company name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mb-lg">
                    <div>
                      <label className="block text-sm font-bold text-primary mb-sm">
                        Email / 邮箱 *
                      </label>
                      <input 
                        type="email" 
                        className="w-full p-md border border-gray-300 rounded focus:border-primary focus:outline-none"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-primary mb-sm">
                        Phone / 电话
                      </label>
                      <input 
                        type="tel" 
                        className="w-full p-md border border-gray-300 rounded focus:border-primary focus:outline-none"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mb-lg">
                    <div>
                      <label className="block text-sm font-bold text-primary mb-sm">
                        Country / 国家
                      </label>
                      <input 
                        type="text" 
                        className="w-full p-md border border-gray-300 rounded focus:border-primary focus:outline-none"
                        placeholder="Enter your country"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-primary mb-sm">
                        Product Interest / 产品兴趣
                      </label>
                      <select className="w-full p-md border border-gray-300 rounded focus:border-primary focus:outline-none">
                        <option value="">Select product category</option>
                        <option value="fine-pitch">Fine Pitch LED Display</option>
                        <option value="rental">Rental LED Display</option>
                        <option value="outdoor">Outdoor LED Display</option>
                        <option value="meeting">Meeting Display</option>
                        <option value="creative">Creative LED Display</option>
                        <option value="poster">Poster LED Display</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-lg">
                    <label className="block text-sm font-bold text-primary mb-sm">
                      Project Details / 项目详情 *
                    </label>
                    <textarea 
                      rows={6}
                      className="w-full p-md border border-gray-300 rounded focus:border-primary focus:outline-none"
                      placeholder="Please describe your project requirements, including:
- Application scenario
- Screen size requirements
- Installation environment
- Budget range
- Timeline
- Any special requirements"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="text-center">
                    <button 
                      type="submit"
                      className="btn btn-primary btn-lg px-2xl"
                    >
                      Send Inquiry / 发送询盘
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>

          {/* Company Location */}
          <section className="mb-3xl">
            <div className="card">
              <div className="card-body">
                <h3 className="text-3xl font-bold mb-lg text-primary text-center">Visit Our Factory</h3>
                <h4 className="text-lg text-secondary mb-2xl text-center">参观我们的工厂</h4>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl items-center">
                  <div>
                    <h5 className="text-xl font-bold text-primary mb-md">Factory Information</h5>
                    <div className="space-y-md">
                      <div className="flex items-start">
                        <span className="text-primary mr-sm">📍</span>
                        <div>
                          <div className="font-bold">Address:</div>
                          <div className="text-secondary">Building C, Tangtou First Industrial Zone, Shiyan Street, Bao'an District, Shenzhen, China</div>
                          <div className="text-sm text-secondary opacity-80">深圳市宝安区石岩街道塘头第一工业区C栋</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <span className="text-primary mr-sm">🏭</span>
                        <div>
                          <div className="font-bold">Factory Size:</div>
                          <div className="text-secondary">50,000㎡ total area, 20,000㎡ production workshop</div>
                          <div className="text-sm text-secondary opacity-80">总占地面积50000㎡，生产车间20000㎡</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <span className="text-primary mr-sm">🕒</span>
                        <div>
                          <div className="font-bold">Business Hours:</div>
                          <div className="text-secondary">Monday - Friday: 8:00 AM - 6:00 PM (GMT+8)</div>
                          <div className="text-sm text-secondary opacity-80">周一至周五：上午8:00 - 下午6:00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-8xl mb-lg">🏭</div>
                    <p className="text-secondary">
                      We welcome customers to visit our factory and see our advanced production capabilities firsthand.
                    </p>
                    <p className="text-sm text-secondary opacity-80 mt-sm">
                      欢迎客户参观我们的工厂，亲眼见证我们先进的生产能力。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Global Sales Network */}
          <section className="mb-3xl">
            <div className="card">
              <div className="card-body">
                <h3 className="text-3xl font-bold mb-lg text-primary text-center">Global Sales Network</h3>
                <h4 className="text-lg text-secondary mb-2xl text-center">全球销售网络</h4>
                
                <div className="text-center mb-2xl">
                  <div className="text-6xl font-bold text-primary mb-md">160+</div>
                  <p className="text-xl text-secondary">Countries and Regions Served</p>
                  <p className="text-md text-secondary opacity-80">服务国家和地区</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-lg">
                  <div className="text-center">
                    <div className="text-3xl mb-sm">🌏</div>
                    <div className="font-bold text-primary">Asia Pacific</div>
                    <div className="text-sm text-secondary">亚太地区</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-sm">🌍</div>
                    <div className="font-bold text-primary">Europe</div>
                    <div className="text-sm text-secondary">欧洲</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-sm">🌎</div>
                    <div className="font-bold text-primary">Americas</div>
                    <div className="text-sm text-secondary">美洲</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-sm">🌍</div>
                    <div className="font-bold text-primary">Africa</div>
                    <div className="text-sm text-secondary">非洲</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Support */}
          <section className="mb-3xl">
            <div className="card">
              <div className="card-body">
                <h3 className="text-3xl font-bold mb-lg text-primary text-center">Technical Support</h3>
                <h4 className="text-lg text-secondary mb-2xl text-center">技术支持</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2xl">
                  <div>
                    <h5 className="text-xl font-bold text-primary mb-md">Support Services</h5>
                    <ul className="space-y-md">
                      <li className="flex items-start">
                        <span className="text-primary mr-sm">•</span>
                        <span>Pre-sales technical consultation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-sm">•</span>
                        <span>Custom solution design</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-sm">•</span>
                        <span>Installation guidance and training</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-sm">•</span>
                        <span>After-sales maintenance support</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-sm">•</span>
                        <span>Remote technical assistance</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-xl font-bold text-primary mb-md">Support Channels</h5>
                    <div className="space-y-md">
                      <div className="p-md bg-secondary rounded">
                        <div className="font-bold">Phone Support</div>
                        <div className="text-sm text-secondary">+86 755-8259-5016 (24/7)</div>
                      </div>
                      <div className="p-md bg-secondary rounded">
                        <div className="font-bold">Email Support</div>
                        <div className="text-sm text-secondary">bruce@lianjinled.com</div>
                      </div>
                      <div className="p-md bg-secondary rounded">
                        <div className="font-bold">On-site Service</div>
                        <div className="text-sm text-secondary">Available for major projects</div>
                      </div>
                    </div>
                  </div>
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
                <div>bruce@lianjinled.com</div>
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