// About Page - Based on Lianjin LED Company Information
export default function AboutPage() {
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
              <a href="/about" className="text-light">About</a>
              <a href="/products" className="text-light opacity-80 hover:opacity-100">Products</a>
              <a href="/contact" className="text-light opacity-80 hover:opacity-100">Contact</a>
            </div>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <section className="py-xl bg-primary text-light">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-md">About LIANJIN LED</h2>
          <p className="text-xl opacity-90">Leading the Innovation in LED Display Technology Since 2007</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-2xl">
        <div className="container">
          
          {/* Company Overview */}
          <section className="mb-3xl">
            <div className="card">
              <div className="card-body">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-lg text-primary">Company Overview</h3>
                    <h4 className="text-lg text-secondary mb-md">公司概况</h4>
                    <p className="text-lg mb-md text-secondary">
                      Shenzhen Lianjin Photoelectricity Co., Ltd., established in 2007, is a national high-tech enterprise specializing in LED display research and development, manufacturing, sales, and engineering services. With registered capital of 20.1 million RMB, we have grown to become a leading manufacturer in the LED display industry.
                    </p>
                    <p className="text-md mb-lg text-secondary opacity-80">
                      深圳联锦光电有限公司成立于2007年，是一家集LED显示屏研发、生产、销售、工程服务为一体的国家高新技术企业。注册资本2010万元人民币，已发展成为LED显示屏行业的领先制造商。
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-8xl mb-lg">🏭</div>
                    <div className="text-sm text-secondary">
                      National High-tech Enterprise Certificate
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Manufacturing Capabilities */}
          <section className="mb-3xl">
            <div className="card">
              <div className="card-body">
                <h3 className="text-3xl font-bold mb-lg text-primary text-center">Manufacturing Excellence</h3>
                <h4 className="text-lg text-secondary mb-2xl text-center">生产制造实力</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg mb-2xl">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-sm">50,000㎡</div>
                    <div className="text-sm text-secondary">Total Factory Area</div>
                    <div className="text-xs text-secondary opacity-80">总占地面积</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-sm">20,000㎡</div>
                    <div className="text-sm text-secondary">Production Workshop</div>
                    <div className="text-xs text-secondary opacity-80">生产车间</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-sm">2,000㎡</div>
                    <div className="text-sm text-secondary">Office Area</div>
                    <div className="text-xs text-secondary opacity-80">办公区域</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-sm">160+</div>
                    <div className="text-sm text-secondary">Countries Served</div>
                    <div className="text-xs text-secondary opacity-80">服务国家</div>
                  </div>
                </div>

                <div className="mb-lg">
                  <h5 className="font-bold text-primary mb-md">World-Class Equipment:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    <div className="p-md bg-secondary rounded">
                      <div className="font-bold">Panasonic SMT Machine</div>
                      <div className="text-sm text-secondary">NPMD3A High-precision placement</div>
                    </div>
                    <div className="p-md bg-secondary rounded">
                      <div className="font-bold">MPM Screen Printer</div>
                      <div className="text-sm text-secondary">US-made precision printing</div>
                    </div>
                    <div className="p-md bg-secondary rounded">
                      <div className="font-bold">Reflow Soldering</div>
                      <div className="text-sm text-secondary">Advanced soldering technology</div>
                    </div>
                    <div className="p-md bg-secondary rounded">
                      <div className="font-bold">Automated Testing</div>
                      <div className="text-sm text-secondary">Quality assurance systems</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Corporate Culture */}
          <section className="mb-3xl">
            <div className="card">
              <div className="card-body">
                <h3 className="text-3xl font-bold mb-lg text-primary text-center">Corporate Culture</h3>
                <h4 className="text-lg text-secondary mb-2xl text-center">企业文化</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2xl">
                  <div>
                    <div className="mb-lg">
                      <h5 className="text-xl font-bold text-primary mb-md">Our Mission 企业使命</h5>
                      <p className="text-lg text-secondary">Contributing to society, creating benefits for employees</p>
                      <p className="text-md text-secondary opacity-80">为社会做贡献，为员工谋福利</p>
                    </div>
                    
                    <div className="mb-lg">
                      <h5 className="text-xl font-bold text-primary mb-md">Our Goal 企业目标</h5>
                      <p className="text-lg text-secondary">Creating a first-class domestic and internationally leading enterprise</p>
                      <p className="text-md text-secondary opacity-80">创国内一流国际领先企业</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-lg">
                      <h5 className="text-xl font-bold text-primary mb-md">Our Spirit 企业精神</h5>
                      <div className="grid grid-cols-3 gap-md">
                        <div className="text-center p-md bg-secondary rounded">
                          <div className="font-bold">Pragmatic</div>
                          <div className="text-sm text-secondary">务实</div>
                        </div>
                        <div className="text-center p-md bg-secondary rounded">
                          <div className="font-bold">Craftsmanship</div>
                          <div className="text-sm text-secondary">匠心</div>
                        </div>
                        <div className="text-center p-md bg-secondary rounded">
                          <div className="font-bold">Innovation</div>
                          <div className="text-sm text-secondary">创新</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-lg">
                      <h5 className="text-xl font-bold text-primary mb-md">Our Style 企业作风</h5>
                      <div className="grid grid-cols-3 gap-md">
                        <div className="text-center p-md bg-secondary rounded">
                          <div className="font-bold">Honest</div>
                          <div className="text-sm text-secondary">诚实</div>
                        </div>
                        <div className="text-center p-md bg-secondary rounded">
                          <div className="font-bold">Rigorous</div>
                          <div className="text-sm text-secondary">严谨</div>
                        </div>
                        <div className="text-center p-md bg-secondary rounded">
                          <div className="font-bold">Meticulous</div>
                          <div className="text-sm text-secondary">细致</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Certifications & Quality */}
          <section className="mb-3xl">
            <div className="card">
              <div className="card-body">
                <h3 className="text-3xl font-bold mb-lg text-primary text-center">Quality System & Certifications</h3>
                <h4 className="text-lg text-secondary mb-2xl text-center">质量体系与认证</h4>
                
                <div className="text-center mb-2xl">
                  <p className="text-lg text-secondary">
                    We strictly implement ISO45001:2020 International Standardized Quality Management System
                  </p>
                  <p className="text-md text-secondary opacity-80">
                    严格执行ISO45001:2020国际标准化质量管理体系
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-md">
                  <div className="text-center p-md bg-secondary rounded">
                    <div className="font-bold text-primary">ISO45001</div>
                    <div className="text-xs text-secondary">Quality Management</div>
                  </div>
                  <div className="text-center p-md bg-secondary rounded">
                    <div className="font-bold text-primary">3C</div>
                    <div className="text-xs text-secondary">China Compulsory</div>
                  </div>
                  <div className="text-center p-md bg-secondary rounded">
                    <div className="font-bold text-primary">CE</div>
                    <div className="text-xs text-secondary">European Conformity</div>
                  </div>
                  <div className="text-center p-md bg-secondary rounded">
                    <div className="font-bold text-primary">CB</div>
                    <div className="text-xs text-secondary">International</div>
                  </div>
                  <div className="text-center p-md bg-secondary rounded">
                    <div className="font-bold text-primary">IEC</div>
                    <div className="text-xs text-secondary">International Standard</div>
                  </div>
                  <div className="text-center p-md bg-secondary rounded">
                    <div className="font-bold text-primary">TUV</div>
                    <div className="text-xs text-secondary">Safety Certification</div>
                  </div>
                  <div className="text-center p-md bg-secondary rounded">
                    <div className="font-bold text-primary">FCC</div>
                    <div className="text-xs text-secondary">US Compliance</div>
                  </div>
                  <div className="text-center p-md bg-secondary rounded">
                    <div className="font-bold text-primary">RoHS</div>
                    <div className="text-xs text-secondary">Environmental</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Company Honors */}
          <section className="mb-3xl">
            <div className="card">
              <div className="card-body">
                <h3 className="text-3xl font-bold mb-lg text-primary text-center">Company Honors</h3>
                <h4 className="text-lg text-secondary mb-2xl text-center">企业荣誉</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
                  <div className="text-center p-lg bg-secondary rounded">
                    <div className="text-4xl mb-md">🏆</div>
                    <div className="font-bold text-primary mb-sm">National High-tech Enterprise</div>
                    <div className="text-sm text-secondary">国家高新技术企业</div>
                  </div>
                  <div className="text-center p-lg bg-secondary rounded">
                    <div className="text-4xl mb-md">🥇</div>
                    <div className="font-bold text-primary mb-sm">Top 100 LED Display Companies</div>
                    <div className="text-sm text-secondary">中国LED显示屏百强企业</div>
                  </div>
                  <div className="text-center p-lg bg-secondary rounded">
                    <div className="text-4xl mb-md">⭐</div>
                    <div className="font-bold text-primary mb-sm">Shenzhen Famous Brand</div>
                    <div className="text-sm text-secondary">深圳知名品牌</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Global Exhibitions */}
          <section className="mb-3xl">
            <div className="card">
              <div className="card-body">
                <h3 className="text-3xl font-bold mb-lg text-primary text-center">Global Exhibitions</h3>
                <h4 className="text-lg text-secondary mb-2xl text-center">国际展会参与</h4>
                
                <p className="text-center text-lg text-secondary mb-lg">
                  We actively participate in major international LED exhibitions to showcase our latest technologies and connect with global partners.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
                  <div className="text-center p-lg bg-secondary rounded">
                    <div className="text-3xl mb-md">🇨🇳</div>
                    <div className="font-bold text-primary mb-sm">ISLE</div>
                    <div className="text-sm text-secondary">China International LED Show</div>
                  </div>
                  <div className="text-center p-lg bg-secondary rounded">
                    <div className="text-3xl mb-md">🇪🇺</div>
                    <div className="font-bold text-primary mb-sm">ISE</div>
                    <div className="text-sm text-secondary">Integrated Systems Europe</div>
                  </div>
                  <div className="text-center p-lg bg-secondary rounded">
                    <div className="text-3xl mb-md">🌍</div>
                    <div className="font-bold text-primary mb-sm">InfoComm</div>
                    <div className="text-sm text-secondary">Global AV Exhibition</div>
                  </div>
                  <div className="text-center p-lg bg-secondary rounded">
                    <div className="text-3xl mb-md">🇨🇳</div>
                    <div className="font-bold text-primary mb-sm">LED China</div>
                    <div className="text-sm text-secondary">Shenzhen LED Exhibition</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* R&D Innovation */}
          <section className="mb-3xl">
            <div className="card">
              <div className="card-body">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl items-center">
                  <div className="text-center">
                    <div className="text-8xl mb-lg">🔬</div>
                    <div className="text-sm text-secondary">
                      Dedicated R&D team focused on innovation and technology advancement
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-3xl font-bold mb-lg text-primary">R&D Innovation</h3>
                    <h4 className="text-lg text-secondary mb-md">研发创新</h4>
                    <p className="text-lg mb-lg text-secondary">
                      Our professional R&D team is committed to technological innovation, continuously developing next-generation LED display technologies to meet evolving market demands.
                    </p>
                    
                    <div className="mb-lg">
                      <h5 className="font-bold text-primary mb-md">Innovation Focus Areas:</h5>
                      <ul className="space-y-sm">
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>Fine pitch LED technology advancement</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>Energy-saving display solutions</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>Interactive display technologies</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-sm">•</span>
                          <span>Creative display form factors</span>
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
                <h3 className="text-2xl font-bold mb-md text-primary">Partner with LIANJIN LED</h3>
                <p className="text-lg mb-lg text-secondary">
                  Join our global network of partners and experience the LIANJIN LED difference in quality, innovation, and service.
                </p>
                <div className="flex flex-col md:flex-row gap-md justify-center">
                  <a href="/contact" className="btn btn-primary btn-lg">
                    Contact Us
                  </a>
                  <a href="/products" className="btn btn-secondary btn-lg">
                    View Products
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
                National high-tech enterprise since 2007
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