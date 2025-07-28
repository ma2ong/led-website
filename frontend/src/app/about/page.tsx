import Navigation from '@/components/Navigation';
import Breadcrumb from '@/components/Breadcrumb';
import BackToTop from '@/components/BackToTop';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Enhanced Navigation */}
      <Navigation />
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      {/* Page Header */}
      <section className="py-16 bg-gray-800 text-center">
        <div className="container mx-auto px-6">
          <h1 className="section-title">关于联锦光电</h1>
          <p className="section-subtitle">全球领先的LED显示应用与解决方案供应商</p>
        </div>
      </section>

      {/* Company Profile */}
      <section className="py-12 md:py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="h-96 bg-gradient-to-br from-blue-700 to-blue-800 rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-8xl mb-4">🏭</div>
                  <div className="text-2xl font-bold">联锦光电</div>
                  <div className="text-lg mt-2 opacity-80">深圳生产基地</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-white mb-6">公司简介</h2>
              <p className="text-gray-300 mb-4">
                深圳联锦光电有限公司（RGBSHARE联锦）成立于2007年，注册资本2010万元人民币，坐落于深圳市宝安区，是一家集LED显示屏研发、生产、销售、工程服务为一体的国家高新技术企业。
              </p>
              <p className="text-gray-300 mb-4">
                主营产品有室内小间距、室内外租赁屏、固装广告屏、LED海报屏、异形屏、透明屏、会议一体机等，广泛应用于可视化、广告传媒、会议、舞台演艺、体育场馆等领域。
              </p>
              <p className="text-gray-300">
                经过十余年的发展，公司已实现跨越式发展，产品远销全球160多个国家和地区，成功案例遍布世界。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-12 md:py-16 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center bg-gray-700 p-6 rounded-lg">
              <div className="text-4xl font-bold text-orange-500 mb-2">2007</div>
              <div className="text-gray-300">成立于</div>
            </div>
            <div className="text-center bg-gray-700 p-6 rounded-lg">
              <div className="text-4xl font-bold text-orange-500 mb-2">2010<span className="text-xl align-top">万</span></div>
              <div className="text-gray-300">注册资本(元)</div>
            </div>
            <div className="text-center bg-gray-700 p-6 rounded-lg">
              <div className="text-4xl font-bold text-orange-500 mb-2">50000<span className="text-xl align-top">㎡</span></div>
              <div className="text-gray-300">总占地面积</div>
            </div>
            <div className="text-center bg-gray-700 p-6 rounded-lg">
              <div className="text-4xl font-bold text-orange-500 mb-2">160<span className="text-xl align-top">+</span></div>
              <div className="text-gray-300">服务国家和地区</div>
            </div>
          </div>
        </div>
      </section>

      {/* Development History */}
      <section className="py-12 md:py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="section-title">发展历程</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="bg-gray-800 p-6 rounded-lg flex-1">
                  <h3 className="text-xl font-semibold text-orange-500 mb-2">2007年</h3>
                  <p className="text-gray-300">深圳联锦光电有限公司正式成立。</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="bg-gray-800 p-6 rounded-lg flex-1">
                  <h3 className="text-xl font-semibold text-orange-500 mb-2">2010年</h3>
                  <p className="text-gray-300">扩大生产规模，引进首批自动化设备。</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="bg-gray-800 p-6 rounded-lg flex-1">
                  <h3 className="text-xl font-semibold text-orange-500 mb-2">2015年</h3>
                  <p className="text-gray-300">产品通过CE、RoHS等国际认证，开始大力拓展海外市场。</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="bg-gray-800 p-6 rounded-lg flex-1">
                  <h3 className="text-xl font-semibold text-orange-500 mb-2">2018年</h3>
                  <p className="text-gray-300">荣获国家高新技术企业认证。</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="bg-gray-800 p-6 rounded-lg flex-1">
                  <h3 className="text-xl font-semibold text-orange-500 mb-2">2020年</h3>
                  <p className="text-gray-300">厂房面积扩展至50000㎡，全面升级智能化生产线，通过ISO45001:2020体系认证。</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="bg-gray-800 p-6 rounded-lg flex-1">
                  <h3 className="text-xl font-semibold text-orange-500 mb-2">至今</h3>
                  <p className="text-gray-300">持续创新，产品服务全球160多个国家和地区，致力于成为国际领先的LED显示解决方案提供商。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Production & R&D */}
      <section className="py-12 md:py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-white mb-6">生产实力与研发创新</h2>
              <p className="text-gray-300 mb-4">
                联锦光电拥有20000㎡的现代化生产车间，配备日本松下贴片机NPMD3A、美国MPM印刷机等世界级尖端设备。全面引进智能化管理模式，全产线实现自动化，生产更智能更高效。
              </p>
              <p className="text-gray-300">
                我们拥有一支专业的研发团队，持续投入技术创新，已获得多项专利和技术奖项，严格执行ISO45001:2020国际标准化质量管理体系，确保每一款产品都达到行业领先水平。
              </p>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-32 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-3xl mb-1">🏭</div>
                    <div className="text-sm">SMT生产设备</div>
                  </div>
                </div>
                <div className="h-32 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-3xl mb-1">⚙️</div>
                    <div className="text-sm">自动化组装线</div>
                  </div>
                </div>
                <div className="h-32 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-3xl mb-1">🔬</div>
                    <div className="text-sm">精密检测仪器</div>
                  </div>
                </div>
                <div className="h-32 bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-3xl mb-1">🧪</div>
                    <div className="text-sm">研发实验室</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Culture */}
      <section className="py-12 md:py-20 bg-gray-900 text-center">
        <div className="container mx-auto px-6">
          <h2 className="section-title">企业文化</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-orange-500 mb-2">企业使命</h3>
              <p className="text-gray-300">为社会做贡献，为员工谋福利</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-orange-500 mb-2">企业目标</h3>
              <p className="text-gray-300">创国内一流，国际领先企业</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-orange-500 mb-2">企业精神</h3>
              <p className="text-gray-300">务实、匠心、创新</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-xl font-semibold text-orange-500 mb-2">企业作风</h3>
              <p className="text-gray-300">诚实、严谨、细致</p>
            </div>
          </div>
        </div>
      </section>

      {/* Honors & Certifications */}
      <section className="py-12 md:py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="section-title">企业荣誉与认证</h2>
          <p className="section-subtitle">我们获得的认可，是品质与实力的最佳证明。</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <div className="bg-gray-700 p-4 rounded-lg shadow-md text-center">
              <div className="h-32 bg-white rounded flex items-center justify-center mb-3">
                <div className="text-gray-800 text-center">
                  <div className="text-2xl mb-1">🏆</div>
                  <div className="text-xs font-bold">高新技术企业</div>
                </div>
              </div>
              <p className="text-sm text-white">国家高新技术企业</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg shadow-md text-center">
              <div className="h-32 bg-white rounded flex items-center justify-center mb-3">
                <div className="text-gray-800 text-center">
                  <div className="text-2xl mb-1">📋</div>
                  <div className="text-xs font-bold">ISO45001</div>
                </div>
              </div>
              <p className="text-sm text-white">ISO45001:2020</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg shadow-md text-center">
              <div className="h-32 bg-white rounded flex items-center justify-center mb-3">
                <div className="text-gray-800 text-center">
                  <div className="text-2xl mb-1">✅</div>
                  <div className="text-xs font-bold">CE认证</div>
                </div>
              </div>
              <p className="text-sm text-white">CE</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg shadow-md text-center">
              <div className="h-32 bg-white rounded flex items-center justify-center mb-3">
                <div className="text-gray-800 text-center">
                  <div className="text-2xl mb-1">🌿</div>
                  <div className="text-xs font-bold">RoHS认证</div>
                </div>
              </div>
              <p className="text-sm text-white">RoHS</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg shadow-md text-center">
              <div className="h-32 bg-white rounded flex items-center justify-center mb-3">
                <div className="text-gray-800 text-center">
                  <div className="text-2xl mb-1">📡</div>
                  <div className="text-xs font-bold">FCC认证</div>
                </div>
              </div>
              <p className="text-sm text-white">FCC</p>
            </div>
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
                深圳联锦光电有限公司，成立于2007年，是全球领先的LED显示应用与解决方案供应商。
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">快速链接</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/products" className="hover:text-white transition-colors">产品中心</a></li>
                <li><a href="/cases" className="hover:text-white transition-colors">成功案例</a></li>
                <li><a href="/support" className="hover:text-white transition-colors">技术支持</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">公司信息</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">关于我们</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">发展历程</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">企业文化</a></li>
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
                  <span>深圳市宝安区石岩街道塘头第一工业区C栋</span>
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