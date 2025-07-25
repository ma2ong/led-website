export default function NewsPage() {
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
            <a href="/solutions" className="text-gray-300 hover:text-orange-500 transition-colors">解决方案</a>
            <a href="/cases" className="text-gray-300 hover:text-orange-500 transition-colors">成功案例</a>
            <a href="/news" className="text-orange-500 font-medium">新闻资讯</a>
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
          <h1 className="section-title">新闻资讯</h1>
          <p className="section-subtitle">公司最新动态和行业资讯</p>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* News 1 */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-blue-700 to-blue-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">📰</div>
                  <div className="text-lg font-bold">技术突破</div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-400 mb-2">2025年1月15日</p>
                <h3 className="text-lg font-semibold mb-2 text-white">联锦光电发布最新小间距技术</h3>
                <p className="text-sm text-gray-400 mb-4">
                  在今日的技术研讨会上，联锦光电展示了其在小间距LED显示领域的最新突破，推出了P0.9超高清显示产品...
                </p>
                <a href="#" className="text-orange-500 hover:text-orange-400 font-medium text-sm">
                  阅读全文 →
                </a>
              </div>
            </article>

            {/* News 2 */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-green-700 to-green-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">🏆</div>
                  <div className="text-lg font-bold">展会参与</div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-400 mb-2">2025年1月10日</p>
                <h3 className="text-lg font-semibold mb-2 text-white">联锦光电参加国际显示技术展ISLE</h3>
                <p className="text-sm text-gray-400 mb-4">
                  联锦光电携多款创新产品亮相ISLE 2025，展示了其在LED显示技术领域的领先实力，吸引了众多观众...
                </p>
                <a href="#" className="text-orange-500 hover:text-orange-400 font-medium text-sm">
                  阅读全文 →
                </a>
              </div>
            </article>

            {/* News 3 */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-purple-700 to-purple-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">🌍</div>
                  <div className="text-lg font-bold">行业趋势</div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-400 mb-2">2024年12月28日</p>
                <h3 className="text-lg font-semibold mb-2 text-white">LED显示屏在智慧城市中的应用趋势</h3>
                <p className="text-sm text-gray-400 mb-4">
                  随着智慧城市建设的推进，LED显示屏凭借其高亮度、高清晰度和智能交互等特性，在城市信息化建设中发挥着重要作用...
                </p>
                <a href="#" className="text-orange-500 hover:text-orange-400 font-medium text-sm">
                  阅读全文 →
                </a>
              </div>
            </article>

            {/* News 4 */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-red-700 to-red-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">🎯</div>
                  <div className="text-lg font-bold">产品发布</div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-400 mb-2">2024年12月20日</p>
                <h3 className="text-lg font-semibold mb-2 text-white">MeeUs会议一体机新品发布</h3>
                <p className="text-sm text-gray-400 mb-4">
                  联锦光电正式发布MeeUs系列会议一体机新品，集成了4K显示、触控交互、无线投屏等多项先进技术...
                </p>
                <a href="#" className="text-orange-500 hover:text-orange-400 font-medium text-sm">
                  阅读全文 →
                </a>
              </div>
            </article>

            {/* News 5 */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-yellow-700 to-yellow-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">🏅</div>
                  <div className="text-lg font-bold">荣誉认证</div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-400 mb-2">2024年12月15日</p>
                <h3 className="text-lg font-semibold mb-2 text-white">联锦光电获得ISO45001:2020认证</h3>
                <p className="text-sm text-gray-400 mb-4">
                  经过严格的审核评估，联锦光电成功通过ISO45001:2020职业健康安全管理体系认证，标志着公司在质量管理方面达到国际先进水平...
                </p>
                <a href="#" className="text-orange-500 hover:text-orange-400 font-medium text-sm">
                  阅读全文 →
                </a>
              </div>
            </article>

            {/* News 6 */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-pink-700 to-pink-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">🚀</div>
                  <div className="text-lg font-bold">技术创新</div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-400 mb-2">2024年12月10日</p>
                <h3 className="text-lg font-semibold mb-2 text-white">透明LED显示技术新突破</h3>
                <p className="text-sm text-gray-400 mb-4">
                  联锦光电在透明LED显示技术方面取得重大突破，透明度提升至90%以上，为建筑媒体和创意显示提供了更多可能...
                </p>
                <a href="#" className="text-orange-500 hover:text-orange-400 font-medium text-sm">
                  阅读全文 →
                </a>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* Industry Insights */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="section-title">行业洞察</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            
            <div className="bg-gray-700 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-4">LED显示技术发展趋势</h3>
              <p className="text-gray-300 mb-6">
                随着技术的不断进步，LED显示屏正朝着更高分辨率、更低功耗、更智能化的方向发展。小间距技术、COB封装、Mini LED等新技术正在推动行业变革。
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>• 像素间距持续缩小，显示效果更加细腻</li>
                <li>• 节能技术不断优化，运营成本显著降低</li>
                <li>• 智能化程度提升，维护更加便捷</li>
                <li>• 应用场景不断扩展，市场需求持续增长</li>
              </ul>
            </div>

            <div className="bg-gray-700 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-4">市场应用前景</h3>
              <p className="text-gray-300 mb-6">
                LED显示屏在各个行业的应用越来越广泛，从传统的广告显示到智慧城市、虚拟制作、会议显示等新兴领域，市场前景十分广阔。
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>• 智慧城市建设推动户外显示需求增长</li>
                <li>• 虚拟制作技术带来新的应用机遇</li>
                <li>• 企业数字化转型促进会议显示升级</li>
                <li>• 新零售模式推动商业显示创新</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">订阅我们的资讯</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            获取最新的产品信息、技术动态和行业资讯，第一时间了解LED显示行业发展趋势
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="请输入您的邮箱地址"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button className="secondary-button">订阅</button>
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
              <h4 className="font-bold text-lg mb-4">新闻分类</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/news" className="hover:text-white transition-colors">公司动态</a></li>
                <li><a href="/news" className="hover:text-white transition-colors">产品发布</a></li>
                <li><a href="/news" className="hover:text-white transition-colors">行业资讯</a></li>
                <li><a href="/news" className="hover:text-white transition-colors">技术分享</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">关注我们</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">微信公众号</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
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