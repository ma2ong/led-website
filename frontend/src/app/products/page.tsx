import Navigation from '@/components/Navigation';
import Breadcrumb from '@/components/Breadcrumb';
import BackToTop from '@/components/BackToTop';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Enhanced Navigation */}
      <Navigation />
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      {/* Page Header */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="led-title-section text-5xl mb-8">产品中心</h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              探索深圳联锦光电(RGBSHARE联锦)全系列LED显示屏产品
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-4">
              包括小间距、租赁、户外、创意显示屏、会议一体机、广告机等专业解决方案
            </p>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="led-grid-3">
            
            {/* Fine Pitch LED */}
            <article className="led-card animate-fade-in-up">
              <div className="h-64 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="text-white text-center relative z-10">
                  <div className="text-7xl mb-4 filter drop-shadow-lg">📺</div>
                  <div className="text-2xl font-bold mb-2">小间距LED显示屏</div>
                  <div className="led-badge">P0.9-P1.87</div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">超高清小间距系列</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  高清画质，无缝拼接，适用于控制室、会议室、展厅等高端应用场景。提供P0.9-P1.87多种像素间距选择。
                </p>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">主要系列：</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <span className="text-gray-300">X3-SMD系列</span>
                      <span className="led-badge-outline text-xs">高清</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <span className="text-gray-300">X3-COB系列</span>
                      <span className="led-badge-outline text-xs">超清</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <span className="text-gray-300">Mi-Pro系列</span>
                      <span className="led-badge-outline text-xs">专业</span>
                    </div>
                  </div>
                </div>
                <a href="/contact" className="btn-led-secondary w-full text-center">
                  获取详细规格
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

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}