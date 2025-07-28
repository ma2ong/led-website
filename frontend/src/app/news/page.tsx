'use client';
import Navigation from '@/components/Navigation';
import Breadcrumb from '@/components/Breadcrumb';
import BackToTop from '@/components/BackToTop';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

export default function NewsPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // 暂时使用静态数据，等后端集成完成后再启用动态数据
  const isLoading = false;
  const error = null;
  const news: any[] = [];
  const latestNews: any[] = [];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navigation />
      
      <Breadcrumb 
        items={[
          { label: '首页', href: '/' },
          { label: '新闻资讯', href: '/news' }
        ]} 
      />

      {/* Page Header */}
      <section className="py-16 bg-gray-800 text-center">
        <div className="container mx-auto px-6">
          <h1 className="section-title">新闻资讯</h1>
          <p className="section-subtitle">公司最新动态和行业资讯</p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📰</div>
            <div className="text-xl text-gray-300 mb-2">新闻功能开发中</div>
            <div className="text-gray-400">动态内容管理功能正在完善，敬请期待</div>
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
      
      <BackToTop />
    </div>
  );
}