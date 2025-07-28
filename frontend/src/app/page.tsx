// LIANJIN LED Homepage - Enhanced Professional Design
'use client';

import Navigation from '@/components/Navigation';
import BackToTop from '@/components/BackToTop';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Enhanced Navigation */}
      <Navigation />

      {/* Hero Section - Enhanced Professional Design */}
      <section className="hero-section min-h-screen flex items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
        <div className="relative z-10 p-6 max-w-6xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="led-title-hero text-center mb-8">
              <span className="block">{t('home.hero.title1')}</span>
              <span className="block">{t('home.hero.title2')}</span>
            </h1>
          </div>
          <div className="animate-fade-in-up animate-delay-200">
            <p className="text-xl md:text-2xl mb-4 max-w-4xl mx-auto text-gray-200 leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
            <p className="text-lg mb-12 max-w-3xl mx-auto text-gray-300">
              {t('home.hero.description')}
            </p>
          </div>
          <div className="animate-fade-in-up animate-delay-400 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="/products" className="btn-led-primary text-lg px-8 py-4">
              {t('home.hero.explore')}
            </a>
            <a href="/contact" className="btn-led-outline text-lg px-8 py-4">
              {t('home.hero.consult')}
            </a>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Core Product Series */}
      <section className="py-20 md:py-32 bg-gray-800 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="led-title-section">{t('home.products.title')}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mt-6 leading-relaxed">
              {t('home.products.subtitle')}
            </p>
          </div>
          <div className="led-grid-3">
            
            {/* Fine Pitch Display */}
            <article className="led-card animate-fade-in-up">
              <div className="h-56 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="text-white text-center relative z-10">
                  <div className="text-6xl mb-4 filter drop-shadow-lg">📺</div>
                  <div className="text-2xl font-bold">小间距显示屏</div>
                  <div className="led-badge mt-3">P0.9-P1.87</div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-white">超高清小间距系列</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  高清画质，无缝拼接，适用于控制室、会议室、展厅等高端应用场景。支持4K/8K分辨率。
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    <span className="block">✓ 超高清显示</span>
                    <span className="block">✓ 无缝拼接</span>
                  </div>
                  <a href="/products" className="btn-led-secondary text-sm px-6 py-2">
                    了解详情
                  </a>
                </div>
              </div>
            </article>

            {/* Rental Display */}
            <article className="led-card animate-fade-in-up animate-delay-100">
              <div className="h-56 bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="text-white text-center relative z-10">
                  <div className="text-6xl mb-4 filter drop-shadow-lg">🎭</div>
                  <div className="text-2xl font-bold">租赁显示屏</div>
                  <div className="led-badge mt-3">R3系列</div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-white">专业租赁系列</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  轻便易装，高刷新率，专为舞台活动、展览展示、演出租赁等应用设计。
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    <span className="block">✓ 快速安装</span>
                    <span className="block">✓ 高刷新率</span>
                  </div>
                  <a href="/products" className="btn-led-secondary text-sm px-6 py-2">
                    了解详情
                  </a>
                </div>
              </div>
            </article>

            {/* Outdoor Display */}
            <article className="led-card animate-fade-in-up animate-delay-200">
              <div className="h-56 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="text-white text-center relative z-10">
                  <div className="text-6xl mb-4 filter drop-shadow-lg">🏢</div>
                  <div className="text-2xl font-bold">户外显示屏</div>
                  <div className="led-badge mt-3">8000nits</div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-white">高亮户外系列</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  高亮防水，稳定耐用，适用于户外广告、体育场馆、交通显示等应用。
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    <span className="block">✓ IP65防护</span>
                    <span className="block">✓ 节能技术</span>
                  </div>
                  <a href="/products" className="btn-led-secondary text-sm px-6 py-2">
                    了解详情
                  </a>
                </div>
              </div>
            </article>

            {/* Creative Display */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-pink-700 to-pink-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">✨</div>
                  <div className="text-xl font-semibold">创意屏</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">创意显示屏</h3>
                <p className="text-gray-400 text-sm mb-4">透明屏、柔性屏等，打破常规，创造无限视觉可能。</p>
                <a href="/products" className="text-orange-500 hover:text-orange-400 font-medium">
                  查看更多 →
                </a>
              </div>
            </article>

            {/* Transparent Display */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-indigo-700 to-indigo-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">🔮</div>
                  <div className="text-xl font-semibold">透明屏</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">透明显示屏</h3>
                <p className="text-gray-400 text-sm mb-4">高通透率的透明LED显示屏，完美融入建筑环境。</p>
                <a href="/products" className="text-orange-500 hover:text-orange-400 font-medium">
                  查看更多 →
                </a>
              </div>
            </article>

            {/* All-in-One Display */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-teal-700 to-teal-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">💼</div>
                  <div className="text-xl font-semibold">会议一体机</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">会议一体机</h3>
                <p className="text-gray-400 text-sm mb-4">集成式智能会议显示解决方案，MeeUs系列。</p>
                <a href="/products" className="text-orange-500 hover:text-orange-400 font-medium">
                  查看更多 →
                </a>
              </div>
            </article>

            {/* Poster LED */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-red-700 to-red-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">📱</div>
                  <div className="text-xl font-semibold">广告机</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">LED广告机</h3>
                <p className="text-gray-400 text-sm mb-4">便携式数字LED广告海报，适用于零售环境。</p>
                <a href="/products" className="text-orange-500 hover:text-orange-400 font-medium">
                  查看更多 →
                </a>
              </div>
            </article>

            {/* Energy Saving Series */}
            <article className="product-card">
              <div className="h-48 bg-gradient-to-br from-yellow-700 to-yellow-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-5xl mb-4">🌱</div>
                  <div className="text-xl font-semibold">节能系列</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">节能显示屏</h3>
                <p className="text-gray-400 text-sm mb-4">ES系列、Ti系列节能显示屏，绿色环保解决方案。</p>
                <a href="/products" className="text-orange-500 hover:text-orange-400 font-medium">
                  查看更多 →
                </a>
              </div>
            </article>

          </div>
          <div className="text-center mt-12">
            <a href="/products" className="primary-button text-lg">查看所有产品</a>
          </div>
        </div>
      </section>

      {/* Company Statistics */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-white mb-4">{t('home.stats.title')}</h2>
            <p className="text-gray-300">{t('home.stats.subtitle')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in-up">
              <div className="led-card p-8 hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-3">17+</div>
                <div className="text-white font-semibold mb-1">{t('home.stats.experience')}</div>
                <div className="text-gray-400 text-sm">Years Experience</div>
              </div>
            </div>
            <div className="text-center animate-fade-in-up animate-delay-100">
              <div className="led-card p-8 hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-3">160+</div>
                <div className="text-white font-semibold mb-1">服务国家</div>
                <div className="text-gray-400 text-sm">Countries Served</div>
              </div>
            </div>
            <div className="text-center animate-fade-in-up animate-delay-200">
              <div className="led-card p-8 hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-3">50K㎡</div>
                <div className="text-white font-semibold mb-1">生产基地</div>
                <div className="text-gray-400 text-sm">Factory Area</div>
              </div>
            </div>
            <div className="text-center animate-fade-in-up animate-delay-300">
              <div className="led-card p-8 hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-3">24/7</div>
                <div className="text-white font-semibold mb-1">技术支持</div>
                <div className="text-gray-400 text-sm">Technical Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Company Section */}
      <section className="py-16 md:py-24 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title text-left">关于联锦光电</h2>
              <h3 className="text-xl text-orange-500 mb-4">RGBSHARE 联锦</h3>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                深圳联锦光电有限公司成立于2007年，是一家集LED显示屏研发、生产、销售、工程服务为一体的国家高新技术企业。注册资本2010万元，拥有50000㎡现代化生产基地。
              </p>
              <p className="text-gray-400 mb-8">
                我们专注于为全球客户提供高品质的LED显示解决方案，产品远销160多个国家和地区。
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-white mb-3">企业使命</h4>
                  <p className="text-gray-400 text-sm">为社会做贡献，为员工谋福利</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-3">企业愿景</h4>
                  <p className="text-gray-400 text-sm">打造国内一流、国际领先的企业</p>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-gray-700 rounded-lg shadow-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">企业亮点</h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">🏭</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">先进制造</div>
                      <div className="text-sm text-gray-400">50000㎡现代化生产基地</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-800 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">🌍</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">全球服务</div>
                      <div className="text-sm text-gray-400">产品远销160多个国家</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-800 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">质量认证</div>
                      <div className="text-sm text-gray-400">ISO45001:2020质量体系认证</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">准备开始您的LED项目？</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            获得我们LED显示屏专家的专业咨询和定制解决方案
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-white text-blue-700 px-8 py-4 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors">
              免费咨询
            </a>
            <a href="tel:+8675582595016" className="border-2 border-white text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors">
              致电 +86 755-8259-5016
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
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                深圳联锦光电有限公司成立于2007年，专业LED显示屏制造商，致力于为全球提供创新的视觉解决方案。
              </p>
              <p className="text-gray-500 text-xs">
                Professional LED display manufacturer since 2007.
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
                <li><a href="/about" className="hover:text-white transition-colors">生产实力</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">质量控制</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">全球合作</a></li>
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
              © 2024 深圳联锦光电有限公司 版权所有 | Shenzhen Lianjin Photoelectricity Co., Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}