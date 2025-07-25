export default function SupportPage() {
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
            <a href="/news" className="text-gray-300 hover:text-orange-500 transition-colors">新闻资讯</a>
            <a href="/support" className="text-orange-500 font-medium">技术支持</a>
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
          <h1 className="section-title">技术支持</h1>
          <p className="section-subtitle">获取产品文档和技术帮助，我们的专业团队为您提供全方位支持</p>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Product Documentation */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-blue-700 to-blue-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">📚</div>
                  <div className="text-xl font-bold">产品文档</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">产品手册与规格书</h3>
                <p className="text-gray-400 mb-4">
                  下载完整的产品技术规格书、用户手册和安装指南，获取详细的产品信息。
                </p>
                <ul className="text-sm text-gray-400 space-y-1 mb-4">
                  <li>• 产品技术规格书</li>
                  <li>• 用户操作手册</li>
                  <li>• 安装维护指南</li>
                  <li>• 软件使用说明</li>
                </ul>
                <a href="#" className="text-orange-500 hover:text-orange-400 font-medium">
                  下载文档 →
                </a>
              </div>
            </article>

            {/* Installation Guide */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-green-700 to-green-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">🔧</div>
                  <div className="text-xl font-bold">安装指南</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">安装调试指导</h3>
                <p className="text-gray-400 mb-4">
                  详细的安装步骤说明、调试方法和注意事项，确保设备正确安装和最佳性能。
                </p>
                <ul className="text-sm text-gray-400 space-y-1 mb-4">
                  <li>• 安装前准备工作</li>
                  <li>• 详细安装步骤</li>
                  <li>• 系统调试方法</li>
                  <li>• 常见问题解决</li>
                </ul>
                <a href="#" className="text-orange-500 hover:text-orange-400 font-medium">
                  查看指南 →
                </a>
              </div>
            </article>

            {/* Maintenance */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-purple-700 to-purple-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">🛠️</div>
                  <div className="text-xl font-bold">维护保养</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">维护保养指导</h3>
                <p className="text-gray-400 mb-4">
                  专业的维护保养建议和定期检查清单，延长设备使用寿命，保持最佳显示效果。
                </p>
                <ul className="text-sm text-gray-400 space-y-1 mb-4">
                  <li>• 日常维护清单</li>
                  <li>• 定期保养计划</li>
                  <li>• 故障预防措施</li>
                  <li>• 清洁保养方法</li>
                </ul>
                <a href="#" className="text-orange-500 hover:text-orange-400 font-medium">
                  了解详情 →
                </a>
              </div>
            </article>

            {/* Software Tools */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-red-700 to-red-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">💻</div>
                  <div className="text-xl font-bold">软件工具</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">控制软件与工具</h3>
                <p className="text-gray-400 mb-4">
                  下载最新版本的控制软件、配置工具和驱动程序，获得最佳的使用体验。
                </p>
                <ul className="text-sm text-gray-400 space-y-1 mb-4">
                  <li>• LED控制软件</li>
                  <li>• 配置管理工具</li>
                  <li>• 驱动程序下载</li>
                  <li>• 固件更新包</li>
                </ul>
                <a href="#" className="text-orange-500 hover:text-orange-400 font-medium">
                  下载软件 →
                </a>
              </div>
            </article>

            {/* Training */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-yellow-700 to-yellow-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">🎓</div>
                  <div className="text-xl font-bold">培训服务</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">技术培训与认证</h3>
                <p className="text-gray-400 mb-4">
                  提供专业的技术培训课程和认证服务，帮助您的团队掌握产品使用和维护技能。
                </p>
                <ul className="text-sm text-gray-400 space-y-1 mb-4">
                  <li>• 产品操作培训</li>
                  <li>• 维护技能培训</li>
                  <li>• 技术认证考试</li>
                  <li>• 在线培训课程</li>
                </ul>
                <a href="/contact" className="text-orange-500 hover:text-orange-400 font-medium">
                  预约培训 →
                </a>
              </div>
            </article>

            {/* Technical Support */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-pink-700 to-pink-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">🎧</div>
                  <div className="text-xl font-bold">技术支持</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">在线技术支持</h3>
                <p className="text-gray-400 mb-4">
                  7×24小时在线技术支持服务，专业工程师为您解答技术问题和提供解决方案。
                </p>
                <ul className="text-sm text-gray-400 space-y-1 mb-4">
                  <li>• 在线技术咨询</li>
                  <li>• 远程故障诊断</li>
                  <li>• 现场技术支持</li>
                  <li>• 紧急响应服务</li>
                </ul>
                <a href="/contact" className="text-orange-500 hover:text-orange-400 font-medium">
                  联系支持 →
                </a>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="section-title">常见问题</h2>
          <div className="max-w-4xl mx-auto mt-10">
            <div className="space-y-6">
              
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Q: LED显示屏的使用寿命是多长？</h3>
                <p className="text-gray-300">
                  A: 我们的LED显示屏设计使用寿命超过100,000小时，在正常使用条件下可以稳定运行10年以上。具体使用寿命会根据使用环境、亮度设置和维护情况有所不同。
                </p>
              </div>

              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Q: 如何选择合适的像素间距？</h3>
                <p className="text-gray-300">
                  A: 像素间距的选择主要取决于观看距离。一般来说，观看距离（米）= 像素间距（mm）。例如，P2.5的显示屏最佳观看距离为2.5米以上。我们的技术团队可以根据您的具体应用场景提供专业建议。
                </p>
              </div>

              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Q: LED显示屏需要多长时间进行一次维护？</h3>
                <p className="text-gray-300">
                  A: 建议每3-6个月进行一次全面检查和清洁维护。日常使用中应注意观察显示效果，如发现异常应及时联系技术支持。我们提供详细的维护指南和定期维护服务。
                </p>
              </div>

              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Q: 户外LED显示屏的防护等级是多少？</h3>
                <p className="text-gray-300">
                  A: 我们的户外LED显示屏达到IP65防护等级，可以有效防止灰尘进入和水的喷射，能够在各种恶劣天气条件下正常工作。部分产品还可以达到IP67防护等级。
                </p>
              </div>

              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Q: 是否提供定制化服务？</h3>
                <p className="text-gray-300">
                  A: 是的，我们提供全面的定制化服务，包括特殊尺寸、异形设计、特殊功能等。我们的工程团队会根据您的具体需求提供专业的设计方案和技术支持。
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">需要技术支持？</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            我们的技术专家团队随时为您提供专业的技术支持和解决方案
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-white text-blue-700 px-8 py-4 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors">
              在线技术咨询
            </a>
            <a href="tel:+8675582595016" className="border-2 border-white text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors">
              致电技术热线
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
              <h4 className="font-bold text-lg mb-4">技术支持</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/support" className="hover:text-white transition-colors">产品文档</a></li>
                <li><a href="/support" className="hover:text-white transition-colors">安装指南</a></li>
                <li><a href="/support" className="hover:text-white transition-colors">维护保养</a></li>
                <li><a href="/support" className="hover:text-white transition-colors">软件下载</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">服务时间</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>技术热线：7×24小时</li>
                <li>在线支持：工作日 9:00-18:00</li>
                <li>现场服务：预约制</li>
                <li>紧急响应：24小时内</li>
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
                  <span>support@lianjinled.com</span>
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