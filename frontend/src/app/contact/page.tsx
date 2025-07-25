export default function ContactPage() {
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
            <a href="/support" className="text-gray-300 hover:text-orange-500 transition-colors">技术支持</a>
            <a href="/contact" className="text-orange-500 font-medium">联系我们</a>
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
          <h1 className="section-title">联系我们</h1>
          <p className="section-subtitle">获取联系方式或在线询盘，我们的专业团队随时为您服务</p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">联系信息</h2>
              <div className="space-y-6">
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">公司地址</h3>
                    <p className="text-gray-300">深圳市宝安区石岩街道塘头第一工业区C栋</p>
                    <p className="text-gray-400 text-sm">Shenzhen, Bao'an District, Shiyan Street</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">📞</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">联系电话</h3>
                    <p className="text-gray-300">+86 755-8259-5016</p>
                    <p className="text-gray-400 text-sm">工作时间：周一至周五 9:00-18:00</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">邮箱地址</h3>
                    <p className="text-gray-300">bruce@lianjinled.com</p>
                    <p className="text-gray-400 text-sm">销售咨询与技术支持</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">🌐</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">服务范围</h3>
                    <p className="text-gray-300">全球160+国家和地区</p>
                    <p className="text-gray-400 text-sm">提供本地化技术支持服务</p>
                  </div>
                </div>

              </div>

              {/* Quick Contact Buttons */}
              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4">快速联系</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="tel:+8675582595016" className="primary-button text-center">
                    📞 立即致电
                  </a>
                  <a href="mailto:bruce@lianjinled.com" className="secondary-button text-center">
                    ✉️ 发送邮件
                  </a>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div>
              <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
                <h2 className="text-3xl font-bold text-white mb-6">在线询盘</h2>
                <form className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        姓名 *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="请输入您的姓名"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        公司名称
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="请输入公司名称"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        邮箱地址 *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="请输入邮箱地址"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        联系电话
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="请输入联系电话"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      产品类型
                    </label>
                    <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                      <option value="">请选择产品类型</option>
                      <option value="fine-pitch">小间距显示屏</option>
                      <option value="rental">租赁显示屏</option>
                      <option value="outdoor">户外显示屏</option>
                      <option value="creative">创意显示屏</option>
                      <option value="transparent">透明显示屏</option>
                      <option value="meeting">会议一体机</option>
                      <option value="poster">LED广告机</option>
                      <option value="other">其他产品</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      项目需求 *
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-vertical"
                      placeholder="请详细描述您的项目需求，包括尺寸、用途、预算等信息..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
                  >
                    提交询盘
                  </button>

                  <p className="text-sm text-gray-400 text-center">
                    我们将在24小时内回复您的询盘
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="section-title">公司位置</h2>
          <div className="bg-gray-700 rounded-lg p-8 text-center">
            <div className="h-64 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <div className="text-2xl font-bold mb-2">深圳联锦光电</div>
                <div className="text-lg">深圳市宝安区石岩街道塘头第一工业区C栋</div>
                <div className="text-sm mt-2 opacity-80">50,000㎡现代化生产基地</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="section-title">为什么选择联锦光电？</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏭</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">专业制造</h3>
              <p className="text-gray-400">17年LED显示屏制造经验，50000㎡现代化生产基地</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">全球服务</h3>
              <p className="text-gray-400">产品远销160+国家，提供本地化技术支持服务</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">品质认证</h3>
              <p className="text-gray-400">通过ISO、CE、RoHS等多项国际质量认证</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">技术创新</h3>
              <p className="text-gray-400">持续研发投入，拥有多项专利和技术奖项</p>
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
              <h4 className="font-bold text-lg mb-4">产品中心</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/products" className="hover:text-white transition-colors">小间距显示屏</a></li>
                <li><a href="/products" className="hover:text-white transition-colors">租赁显示屏</a></li>
                <li><a href="/products" className="hover:text-white transition-colors">户外显示屏</a></li>
                <li><a href="/products" className="hover:text-white transition-colors">创意显示屏</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">公司信息</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">关于我们</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">发展历程</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">企业文化</a></li>
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