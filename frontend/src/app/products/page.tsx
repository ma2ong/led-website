export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation Header */}
      <header className="navbar-sticky shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-white">
            RGBSHARE <span className="text-orange-500">联锦</span>
          </a>
          <nav className="hidden md:flex space-x-4 items-center">
            <a href="/" className="text-gray-300 hover:text-orange-500 transition-colors">首页</a>
            <a href="/about" className="text-gray-300 hover:text-orange-500 transition-colors">关于我们</a>
            <a href="/products" className="text-orange-500 font-medium">产品中心</a>
            <a href="/solutions" className="text-gray-300 hover:text-orange-500 transition-colors">解决方案</a>
            <a href="/cases" className="text-gray-300 hover:text-orange-500 transition-colors">成功案例</a>
            <a href="/news" className="text-gray-300 hover:text-orange-500 transition-colors">新闻资讯</a>
            <a href="/support" className="text-gray-300 hover:text-orange-500 transition-colors">技术支持</a>
            <a href="/contact" className="text-gray-300 hover:text-orange-500 transition-colors">联系我们</a>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <div className="language-switcher text-sm text-gray-300">
              <span className="active-lang text-orange-500 font-bold">中</span> / 
              <span className="cursor-pointer hover:text-orange-500">EN</span>
            </div>
            <a href="/contact" className="secondary-button text-sm">询盘</a>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="py-16 bg-gray-800 text-center">
        <div className="container mx-auto px-6">
          <h1 className="section-title">产品中心</h1>
          <p className="section-subtitle">
            探索深圳联锦光电(RGBSHARE联锦)全系列LED显示屏产品，包括小间距、租赁、户外、创意显示屏、会议一体机、广告机等。查找最适合您需求的解决方案。
          </p>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Fine Pitch LED */}
            <article className="product-card">
              <div className="h-64 bg-gradient-to-br from-blue-700 to-blue-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">📺</div>
                  <div className="text-2xl font-bold">小间距LED显示屏</div>
                  <div className="text-sm mt-2 opacity-80">Fine Pitch LED Display</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">小间距显示屏系列</h3>
                <p className="text-gray-400 mb-4">
                  高清画质，无缝拼接，适用于控制室、会议室、展厅等高端应用场景。提供P0.9-P1.87多种像素间距选择。
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">主要系列：</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• X3-SMD系列</li>
                    <li>• X3-COB系列</li>
                    <li>• Mi-Pro系列</li>
                  </ul>
                </div>
                <a href="#" className="text-orange-500 hover:text-orange-400 font-medium">
                  查看详细规格 →
                </a>
              </div>
            </article>

            {/* Rental LED */}
            <article className="product-card">
              <div className="h-64 bg-gradient-to-br from-purple-700 to-purple-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">🎭</div>
                  <div className="text-2xl font-bold">租赁LED显示屏</div>
                  <div className="text-sm mt-2 opacity-80">Rental LED Display</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">租赁显示屏系列</h3>
                <p className="text-gray-400 mb-4">
                  轻便易装，高刷新率，专为舞台活动、展览展示、演出租赁等应用设计，支持快速安装拆卸。
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">主要系列：</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• R3系列</li>
                    <li>• R系列标准版</li>
                    <li>• XR虚拟制作系列</li>
                  </ul>
                </div>
                <a href="#" className="text-orange-500 hover:text-orange-400 font-medium">
                  查看详细规格 →
                </a>
              </div>
            </article>

            {/* Outdoor LED */}
            <article className="product-card">
              <div className="h-64 bg-gradient-to-br from-green-700 to-green-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">🏢</div>
                  <div className="text-2xl font-bold">户外LED显示屏</div>
                  <div className="text-sm mt-2 opacity-80">Outdoor LED Display</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">户外显示屏系列</h3>
                <p className="text-gray-400 mb-4">
                  高亮防水，稳定耐用，适用于户外广告、体育场馆、交通显示等应用，支持高达8000nits亮度。
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">主要系列：</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• ES节能系列</li>
                    <li>• Ti节能系列</li>
                    <li>• 标准户外系列</li>
                  </ul>
                </div>
                <a href="#" className="text-orange-500 hover:text-orange-400 font-medium">
                  查看详细规格 →
                </a>
              </div>
            </article>

            {/* Creative LED */}
            <article className="product-card">
              <div className="h-64 bg-gradient-to-br from-pink-700 to-pink-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">✨</div>
                  <div className="text-2xl font-bold">创意LED显示屏</div>
                  <div className="text-sm mt-2 opacity-80">Creative LED Display</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">创意显示屏系列</h3>
                <p className="text-gray-400 mb-4">
                  透明屏、柔性屏等创新产品，打破常规显示形态，创造无限视觉可能，适用于建筑媒体、艺术装置。
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">主要类型：</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• 透明LED显示屏</li>
                    <li>• 柔性LED显示屏</li>
                    <li>• 异形LED显示屏</li>
                  </ul>
                </div>
                <a href="#" className="text-orange-500 hover:text-orange-400 font-medium">
                  查看详细规格 →
                </a>
              </div>
            </article>

            {/* All-in-One Display */}
            <article className="product-card">
              <div className="h-64 bg-gradient-to-br from-teal-700 to-teal-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">💼</div>
                  <div className="text-2xl font-bold">会议一体机</div>
                  <div className="text-sm mt-2 opacity-80">All-in-One Display</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">会议一体机系列</h3>
                <p className="text-gray-400 mb-4">
                  集成式智能会议显示解决方案，支持触控交互、无线投屏等功能，专为现代会议室设计。
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">主要系列：</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• MeeUs一体机系列</li>
                    <li>• 触控交互功能</li>
                    <li>• 无线投屏支持</li>
                  </ul>
                </div>
                <a href="#" className="text-orange-500 hover:text-orange-400 font-medium">
                  查看详细规格 →
                </a>
              </div>
            </article>

            {/* Poster LED */}
            <article className="product-card">
              <div className="h-64 bg-gradient-to-br from-red-700 to-red-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">📱</div>
                  <div className="text-2xl font-bold">LED广告机</div>
                  <div className="text-sm mt-2 opacity-80">Poster LED Display</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">LED广告机系列</h3>
                <p className="text-gray-400 mb-4">
                  便携式数字LED广告海报，超薄设计，支持远程内容管理，适用于零售、餐饮等商业环境。
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">主要系列：</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• G-T4系列</li>
                    <li>• G-X4系列</li>
                    <li>• G-T5系列</li>
                  </ul>
                </div>
                <a href="#" className="text-orange-500 hover:text-orange-400 font-medium">
                  查看详细规格 →
                </a>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="section-title">技术规格对比</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold">产品系列</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">像素间距</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">亮度</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">应用场景</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-600">
                  <td className="px-6 py-4 font-medium">小间距显示屏</td>
                  <td className="px-6 py-4">P0.9-P1.87</td>
                  <td className="px-6 py-4">800-1200 nits</td>
                  <td className="px-6 py-4">控制室、会议室</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="px-6 py-4 font-medium">租赁显示屏</td>
                  <td className="px-6 py-4">P2.6-P4.8</td>
                  <td className="px-6 py-4">4000-6000 nits</td>
                  <td className="px-6 py-4">舞台、活动</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <td className="px-6 py-4 font-medium">户外显示屏</td>
                  <td className="px-6 py-4">P4-P10</td>
                  <td className="px-6 py-4">5000-8000 nits</td>
                  <td className="px-6 py-4">户外广告、体育场</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">创意显示屏</td>
                  <td className="px-6 py-4">定制</td>
                  <td className="px-6 py-4">1000-4000 nits</td>
                  <td className="px-6 py-4">建筑媒体、艺术</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">需要产品咨询？</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            我们的技术专家将为您推荐最适合的LED显示解决方案
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-white text-blue-700 px-8 py-4 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors">
              获取产品报价
            </a>
            <a href="tel:+8675582595016" className="border-2 border-white text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors">
              致电咨询
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">
                RGBSHARE <span className="text-orange-500">联锦</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                深圳联锦光电有限公司，专业LED显示屏制造商，为全球客户提供高品质的显示解决方案。
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">产品系列</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">小间距显示屏</a></li>
                <li><a href="#" className="hover:text-white transition-colors">租赁显示屏</a></li>
                <li><a href="#" className="hover:text-white transition-colors">户外显示屏</a></li>
                <li><a href="#" className="hover:text-white transition-colors">创意显示屏</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">技术支持</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">产品手册</a></li>
                <li><a href="#" className="hover:text-white transition-colors">安装指南</a></li>
                <li><a href="#" className="hover:text-white transition-colors">维护保养</a></li>
                <li><a href="#" className="hover:text-white transition-colors">常见问题</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">联系方式</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center">
                  <span className="mr-2">📞</span>
                  <span>+86 755-8259-5016</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">✉️</span>
                  <span>bruce@lianjinled.com</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📍</span>
                  <span>深圳市宝安区</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-400">
              © 2024 深圳联锦光电有限公司 版权所有
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}