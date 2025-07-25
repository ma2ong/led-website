import Navigation from '@/components/Navigation';

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Enhanced Navigation */}
      <Navigation />

      {/* Page Header */}
      <section className="py-16 bg-gray-800 text-center">
        <div className="container mx-auto px-6">
          <h1 className="section-title">成功案例</h1>
          <p className="section-subtitle">遍布全球的卓越项目，见证联锦光电的专业实力</p>
        </div>
      </section>

      {/* Featured Cases */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Case 1 - International Conference Center */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-blue-700 to-blue-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">🏛️</div>
                  <div className="text-xl font-bold">国际会议中心</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">某国际会议中心</h3>
                <p className="text-sm text-gray-400 mb-3">应用产品：X3系列 P1.2 小间距屏</p>
                <p className="text-gray-400 mb-4">
                  为大型国际会议中心提供了超高清小间距LED显示墙，支持4K信号输入，为重要会议提供完美的视觉体验。
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">项目亮点：</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• 200㎡超大显示面积</li>
                    <li>• P1.2超高清显示</li>
                    <li>• 7×24小时稳定运行</li>
                  </ul>
                </div>
                <a href="/contact" className="text-orange-500 hover:text-orange-400 font-medium">
                  了解详情 →
                </a>
              </div>
            </article>

            {/* Case 2 - Outdoor Billboard */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-green-700 to-green-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">🏙️</div>
                  <div className="text-xl font-bold">大型户外广告牌</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">城市地标广告牌</h3>
                <p className="text-sm text-gray-400 mb-3">应用产品：ES系列 P6 户外节能屏</p>
                <p className="text-gray-400 mb-4">
                  在城市核心商业区安装的大型户外LED广告牌，采用节能技术，为品牌提供强有力的视觉冲击。
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">项目亮点：</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• 500㎡超大屏幕</li>
                    <li>• 8000nits高亮度</li>
                    <li>• 节能30%以上</li>
                  </ul>
                </div>
                <a href="/contact" className="text-orange-500 hover:text-orange-400 font-medium">
                  了解详情 →
                </a>
              </div>
            </article>

            {/* Case 3 - XR Virtual Studio */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-purple-700 to-purple-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">🎬</div>
                  <div className="text-xl font-bold">XR虚拟摄影棚</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">XR虚拟摄影棚</h3>
                <p className="text-sm text-gray-400 mb-3">应用产品：XR系列 P1.9 租赁屏</p>
                <p className="text-gray-400 mb-4">
                  为影视制作公司打造的XR虚拟摄影棚，实现实时渲染和虚实结合的拍摄效果。
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">项目亮点：</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• 360°环形LED墙</li>
                    <li>• 3840Hz超高刷新率</li>
                    <li>• 实时动作捕捉支持</li>
                  </ul>
                </div>
                <a href="/contact" className="text-orange-500 hover:text-orange-400 font-medium">
                  了解详情 →
                </a>
              </div>
            </article>

            {/* Case 4 - Sports Stadium */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-red-700 to-red-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">🏟️</div>
                  <div className="text-xl font-bold">体育场馆</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">国际体育场馆</h3>
                <p className="text-sm text-gray-400 mb-3">应用产品：R3系列 P4.8 租赁屏</p>
                <p className="text-gray-400 mb-4">
                  为大型体育场馆提供周边LED显示屏，为观众带来震撼的视觉体验和实时比赛信息。
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">项目亮点：</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• 环形LED显示带</li>
                    <li>• 高刷新率无闪烁</li>
                    <li>• 快速安装拆卸</li>
                  </ul>
                </div>
                <a href="/contact" className="text-orange-500 hover:text-orange-400 font-medium">
                  了解详情 →
                </a>
              </div>
            </article>

            {/* Case 5 - Shopping Mall */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-pink-700 to-pink-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">🛒</div>
                  <div className="text-xl font-bold">购物中心</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">大型购物中心</h3>
                <p className="text-sm text-gray-400 mb-3">应用产品：透明LED显示屏</p>
                <p className="text-gray-400 mb-4">
                  在购物中心中庭安装透明LED显示屏，既保持空间通透感，又提供丰富的广告展示功能。
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">项目亮点：</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• 85%高透明度</li>
                    <li>• 创意异形设计</li>
                    <li>• 智能内容管理</li>
                  </ul>
                </div>
                <a href="/contact" className="text-orange-500 hover:text-orange-400 font-medium">
                  了解详情 →
                </a>
              </div>
            </article>

            {/* Case 6 - Corporate Headquarters */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-indigo-700 to-indigo-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">🏢</div>
                  <div className="text-xl font-bold">企业总部</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">跨国企业总部</h3>
                <p className="text-sm text-gray-400 mb-3">应用产品：MeeUs会议一体机</p>
                <p className="text-gray-400 mb-4">
                  为跨国企业总部会议室配置智能LED会议一体机，提升会议效率和协作体验。
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">项目亮点：</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• 多点触控交互</li>
                    <li>• 4K超高清显示</li>
                    <li>• 无线投屏功能</li>
                  </ul>
                </div>
                <a href="/contact" className="text-orange-500 hover:text-orange-400 font-medium">
                  了解详情 →
                </a>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="section-title">全球项目分布</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
            
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">1000+</div>
              <div className="text-gray-300">成功项目</div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">160+</div>
              <div className="text-gray-300">服务国家</div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">50+</div>
              <div className="text-gray-300">行业领域</div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">99%</div>
              <div className="text-gray-300">客户满意度</div>
            </div>

          </div>
        </div>
      </section>

      {/* Industry Applications */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="section-title">行业应用</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-10">
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-2xl">🏛️</span>
              </div>
              <div className="text-white font-medium">政府机构</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-2xl">🏢</span>
              </div>
              <div className="text-white font-medium">企业办公</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-2xl">📺</span>
              </div>
              <div className="text-white font-medium">广电传媒</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-2xl">🏟️</span>
              </div>
              <div className="text-white font-medium">体育场馆</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-2xl">🛍️</span>
              </div>
              <div className="text-white font-medium">商业零售</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-2xl">🎭</span>
              </div>
              <div className="text-white font-medium">文化娱乐</div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">想要了解更多案例？</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            我们有更多精彩案例等待与您分享，欢迎联系我们获取详细资料
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-white text-blue-700 px-8 py-4 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors">
              获取案例资料
            </a>
            <a href="tel:+8675582595016" className="border-2 border-white text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors">
              预约现场参观
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
              <h4 className="font-bold text-lg mb-4">成功案例</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/cases" className="hover:text-white transition-colors">指挥控制中心</a></li>
                <li><a href="/cases" className="hover:text-white transition-colors">体育场馆</a></li>
                <li><a href="/cases" className="hover:text-white transition-colors">商业显示</a></li>
                <li><a href="/cases" className="hover:text-white transition-colors">广电传媒</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">服务支持</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/support" className="hover:text-white transition-colors">技术支持</a></li>
                <li><a href="/support" className="hover:text-white transition-colors">售后服务</a></li>
                <li><a href="/support" className="hover:text-white transition-colors">培训服务</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">联系我们</a></li>
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