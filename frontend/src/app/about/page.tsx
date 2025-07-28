'use client';

import Navigation from '@/components/Navigation';
import Breadcrumb from '@/components/Breadcrumb';
import BackToTop from '@/components/BackToTop';
import { FadeInUp, FadeInLeft, FadeInRight, StaggeredAnimation } from '@/components/AnimatedSection';
import { StatCounter } from '@/components/CounterAnimation';
import { FloatingLights } from '@/components/ParticleBackground';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Enhanced Navigation */}
      <Navigation />
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      {/* Page Header */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-center relative overflow-hidden">
        <FloatingLights />
        <div className="container mx-auto px-6 relative z-10">
          <FadeInUp>
            <h1 className="led-title-section text-5xl mb-8">关于联锦光电</h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              全球领先的LED显示应用与解决方案供应商
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-4">
              17年专业经验，服务全球160+国家，致力于为客户提供最优质的LED显示解决方案
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Company Profile */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInLeft>
              <div className="relative">
                <div className="h-96 bg-gradient-to-br from-blue-700 to-blue-800 rounded-2xl flex items-center justify-center relative overflow-hidden hover-lift">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent"></div>
                  <div className="text-white text-center relative z-10">
                    <div className="text-8xl mb-4 animate-float">🏭</div>
                    <div className="text-3xl font-bold mb-2">联锦光电</div>
                    <div className="text-lg opacity-80">深圳生产基地</div>
                    <div className="text-sm mt-2 opacity-60">50,000㎡ 现代化工厂</div>
                  </div>
                </div>
                {/* 装饰元素 */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500 rounded-full opacity-30 animate-pulse animation-delay-1000"></div>
              </div>
            </FadeInLeft>
            
            <FadeInRight>
              <div>
                <h2 className="text-4xl font-bold text-white mb-8 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  公司简介
                </h2>
                <div className="space-y-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    深圳联锦光电有限公司（RGBSHARE联锦）成立于<span className="text-orange-400 font-semibold">2007年</span>，注册资本<span className="text-orange-400 font-semibold">2010万元</span>人民币，坐落于深圳市宝安区，是一家集LED显示屏研发、生产、销售、工程服务为一体的<span className="text-orange-400 font-semibold">国家高新技术企业</span>。
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    主营产品有室内小间距、室内外租赁屏、固装广告屏、LED海报屏、异形屏、透明屏、会议一体机等，广泛应用于可视化、广告传媒、会议、舞台演艺、体育场馆等领域。
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    经过<span className="text-orange-400 font-semibold">十七年</span>的发展，公司已实现跨越式发展，产品远销全球<span className="text-orange-400 font-semibold">160多个国家和地区</span>，成功案例遍布世界。
                  </p>
                </div>
                
                {/* 核心优势 */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-4 rounded-lg border border-orange-500/20">
                    <div className="text-orange-400 text-2xl mb-2">🏆</div>
                    <div className="text-white font-semibold">国家高新技术企业</div>
                    <div className="text-gray-400 text-sm">技术创新认证</div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg border border-blue-500/20">
                    <div className="text-blue-400 text-2xl mb-2">🌍</div>
                    <div className="text-white font-semibold">全球化服务</div>
                    <div className="text-gray-400 text-sm">160+国家覆盖</div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg border border-green-500/20">
                    <div className="text-green-400 text-2xl mb-2">🏭</div>
                    <div className="text-white font-semibold">现代化工厂</div>
                    <div className="text-gray-400 text-sm">50,000㎡ 生产基地</div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg border border-purple-500/20">
                    <div className="text-purple-400 text-2xl mb-2">📋</div>
                    <div className="text-white font-semibold">质量认证</div>
                    <div className="text-gray-400 text-sm">ISO45001:2020</div>
                  </div>
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500"></div>
        <div className="container mx-auto px-6 relative z-10">
          <FadeInUp>
            <h2 className="led-title-section text-center mb-16">企业实力数据</h2>
          </FadeInUp>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCounter
              value={2007}
              label="成立年份"
              icon={<span className="text-orange-400">🏢</span>}
              className="hover-lift"
            />
            <StatCounter
              value={2010}
              label="注册资本(万元)"
              icon={<span className="text-blue-400">💰</span>}
              className="hover-lift"
            />
            <StatCounter
              value={50000}
              label="厂房面积(㎡)"
              suffix="㎡"
              icon={<span className="text-green-400">🏭</span>}
              className="hover-lift"
            />
            <StatCounter
              value={160}
              label="服务国家和地区"
              suffix="+"
              icon={<span className="text-purple-400">🌍</span>}
              className="hover-lift"
            />
          </div>
          
          {/* 额外统计信息 */}
          <FadeInUp delay={500}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              <div className="text-center p-6 bg-gray-700/50 rounded-lg backdrop-blur-sm hover-lift">
                <div className="text-3xl mb-2">👥</div>
                <div className="text-2xl font-bold text-orange-400 mb-1">500+</div>
                <div className="text-gray-300 text-sm">员工团队</div>
              </div>
              <div className="text-center p-6 bg-gray-700/50 rounded-lg backdrop-blur-sm hover-lift">
                <div className="text-3xl mb-2">🔬</div>
                <div className="text-2xl font-bold text-blue-400 mb-1">50+</div>
                <div className="text-gray-300 text-sm">研发人员</div>
              </div>
              <div className="text-center p-6 bg-gray-700/50 rounded-lg backdrop-blur-sm hover-lift">
                <div className="text-3xl mb-2">📜</div>
                <div className="text-2xl font-bold text-green-400 mb-1">20+</div>
                <div className="text-gray-300 text-sm">专利技术</div>
              </div>
              <div className="text-center p-6 bg-gray-700/50 rounded-lg backdrop-blur-sm hover-lift">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-2xl font-bold text-purple-400 mb-1">10+</div>
                <div className="text-gray-300 text-sm">行业奖项</div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Development History */}
      <section className="py-20 bg-gray-900 relative">
        <div className="container mx-auto px-6">
          <FadeInUp>
            <h2 className="led-title-section text-center mb-16">发展历程</h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
              从2007年成立至今，联锦光电始终坚持技术创新，不断发展壮大，成为行业领军企业
            </p>
          </FadeInUp>
          
          <div className="max-w-4xl mx-auto relative">
            {/* 时间线 */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-blue-500 to-purple-500"></div>
            
            <div className="space-y-12">
              <FadeInLeft delay={100}>
                <div className="flex items-start space-x-8">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      2007
                    </div>
                    <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-20"></div>
                  </div>
                  <div className="bg-gray-800 p-8 rounded-2xl flex-1 hover-lift border border-orange-500/20">
                    <h3 className="text-2xl font-bold text-orange-400 mb-4">公司成立</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      深圳联锦光电有限公司正式成立，开始专注于LED显示屏技术研发和生产。
                    </p>
                    <div className="mt-4 flex items-center text-sm text-gray-400">
                      <span className="mr-2">🏢</span>
                      <span>企业创立 • 技术起步</span>
                    </div>
                  </div>
                </div>
              </FadeInLeft>
              
              <FadeInRight delay={200}>
                <div className="flex items-start space-x-8">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      2010
                    </div>
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
                  </div>
                  <div className="bg-gray-800 p-8 rounded-2xl flex-1 hover-lift border border-blue-500/20">
                    <h3 className="text-2xl font-bold text-blue-400 mb-4">规模扩张</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      扩大生产规模，引进首批自动化设备，提升生产效率和产品质量。
                    </p>
                    <div className="mt-4 flex items-center text-sm text-gray-400">
                      <span className="mr-2">⚙️</span>
                      <span>设备升级 • 产能提升</span>
                    </div>
                  </div>
                </div>
              </FadeInRight>
              
              <FadeInLeft delay={300}>
                <div className="flex items-start space-x-8">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      2015
                    </div>
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
                  </div>
                  <div className="bg-gray-800 p-8 rounded-2xl flex-1 hover-lift border border-green-500/20">
                    <h3 className="text-2xl font-bold text-green-400 mb-4">国际认证</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      产品通过CE、RoHS等国际认证，开始大力拓展海外市场，产品质量获得国际认可。
                    </p>
                    <div className="mt-4 flex items-center text-sm text-gray-400">
                      <span className="mr-2">🌍</span>
                      <span>国际认证 • 海外拓展</span>
                    </div>
                  </div>
                </div>
              </FadeInLeft>
              
              <FadeInRight delay={400}>
                <div className="flex items-start space-x-8">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      2018
                    </div>
                    <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-20"></div>
                  </div>
                  <div className="bg-gray-800 p-8 rounded-2xl flex-1 hover-lift border border-purple-500/20">
                    <h3 className="text-2xl font-bold text-purple-400 mb-4">技术认定</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      荣获国家高新技术企业认证，技术实力和创新能力得到国家权威认可。
                    </p>
                    <div className="mt-4 flex items-center text-sm text-gray-400">
                      <span className="mr-2">🏆</span>
                      <span>高新认证 • 技术突破</span>
                    </div>
                  </div>
                </div>
              </FadeInRight>
              
              <FadeInLeft delay={500}>
                <div className="flex items-start space-x-8">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      2020
                    </div>
                    <div className="absolute inset-0 bg-teal-500 rounded-full animate-ping opacity-20"></div>
                  </div>
                  <div className="bg-gray-800 p-8 rounded-2xl flex-1 hover-lift border border-teal-500/20">
                    <h3 className="text-2xl font-bold text-teal-400 mb-4">智能升级</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      厂房面积扩展至50,000㎡，全面升级智能化生产线，通过ISO45001:2020体系认证。
                    </p>
                    <div className="mt-4 flex items-center text-sm text-gray-400">
                      <span className="mr-2">🏭</span>
                      <span>智能制造 • 质量体系</span>
                    </div>
                  </div>
                </div>
              </FadeInLeft>
              
              <FadeInRight delay={600}>
                <div className="flex items-start space-x-8">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      2024
                    </div>
                    <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-20"></div>
                  </div>
                  <div className="bg-gray-800 p-8 rounded-2xl flex-1 hover-lift border border-orange-500/20">
                    <h3 className="text-2xl font-bold text-orange-400 mb-4">持续创新</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      持续创新发展，产品服务全球160多个国家和地区，致力于成为国际领先的LED显示解决方案提供商。
                    </p>
                    <div className="mt-4 flex items-center text-sm text-gray-400">
                      <span className="mr-2">🚀</span>
                      <span>全球领先 • 持续创新</span>
                    </div>
                  </div>
                </div>
              </FadeInRight>
            </div>
          </div>
        </div>
      </section>

      {/* Production & R&D */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInLeft>
              <div>
                <h2 className="text-4xl font-bold text-white mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  生产实力与研发创新
                </h2>
                <div className="space-y-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    联锦光电拥有<span className="text-blue-400 font-semibold">20,000㎡</span>的现代化生产车间，配备<span className="text-blue-400 font-semibold">日本松下贴片机NPMD3A</span>、<span className="text-blue-400 font-semibold">美国MPM印刷机</span>等世界级尖端设备。
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    全面引进智能化管理模式，全产线实现自动化，生产更智能更高效。我们拥有一支专业的研发团队，持续投入技术创新。
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    已获得<span className="text-purple-400 font-semibold">多项专利和技术奖项</span>，严格执行<span className="text-purple-400 font-semibold">ISO45001:2020</span>国际标准化质量管理体系，确保每一款产品都达到行业领先水平。
                  </p>
                </div>
                
                {/* 生产能力指标 */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-blue-400 text-2xl mb-2">📊</div>
                    <div className="text-white font-semibold">月产能</div>
                    <div className="text-gray-400 text-sm">100,000㎡+</div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-green-400 text-2xl mb-2">⚡</div>
                    <div className="text-white font-semibold">交付周期</div>
                    <div className="text-gray-400 text-sm">7-15天</div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-purple-400 text-2xl mb-2">🎯</div>
                    <div className="text-white font-semibold">良品率</div>
                    <div className="text-gray-400 text-sm">99.5%+</div>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-orange-400 text-2xl mb-2">🔧</div>
                    <div className="text-white font-semibold">设备利用率</div>
                    <div className="text-gray-400 text-sm">95%+</div>
                  </div>
                </div>
              </div>
            </FadeInLeft>
            
            <FadeInRight>
              <div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="h-40 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center hover-lift relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    <div className="text-white text-center relative z-10">
                      <div className="text-4xl mb-2 animate-float">🏭</div>
                      <div className="font-semibold">SMT生产设备</div>
                      <div className="text-sm opacity-80 mt-1">松下贴片机</div>
                    </div>
                  </div>
                  <div className="h-40 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center hover-lift relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    <div className="text-white text-center relative z-10">
                      <div className="text-4xl mb-2 animate-float animation-delay-200">⚙️</div>
                      <div className="font-semibold">自动化组装线</div>
                      <div className="text-sm opacity-80 mt-1">智能制造</div>
                    </div>
                  </div>
                  <div className="h-40 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center hover-lift relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    <div className="text-white text-center relative z-10">
                      <div className="text-4xl mb-2 animate-float animation-delay-400">🔬</div>
                      <div className="font-semibold">精密检测仪器</div>
                      <div className="text-sm opacity-80 mt-1">质量保证</div>
                    </div>
                  </div>
                  <div className="h-40 bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl flex items-center justify-center hover-lift relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    <div className="text-white text-center relative z-10">
                      <div className="text-4xl mb-2 animate-float animation-delay-600">🧪</div>
                      <div className="font-semibold">研发实验室</div>
                      <div className="text-sm opacity-80 mt-1">技术创新</div>
                    </div>
                  </div>
                </div>
                
                {/* 核心设备展示 */}
                <div className="mt-8 bg-gray-700 p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-4">核心生产设备</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">松下贴片机 NPMD3A</span>
                      <span className="text-blue-400 text-sm">日本进口</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">MPM印刷机</span>
                      <span className="text-green-400 text-sm">美国进口</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">AOI光学检测设备</span>
                      <span className="text-purple-400 text-sm">德国进口</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">波峰焊接设备</span>
                      <span className="text-orange-400 text-sm">自动化</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* Corporate Culture */}
      <section className="py-20 bg-gray-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <FadeInUp>
            <h2 className="led-title-section mb-8">企业文化</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-16">
              秉承"务实、匠心、创新"的企业精神，致力于为社会创造价值，为员工创造机会
            </p>
          </FadeInUp>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FadeInUp delay={100}>
              <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/30 p-8 rounded-2xl shadow-2xl border border-orange-500/20 hover-lift">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-orange-400 mb-4">企业使命</h3>
                <p className="text-gray-300 text-lg leading-relaxed">为社会做贡献，为员工谋福利</p>
                <div className="mt-4 text-sm text-orange-300">
                  社会责任 • 员工关怀
                </div>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={200}>
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 p-8 rounded-2xl shadow-2xl border border-blue-500/20 hover-lift">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-blue-400 mb-4">企业目标</h3>
                <p className="text-gray-300 text-lg leading-relaxed">创国内一流，国际领先企业</p>
                <div className="mt-4 text-sm text-blue-300">
                  行业领先 • 国际视野
                </div>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={300}>
              <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 p-8 rounded-2xl shadow-2xl border border-green-500/20 hover-lift">
                <div className="text-5xl mb-4">💎</div>
                <h3 className="text-2xl font-bold text-green-400 mb-4">企业精神</h3>
                <p className="text-gray-300 text-lg leading-relaxed">务实、匠心、创新</p>
                <div className="mt-4 text-sm text-green-300">
                  脚踏实地 • 精益求精
                </div>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={400}>
              <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 p-8 rounded-2xl shadow-2xl border border-purple-500/20 hover-lift">
                <div className="text-5xl mb-4">⚖️</div>
                <h3 className="text-2xl font-bold text-purple-400 mb-4">企业作风</h3>
                <p className="text-gray-300 text-lg leading-relaxed">诚实、严谨、细致</p>
                <div className="mt-4 text-sm text-purple-300">
                  诚信为本 • 精工细作
                </div>
              </div>
            </FadeInUp>
          </div>
          
          {/* 核心价值观 */}
          <FadeInUp delay={500}>
            <div className="mt-16 bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-8">核心价值观</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl mb-3">🤝</div>
                  <h4 className="text-lg font-semibold text-orange-400 mb-2">客户至上</h4>
                  <p className="text-gray-300 text-sm">以客户需求为导向，提供超越期望的产品和服务</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">🔬</div>
                  <h4 className="text-lg font-semibold text-blue-400 mb-2">技术创新</h4>
                  <p className="text-gray-300 text-sm">持续投入研发，推动LED显示技术不断进步</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">🌱</div>
                  <h4 className="text-lg font-semibold text-green-400 mb-2">可持续发展</h4>
                  <p className="text-gray-300 text-sm">注重环保节能，实现企业与社会的和谐发展</p>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Honors & Certifications */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <FadeInUp>
            <h2 className="led-title-section text-center mb-8">企业荣誉与认证</h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
              我们获得的认可，是品质与实力的最佳证明，也是我们持续前进的动力
            </p>
          </FadeInUp>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <FadeInUp delay={100}>
              <div className="bg-gray-700 p-6 rounded-2xl shadow-2xl text-center hover-lift group">
                <div className="h-32 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <div className="text-gray-800 text-center">
                    <div className="text-3xl mb-2">🏆</div>
                    <div className="text-xs font-bold">高新技术企业</div>
                  </div>
                </div>
                <p className="text-sm text-white font-medium">国家高新技术企业</p>
                <p className="text-xs text-gray-400 mt-1">2018年认证</p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={200}>
              <div className="bg-gray-700 p-6 rounded-2xl shadow-2xl text-center hover-lift group">
                <div className="h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <div className="text-gray-800 text-center">
                    <div className="text-3xl mb-2">📋</div>
                    <div className="text-xs font-bold">ISO45001</div>
                  </div>
                </div>
                <p className="text-sm text-white font-medium">ISO45001:2020</p>
                <p className="text-xs text-gray-400 mt-1">质量管理体系</p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={300}>
              <div className="bg-gray-700 p-6 rounded-2xl shadow-2xl text-center hover-lift group">
                <div className="h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <div className="text-gray-800 text-center">
                    <div className="text-3xl mb-2">✅</div>
                    <div className="text-xs font-bold">CE认证</div>
                  </div>
                </div>
                <p className="text-sm text-white font-medium">CE认证</p>
                <p className="text-xs text-gray-400 mt-1">欧盟安全认证</p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={400}>
              <div className="bg-gray-700 p-6 rounded-2xl shadow-2xl text-center hover-lift group">
                <div className="h-32 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <div className="text-gray-800 text-center">
                    <div className="text-3xl mb-2">🌿</div>
                    <div className="text-xs font-bold">RoHS</div>
                  </div>
                </div>
                <p className="text-sm text-white font-medium">RoHS认证</p>
                <p className="text-xs text-gray-400 mt-1">环保标准认证</p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={500}>
              <div className="bg-gray-700 p-6 rounded-2xl shadow-2xl text-center hover-lift group">
                <div className="h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <div className="text-gray-800 text-center">
                    <div className="text-3xl mb-2">🔒</div>
                    <div className="text-xs font-bold">FCC</div>
                  </div>
                </div>
                <p className="text-sm text-white font-medium">FCC认证</p>
                <p className="text-xs text-gray-400 mt-1">美国联邦认证</p>
              </div>
            </FadeInUp>
          </div>
          
          {/* 专利技术展示 */}
          <FadeInUp delay={600}>
            <div className="mt-16 bg-gray-700/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-600/50">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">专利技术成果</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg border border-orange-500/20">
                  <div className="text-orange-400 text-2xl mb-3">💡</div>
                  <h4 className="text-lg font-semibold text-white mb-2">LED显示控制技术</h4>
                  <p className="text-gray-400 text-sm">自主研发的显示控制算法，提升显示效果和稳定性</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-blue-500/20">
                  <div className="text-blue-400 text-2xl mb-3">⚡</div>
                  <h4 className="text-lg font-semibold text-white mb-2">节能优化技术</h4>
                  <p className="text-gray-400 text-sm">创新的节能技术，降低功耗30%以上</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg border border-green-500/20">
                  <div className="text-green-400 text-2xl mb-3">🔧</div>
                  <h4 className="text-lg font-semibold text-white mb-2">模块化设计专利</h4>
                  <p className="text-gray-400 text-sm">模块化设计理念，便于安装维护和升级</p>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Team Introduction */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <FadeInUp>
            <h2 className="led-title-section text-center mb-8">核心团队</h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
              拥有一支经验丰富、技术精湛的专业团队，为企业发展提供强有力的人才保障
            </p>
          </FadeInUp>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FadeInUp delay={100}>
              <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl hover-lift border border-orange-500/20">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl text-white">👨‍💼</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">管理团队</h3>
                  <p className="text-orange-400 text-sm">Executive Team</p>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-300 text-sm">• 平均行业经验15年以上</p>
                  <p className="text-gray-300 text-sm">• 具备国际化视野和管理经验</p>
                  <p className="text-gray-300 text-sm">• 深度了解LED显示行业发展趋势</p>
                  <p className="text-gray-300 text-sm">• 拥有丰富的市场开拓和运营经验</p>
                </div>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={200}>
              <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl hover-lift border border-blue-500/20">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl text-white">👨‍🔬</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">研发团队</h3>
                  <p className="text-blue-400 text-sm">R&D Team</p>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-300 text-sm">• 50+专业研发工程师</p>
                  <p className="text-gray-300 text-sm">• 硕士及以上学历占比60%</p>
                  <p className="text-gray-300 text-sm">• 专注LED显示技术创新</p>
                  <p className="text-gray-300 text-sm">• 持续投入新产品开发</p>
                </div>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={300}>
              <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl hover-lift border border-green-500/20">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl text-white">👨‍🏭</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">生产团队</h3>
                  <p className="text-green-400 text-sm">Production Team</p>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-300 text-sm">• 300+专业生产人员</p>
                  <p className="text-gray-300 text-sm">• 严格的质量控制体系</p>
                  <p className="text-gray-300 text-sm">• 精通自动化生产流程</p>
                  <p className="text-gray-300 text-sm">• 确保产品质量和交期</p>
                </div>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={400}>
              <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl hover-lift border border-purple-500/20">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl text-white">👨‍💻</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">技术支持</h3>
                  <p className="text-purple-400 text-sm">Technical Support</p>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-300 text-sm">• 24/7技术支持服务</p>
                  <p className="text-gray-300 text-sm">• 多语言服务能力</p>
                  <p className="text-gray-300 text-sm">• 快速响应客户需求</p>
                  <p className="text-gray-300 text-sm">• 专业的售后服务团队</p>
                </div>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={500}>
              <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl hover-lift border border-teal-500/20">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl text-white">👨‍💼</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">销售团队</h3>
                  <p className="text-teal-400 text-sm">Sales Team</p>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-300 text-sm">• 覆盖全球主要市场</p>
                  <p className="text-gray-300 text-sm">• 深度了解客户需求</p>
                  <p className="text-gray-300 text-sm">• 提供专业解决方案</p>
                  <p className="text-gray-300 text-sm">• 建立长期合作关系</p>
                </div>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={600}>
              <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl hover-lift border border-red-500/20">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl text-white">👨‍🔧</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">质量团队</h3>
                  <p className="text-red-400 text-sm">Quality Team</p>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-300 text-sm">• 严格的质量检测流程</p>
                  <p className="text-gray-300 text-sm">• 国际标准质量体系</p>
                  <p className="text-gray-300 text-sm">• 持续改进产品质量</p>
                  <p className="text-gray-300 text-sm">• 确保客户满意度</p>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <FadeInUp>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              携手联锦光电，共创美好未来
            </h2>
            <p className="text-xl text-orange-100 mb-12 max-w-3xl mx-auto">
              我们期待与您合作，为您提供最优质的LED显示解决方案
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="/contact" className="btn-led-secondary text-lg px-8 py-4 hover-lift">
                联系我们
              </a>
              <a href="/products" className="btn-led-outline text-lg px-8 py-4 hover-glow border-white text-white hover:bg-white hover:text-orange-600">
                查看产品
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Back to Top */}
      <BackToTop />
    </div>
  );
}er mb-4 group-hover:scale-105 transition-transform">
                  <div className="text-gray-800 text-center">
                    <div className="text-3xl mb-2">✅</div>
                    <div className="text-xs font-bold">CE认证</div>
                  </div>
                </div>
                <p className="text-sm text-white font-medium">CE认证</p>
                <p className="text-xs text-gray-400 mt-1">欧盟安全认证</p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={400}>
              <div className="bg-gray-700 p-6 rounded-2xl shadow-2xl text-center hover-lift group">
                <div className="h-32 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <div className="text-gray-800 text-center">
                    <div className="text-3xl mb-2">🌿</div>
                    <div className="text-xs font-bold">RoHS</div>
                  </div>
                </div>
                <p className="text-sm text-white font-medium">RoHS认证</p>
                <p className="text-xs text-gray-400 mt-1">环保标准认证</p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={500}>
              <div className="bg-gray-700 p-6 rounded-2xl shadow-2xl text-center hover-lift group">
                <div className="h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <div className="text-gray-800 text-center">
                    <div className="text-3xl mb-2">🔒</div>
                    <div className="text-xs font-bold">FCC</div>
                  </div>
                </div>
                <p className="text-sm text-white font-medium">FCC认证</p>
                <p className="text-xs text-gray-400 mt-1">美国联邦认证</p>
              </div>
            </FadeInUp>
          </div>
          
          {/* 专利技术展示 */}
          <FadeInUp delay={600}>
            <div className="mt-16 bg-gray-700/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-600/50">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">专利技术成果</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-orange-500/20">
                  <div className="text-orange-400 text-2xl mb-3">💡</div>
                  <h4 className="text-lg font-semibold text-white mb-2">LED显示控制技术</h4>
                  <p className="text-gray-300 text-sm">自主研发的显示控制算法，提升显示效果和稳定性</p>
                  <div className="mt-3 text-xs text-orange-300">发明专利 • 2019年</div>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-500/20">
                  <div className="text-blue-400 text-2xl mb-3">⚡</div>
                  <h4 className="text-lg font-semibold text-white mb-2">节能驱动技术</h4>
                  <p className="text-gray-300 text-sm">创新的节能驱动方案，降低功耗30%以上</p>
                  <div className="mt-3 text-xs text-blue-300">实用新型专利 • 2020年</div>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-500/20">
                  <div className="text-green-400 text-2xl mb-3">🔧</div>
                  <h4 className="text-lg font-semibold text-white mb-2">快速安装系统</h4>
                  <p className="text-gray-300 text-sm">模块化快速安装技术，安装效率提升50%</p>
                  <div className="mt-3 text-xs text-green-300">外观设计专利 • 2021年</div>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Team Introduction */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <FadeInUp>
            <h2 className="led-title-section text-center mb-8">核心团队</h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
              汇聚行业精英，打造专业团队，为客户提供最优质的产品和服务
            </p>
          </FadeInUp>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FadeInUp delay={100}>
              <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl text-center hover-lift border border-orange-500/20">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl text-white">👨‍💼</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">技术研发团队</h3>
                <p className="text-orange-400 font-semibold mb-4">50+ 专业工程师</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  拥有丰富的LED显示技术研发经验，持续推动产品技术创新和升级
                </p>
                <div className="mt-4 flex justify-center space-x-2">
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full">硬件设计</span>
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full">软件开发</span>
                </div>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={200}>
              <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl text-center hover-lift border border-blue-500/20">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl text-white">👥</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">生产制造团队</h3>
                <p className="text-blue-400 font-semibold mb-4">300+ 技术工人</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  经验丰富的生产团队，严格执行质量标准，确保每一件产品的品质
                </p>
                <div className="mt-4 flex justify-center space-x-2">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">SMT贴装</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">组装测试</span>
                </div>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={300}>
              <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl text-center hover-lift border border-green-500/20">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl text-white">🌍</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">销售服务团队</h3>
                <p className="text-green-400 font-semibold mb-4">100+ 服务专员</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  遍布全球的销售和服务网络，为客户提供及时专业的技术支持和服务
                </p>
                <div className="mt-4 flex justify-center space-x-2">
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">技术支持</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">售后服务</span>
                </div>
              </div>
            </FadeInUp>
          </div>
          
          {/* 团队优势 */}
          <FadeInUp delay={400}>
            <div className="mt-16 bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">团队优势</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎓</div>
                  <h4 className="text-lg font-semibold text-orange-400 mb-2">专业背景</h4>
                  <p className="text-gray-300 text-sm">团队成员均具备相关专业背景和丰富行业经验</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🔬</div>
                  <h4 className="text-lg font-semibold text-blue-400 mb-2">技术创新</h4>
                  <p className="text-gray-300 text-sm">持续投入研发，保持技术领先优势</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🤝</div>
                  <h4 className="text-lg font-semibold text-green-400 mb-2">团队协作</h4>
                  <p className="text-gray-300 text-sm">高效的团队协作，确保项目顺利实施</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🌟</div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">服务品质</h4>
                  <p className="text-gray-300 text-sm">以客户为中心，提供优质的产品和服务</p>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <FadeInUp>
            <h2 className="text-4xl font-bold text-white mb-6">携手联锦光电，共创美好未来</h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              选择联锦光电，选择专业、可靠、创新的LED显示解决方案合作伙伴
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-led-secondary text-lg px-8 py-4 bg-white text-orange-600 hover:bg-gray-100">
                联系我们
              </a>
              <a href="/products" className="btn-led-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-orange-600">
                查看产品
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>

      <BackToTop />
    </div>
  );
}er mb-4 group-hover:scale-105 transition-transform">
                  <div className="text-gray-800 text-center">
                    <div className="text-3xl mb-2">✅</div>
                    <div className="text-xs font-bold">CE认证</div>
                  </div>
                </div>
                <p className="text-sm text-white font-medium">CE认证</p>
                <p className="text-xs text-gray-400 mt-1">欧盟安全认证</p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={400}>
              <div className="bg-gray-700 p-6 rounded-2xl shadow-2xl text-center hover-lift group">
                <div className="h-32 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <div className="text-gray-800 text-center">
                    <div className="text-3xl mb-2">🌿</div>
                    <div className="text-xs font-bold">RoHS认证</div>
                  </div>
                </div>
                <p className="text-sm text-white font-medium">RoHS认证</p>
                <p className="text-xs text-gray-400 mt-1">环保标准认证</p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={500}>
              <div className="bg-gray-700 p-6 rounded-2xl shadow-2xl text-center hover-lift group">
                <div className="h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <div className="text-gray-800 text-center">
                    <div className="text-3xl mb-2">📡</div>
                    <div className="text-xs font-bold">FCC认证</div>
                  </div>
                </div>
                <p className="text-sm text-white font-medium">FCC认证</p>
                <p className="text-xs text-gray-400 mt-1">美国通信认证</p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={600}>
              <div className="bg-gray-700 p-6 rounded-2xl shadow-2xl text-center hover-lift group">
                <div className="h-32 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <div className="text-gray-800 text-center">
                    <div className="text-3xl mb-2">🛡️</div>
                    <div className="text-xs font-bold">UL认证</div>
                  </div>
                </div>
                <p className="text-sm text-white font-medium">UL认证</p>
                <p className="text-xs text-gray-400 mt-1">安全标准认证</p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={700}>
              <div className="bg-gray-700 p-6 rounded-2xl shadow-2xl text-center hover-lift group">
                <div className="h-32 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <div className="text-gray-800 text-center">
                    <div className="text-3xl mb-2">🔒</div>
                    <div className="text-xs font-bold">ETL认证</div>
                  </div>
                </div>
                <p className="text-sm text-white font-medium">ETL认证</p>
                <p className="text-xs text-gray-400 mt-1">北美安全认证</p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={800}>
              <div className="bg-gray-700 p-6 rounded-2xl shadow-2xl text-center hover-lift group">
                <div className="h-32 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <div className="text-gray-800 text-center">
                    <div className="text-3xl mb-2">🌟</div>
                    <div className="text-xs font-bold">CCC认证</div>
                  </div>
                </div>
                <p className="text-sm text-white font-medium">CCC认证</p>
                <p className="text-xs text-gray-400 mt-1">中国强制认证</p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={900}>
              <div className="bg-gray-700 p-6 rounded-2xl shadow-2xl text-center hover-lift group">
                <div className="h-32 bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <div className="text-gray-800 text-center">
                    <div className="text-3xl mb-2">🎖️</div>
                    <div className="text-xs font-bold">专利证书</div>
                  </div>
                </div>
                <p className="text-sm text-white font-medium">发明专利</p>
                <p className="text-xs text-gray-400 mt-1">20+项专利</p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={1000}>
              <div className="bg-gray-700 p-6 rounded-2xl shadow-2xl text-center hover-lift group">
                <div className="h-32 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <div className="text-gray-800 text-center">
                    <div className="text-3xl mb-2">🏅</div>
                    <div className="text-xs font-bold">行业奖项</div>
                  </div>
                </div>
                <p className="text-sm text-white font-medium">优秀企业奖</p>
                <p className="text-xs text-gray-400 mt-1">行业协会认可</p>
              </div>
            </FadeInUp>
          </div>
          
          {/* 认证说明 */}
          <FadeInUp delay={1100}>
            <div className="mt-16 bg-gray-700/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-600/50">
              <h3 className="text-2xl font-bold text-white text-center mb-8">认证体系说明</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-orange-400 text-3xl mb-3">🏆</div>
                  <h4 className="text-lg font-semibold text-white mb-2">技术认证</h4>
                  <p className="text-gray-300 text-sm">国家高新技术企业认证，拥有多项发明专利和实用新型专利</p>
                </div>
                <div className="text-center">
                  <div className="text-blue-400 text-3xl mb-3">🌍</div>
                  <h4 className="text-lg font-semibold text-white mb-2">国际认证</h4>
                  <p className="text-gray-300 text-sm">通过CE、FCC、UL、ETL等多项国际安全和质量认证</p>
                </div>
                <div className="text-center">
                  <div className="text-green-400 text-3xl mb-3">📋</div>
                  <h4 className="text-lg font-semibold text-white mb-2">质量体系</h4>
                  <p className="text-gray-300 text-sm">严格执行ISO45001:2020国际质量管理体系标准</p>
                </div>
              </div>
            </div>
          </FadeInUp>
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