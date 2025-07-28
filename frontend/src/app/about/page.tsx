'use client';

import Navigation from '@/components/Navigation';
import { FadeInUp, FadeInLeft, FadeInRight } from '@/components/AnimatedSection';
import { StatCounter } from '@/components/CounterAnimation';
import { FloatingLights } from '@/components/ParticleBackground';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navigation />
      
      {/* Page Header */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-center relative overflow-hidden">
        <FloatingLights />
        <div className="container mx-auto px-6 relative z-10">
          <FadeInUp>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                关于联锦光电
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              全球领先的LED显示应用与解决方案供应商
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeInLeft>
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">
                  公司简介
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  深圳联锦光电有限公司成立于2007年，是一家集LED显示屏研发、生产、销售、工程服务为一体的国家高新技术企业。
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <StatCounter 
                    value={17} 
                    suffix="+" 
                    label="年专业经验"
                    icon={<span className="text-orange-400">🏆</span>}
                  />
                  <StatCounter 
                    value={160} 
                    suffix="+" 
                    label="服务国家"
                    icon={<span className="text-blue-400">🌍</span>}
                  />
                </div>
              </div>
            </FadeInLeft>
            <FadeInRight>
              <div className="relative">
                <div className="bg-gradient-to-br from-orange-500 to-blue-600 p-1 rounded-lg">
                  <div className="bg-gray-800 p-8 rounded-lg">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      企业使命
                    </h3>
                    <p className="text-gray-300">
                      致力于为全球客户提供最优质的LED显示解决方案，推动LED显示技术的创新发展。
                    </p>
                  </div>
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                企业价值观
              </h2>
              <p className="text-xl text-gray-300">
                秉承创新、品质、服务的核心理念
              </p>
            </div>
          </FadeInUp>
          <div className="grid md:grid-cols-3 gap-8">
            <FadeInUp delay={100}>
              <div className="text-center p-8 bg-gray-800 rounded-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  技术创新
                </h3>
                <p className="text-gray-300">
                  持续投入研发，推动LED显示技术不断进步
                </p>
              </div>
            </FadeInUp>
            <FadeInUp delay={200}>
              <div className="text-center p-8 bg-gray-800 rounded-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">⭐</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  品质保证
                </h3>
                <p className="text-gray-300">
                  严格的质量管理体系，确保产品品质
                </p>
              </div>
            </FadeInUp>
            <FadeInUp delay={300}>
              <div className="text-center p-8 bg-gray-800 rounded-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  优质服务
                </h3>
                <p className="text-gray-300">
                  7×24小时技术支持，全球本地化服务
                </p>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-700">
        <div className="container mx-auto px-6">
          <FadeInUp>
            <h2 className="text-4xl font-bold text-center text-white mb-16">企业实力</h2>
          </FadeInUp>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCounter
              value={2007}
              label="成立年份"
              icon={<span className="text-orange-400">🏢</span>}
            />
            <StatCounter
              value={50000}
              label="厂房面积(㎡)"
              suffix="㎡"
              icon={<span className="text-green-400">🏭</span>}
            />
            <StatCounter
              value={160}
              label="服务国家"
              suffix="+"
              icon={<span className="text-purple-400">🌍</span>}
            />
            <StatCounter
              value={1000}
              label="成功项目"
              suffix="+"
              icon={<span className="text-blue-400">🏆</span>}
            />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">了解更多关于联锦光电</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            欢迎联系我们，获取更多公司信息和产品资料
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-white text-blue-700 px-8 py-4 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors">
              联系我们
            </a>
            <a href="/products" className="border-2 border-white text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors">
              查看产品
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}