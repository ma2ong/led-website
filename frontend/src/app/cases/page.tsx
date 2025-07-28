'use client';
import Navigation from '@/components/Navigation';
import Breadcrumb from '@/components/Breadcrumb';
import BackToTop from '@/components/BackToTop';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

export default function CasesPage() {
  const { t } = useLanguage();
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  
  // 暂时使用静态数据，等后端集成完成后再启用动态数据
  const isLoading = false;
  const error = null;
  const cases: any[] = [];
  const featuredCases: any[] = [];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navigation />
      
      <Breadcrumb 
        items={[
          { label: '首页', href: '/' },
          { label: '成功案例', href: '/cases' }
        ]} 
      />

      {/* Page Header */}
      <section className="py-16 bg-gray-800 text-center">
        <div className="container mx-auto px-6">
          <h1 className="section-title">成功案例</h1>
          <p className="section-subtitle">遍布全球的卓越项目，见证联锦光电的专业实力</p>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <div className="text-xl text-gray-300 mb-2">案例功能开发中</div>
            <div className="text-gray-400">动态内容管理功能正在完善，敬请期待</div>
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
      
      <BackToTop />
    </div>
  );
}