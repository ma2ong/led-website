'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Breadcrumb from '@/components/Breadcrumb';
import BackToTop from '@/components/BackToTop';
import { FadeInUp, FadeInLeft, FadeInRight } from '@/components/AnimatedSection';
import { FloatingLights } from '@/components/ParticleBackground';
import CompanyMap from '@/components/CompanyMap';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  
  // 表单状态管理
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    productType: '',
    message: '',
    country: '',
    budget: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // 处理表单输入
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 这里应该调用API提交表单数据
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        productType: '',
        message: '',
        country: '',
        budget: '',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
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
            <h1 className="led-title-section text-5xl mb-8">联系我们</h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              获取联系方式或在线询盘，我们的专业团队随时为您服务
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-4">
              7×24小时技术支持，全球160+国家本地化服务
            </p>
          </FadeInUp>
          
          {/* 快速联系方式 */}
          <FadeInUp delay={200}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-12">
              <a 
                href="tel:+8675582595016" 
                className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-all hover-lift"
              >
                <span className="text-xl">📞</span>
                立即致电
              </a>
              <a 
                href="mailto:bruce@lianjinled.com" 
                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all hover-lift"
              >
                <span className="text-xl">✉️</span>
                发送邮件
              </a>
              <a 
                href="#inquiry-form" 
                className="flex items-center gap-3 border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all hover-lift"
              >
                <span className="text-xl">📝</span>
                在线询盘
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Details */}
            <FadeInLeft>
              <div>
                <h2 className="text-4xl font-bold text-white mb-8 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  联系信息
                </h2>
                <p className="text-gray-300 text-lg mb-8">
                  我们的专业团队随时准备为您提供最优质的服务和技术支持
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-6 p-6 bg-gray-800 rounded-2xl hover-lift">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-2xl">📍</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">公司地址</h3>
                      <p className="text-gray-300 text-lg mb-1">深圳市宝安区石岩街道塘头第一工业区C栋</p>
                      <p className="text-gray-400">Shenzhen, Bao'an District, Shiyan Street</p>
                      <p className="text-orange-400 text-sm mt-2">50,000㎡ 现代化生产基地</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 p-6 bg-gray-800 rounded-2xl hover-lift">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-2xl">📞</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">联系电话</h3>
                      <p className="text-gray-300 text-lg mb-1">
                        <a href="tel:+8675582595016" className="hover:text-blue-400 transition-colors">
                          +86 755-8259-5016
                        </a>
                      </p>
                      <p className="text-gray-400">工作时间：周一至周五 9:00-18:00</p>
                      <p className="text-blue-400 text-sm mt-2">7×24小时紧急技术支持</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 p-6 bg-gray-800 rounded-2xl hover-lift">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-2xl">✉️</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">邮箱地址</h3>
                      <p className="text-gray-300 text-lg mb-1">
                        <a href="mailto:bruce@lianjinled.com" className="hover:text-green-400 transition-colors">
                          bruce@lianjinled.com
                        </a>
                      </p>
                      <p className="text-gray-400">销售咨询与技术支持</p>
                      <p className="text-green-400 text-sm mt-2">24小时内回复保证</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 p-6 bg-gray-800 rounded-2xl hover-lift">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-2xl">🌐</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">服务范围</h3>
                      <p className="text-gray-300 text-lg mb-1">全球160+国家和地区</p>
                      <p className="text-gray-400">提供本地化技术支持服务</p>
                      <p className="text-purple-400 text-sm mt-2">多语言技术支持团队</p>
                    </div>
                  </div>
                </div>

                {/* 社交媒体和其他联系方式 */}
                <div className="mt-12 p-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-6">其他联系方式</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <a href="#" className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                      <span className="text-xl">💬</span>
                      <div>
                        <div className="text-white font-medium">微信</div>
                        <div className="text-gray-400 text-sm">在线客服</div>
                      </div>
                    </a>
                    <a href="#" className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                      <span className="text-xl">📱</span>
                      <div>
                        <div className="text-white font-medium">WhatsApp</div>
                        <div className="text-gray-400 text-sm">国际客服</div>
                      </div>
                    </a>
                    <a href="#" className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                      <span className="text-xl">💼</span>
                      <div>
                        <div className="text-white font-medium">LinkedIn</div>
                        <div className="text-gray-400 text-sm">商务合作</div>
                      </div>
                    </a>
                    <a href="#" className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                      <span className="text-xl">📺</span>
                      <div>
                        <div className="text-white font-medium">YouTube</div>
                        <div className="text-gray-400 text-sm">产品展示</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </FadeInLeft>

            {/* Inquiry Form */}
            <FadeInRight>
              <div id="inquiry-form" className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700">
                <h2 className="text-3xl font-bold text-white mb-2">在线询盘</h2>
                <p className="text-gray-400 mb-8">填写下方表单，我们将在24小时内回复您的询盘</p>
                
                {/* 成功/错误消息 */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-900/50 border border-green-500 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-green-400 text-xl mr-3">✅</span>
                      <div>
                        <div className="text-green-300 font-semibold">提交成功！</div>
                        <div className="text-green-400 text-sm">我们将在24小时内回复您的询盘</div>
                      </div>
                    </div>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-red-400 text-xl mr-3">❌</span>
                      <div>
                        <div className="text-red-300 font-semibold">提交失败</div>
                        <div className="text-red-400 text-sm">请稍后重试或直接联系我们</div>
                      </div>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        姓名 <span className="text-orange-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="请输入您的姓名"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        公司名称
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="请输入公司名称"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        邮箱地址 <span className="text-orange-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="请输入邮箱地址"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        联系电话
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="请输入联系电话"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        产品类型
                      </label>
                      <select 
                        name="productType"
                        value={formData.productType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      >
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
                        预算范围
                      </label>
                      <select 
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      >
                        <option value="">请选择预算范围</option>
                        <option value="under-10k">$10,000以下</option>
                        <option value="10k-50k">$10,000 - $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="100k-500k">$100,000 - $500,000</option>
                        <option value="over-500k">$500,000以上</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      国家/地区
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="请输入您所在的国家或地区"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      项目需求 <span className="text-orange-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-vertical transition-colors"
                      placeholder="请详细描述您的项目需求，包括：&#10;• 显示屏尺寸和数量&#10;• 使用场景和环境&#10;• 技术要求&#10;• 预期交付时间&#10;• 其他特殊需求"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 hover-lift disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        提交中...
                      </div>
                    ) : (
                      '提交询盘'
                    )}
                  </button>

                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-2">
                      我们将在24小时内回复您的询盘
                    </p>
                    <p className="text-xs text-gray-500">
                      您的信息将被严格保密，仅用于业务沟通
                    </p>
                  </div>
                </form>
              </div>
            </FadeInRight>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <FadeInUp>
            <h2 className="led-title-section text-center mb-8">公司位置</h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
              欢迎来到我们的现代化生产基地，体验最先进的LED显示技术
            </p>
          </FadeInUp>
          <FadeInUp delay={200}>
            <CompanyMap />
          </FadeInUp>
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