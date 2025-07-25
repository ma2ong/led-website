export default function SolutionsPage() {
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
            <a href="/products" className="text-gray-300 hover:text-orange-500 transition-colors">产品中心</a>
            <a href="/solutions" className="text-orange-500 font-medium">解决方案</a>
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
          <h1 className="section-title">解决方案</h1>
          <p className="section-subtitle">针对不同行业的专业LED显示应用解决方案</p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Control Room Solution */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-blue-700 to-blue-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">🎛️</div>
                  <div className="text-xl font-bold">指挥控制中心</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">指挥控制中心解决方案</h3>
                <p className="text-gray-400 mb-4">
                  为政府、公安、交通、电力等行业提供专业的指挥调度显示系统，支持多信号源接入和实时监控。
                </p>
                <ul className="text-sm text-gray-400 space-y-1 mb-4">
                  <li>• 超高清小间距LED显示墙</li>
                  <li>• 多信号源处理系统</li>
                  <li>• 7×24小时稳定运行</li>
                  <li>• 专业安装调试服务</li>
                </ul>
                <a href="/contact" className="text-orange-500 hover:text-orange-400 font-medium">
                  了解详情 →
                </a>
              </div>
            </article>

            {/* Conference Room Solution */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-green-700 to-green-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">🏢</div>
                  <div className="text-xl font-bold">会议室显示</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">智能会议室解决方案</h3>
                <p className="text-gray-400 mb-4">
                  为企业会议室、报告厅提供高清显示和智能交互功能，提升会议效率和视觉体验。
                </p>
                <ul className="text-sm text-gray-400 space-y-1 mb-4">
                  <li>• MeeUs会议一体机</li>
                  <li>• 触控交互功能</li>
                  <li>• 无线投屏技术</li>
                  <li>• 智能会议管理系统</li>
                </ul>
                <a href="/contact" className="text-orange-500 hover:text-orange-400 font-medium">
                  了解详情 →
                </a>
              </div>
            </article>

            {/* Broadcast Studio Solution */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-purple-700 to-purple-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">📺</div>
                  <div className="text-xl font-bold">演播室背景</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">演播室背景解决方案</h3>
                <p className="text-gray-400 mb-4">
                  为电视台、直播间提供专业的LED背景显示系统，支持虚拟演播和实时内容切换。
                </p>
                <ul className="text-sm text-gray-400 space-y-1 mb-4">
                  <li>• 超高刷新率显示屏</li>
                  <li>• 无摩尔纹技术</li>
                  <li>• 色彩校正系统</li>
                  <li>• 虚拟演播支持</li>
                </ul>
                <a href="/contact" className="text-orange-500 hover:text-orange-400 font-medium">
                  了解详情 →
                </a>
              </div>
            </article>

            {/* Retail Display Solution */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-pink-700 to-pink-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">🛍️</div>
                  <div className="text-xl font-bold">零售数字标牌</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">零售数字标牌解决方案</h3>
                <p className="text-gray-400 mb-4">
                  为商场、店铺、餐厅提供吸引眼球的数字广告显示系统，提升品牌形象和销售转化。
                </p>
                <ul className="text-sm text-gray-400 space-y-1 mb-4">
                  <li>• LED广告机系列</li>
                  <li>• 远程内容管理</li>
                  <li>• 多媒体播放支持</li>
                  <li>• 灵活安装方式</li>
                </ul>
                <a href="/contact" className="text-orange-500 hover:text-orange-400 font-medium">
                  了解详情 →
                </a>
              </div>
            </article>

            {/* Event & Stage Solution */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-red-700 to-red-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">🎪</div>
                  <div className="text-xl font-bold">舞台演出</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">舞台演出解决方案</h3>
                <p className="text-gray-400 mb-4">
                  为演唱会、活动、展览提供震撼的视觉效果，支持创意造型和动态显示内容。
                </p>
                <ul className="text-sm text-gray-400 space-y-1 mb-4">
                  <li>• 租赁LED显示屏</li>
                  <li>• 快速搭建系统</li>
                  <li>• 创意异形设计</li>
                  <li>• 现场技术支持</li>
                </ul>
                <a href="/contact" className="text-orange-500 hover:text-orange-400 font-medium">
                  了解详情 →
                </a>
              </div>
            </article>

            {/* Outdoor Advertising Solution */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-yellow-700 to-yellow-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">🏙️</div>
                  <div className="text-xl font-bold">户外广告</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">户外广告解决方案</h3>
                <p className="text-gray-400 mb-4">
                  为户外广告牌、建筑媒体提供高亮度、高稳定性的显示系统，适应各种恶劣环境。
                </p>
                <ul className="text-sm text-gray-400 space-y-1 mb-4">
                  <li>• 高亮度户外LED屏</li>
                  <li>• IP65防护等级</li>
                  <li>• 节能环保技术</li>
                  <li>• 远程监控管理</li>
                </ul>
                <a href="/contact" className="text-orange-500 hover:text-orange-400 font-medium">
                  了解详情 →
                </a>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* Solution Process */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="section-title">解决方案流程</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">需求分析</h3>
              <p className="text-gray-400 text-sm">深入了解客户需求，制定专业的技术方案</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">方案设计</h3>
              <p className="text-gray-400 text-sm">提供详细的设计图纸和技术参数说明</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">产品制造</h3>
              <p className="text-gray-400 text-sm">严格的质量控制，确保产品性能稳定</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">安装调试</h3>
              <p className="text-gray-400 text-sm">专业团队现场安装，提供技术培训</p>
            </div>

          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">需要定制解决方案？</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            我们的工程师团队将为您量身定制最适合的LED显示解决方案
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-white text-blue-700 px-8 py-4 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors">
              免费咨询方案
            </a>
            <a href="tel:+8675582595016" className="border-2 border-white text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors">
              致电技术专家
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
              <h4 className="font-bold text-lg mb-4">解决方案</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/solutions" className="hover:text-white transition-colors">指挥控制中心</a></li>
                <li><a href="/solutions" className="hover:text-white transition-colors">智能会议室</a></li>
                <li><a href="/solutions" className="hover:text-white transition-colors">演播室背景</a></li>
                <li><a href="/solutions" className="hover:text-white transition-colors">户外广告</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">技术支持</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/support" className="hover:text-white transition-colors">技术文档</a></li>
                <li><a href="/support" className="hover:text-white transition-colors">安装指南</a></li>
                <li><a href="/support" className="hover:text-white transition-colors">维护保养</a></li>
                <li><a href="/support" className="hover:text-white transition-colors">常见问题</a></li>
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