'use client';

import { useState, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import Breadcrumb from '@/components/Breadcrumb';
import BackToTop from '@/components/BackToTop';
import { useLanguage } from '@/contexts/LanguageContext';
import { FadeInUp, FadeInLeft, FadeInRight, StaggeredAnimation } from '@/components/AnimatedSection';
import { StatCounter } from '@/components/CounterAnimation';
import { FloatingLights } from '@/components/ParticleBackground';
import { OptimizedImage } from '@/components/OptimizedImage';
import CaseDetailModal from '@/components/CaseDetailModal';

// 案例数据类型定义
interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  industry: string;
  location: string;
  year: number;
  image: string;
  images: string[];
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  specs: {
    name: string;
    value: string;
  }[];
  tags: string[];
  isFeatured: boolean;
  projectValue?: string;
  clientName?: string;
}

export default function CasesPage() {
  const { t } = useLanguage();
  
  // 状态管理
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 模拟案例数据
  const allCases: CaseStudy[] = [
    {
      id: '1',
      title: '深圳市政府指挥中心',
      subtitle: '智慧城市指挥调度显示系统',
      category: 'fine-pitch',
      industry: 'government',
      location: '深圳，中国',
      year: 2023,
      image: '/api/placeholder/600/400',
      images: ['/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400'],
      description: '为深圳市政府打造的大型指挥中心显示系统，采用P1.25小间距LED显示屏，实现多信号源同时显示，支持7×24小时不间断运行。',
      challenge: '需要在有限空间内实现大尺寸、高清晰度显示，同时确保系统稳定性和可维护性。',
      solution: '采用模块化设计的P1.25小间距LED显示屏，配备专业的信号处理系统和冗余备份方案。',
      results: [
        '显示面积达到200平方米',
        '支持4K超高清信号输入',
        '系统稳定运行超过8760小时',
        '获得政府部门高度认可'
      ],
      specs: [
        { name: '像素间距', value: 'P1.25' },
        { name: '显示面积', value: '200㎡' },
        { name: '分辨率', value: '4K' },
        { name: '亮度', value: '800nits' }
      ],
      tags: ['政府项目', '指挥中心', '小间距', '7×24运行'],
      isFeatured: true,
      projectValue: '$500,000+',
      clientName: '深圳市政府'
    },
    {
      id: '2',
      title: '国际体育中心',
      subtitle: '大型体育场馆LED显示系统',
      category: 'outdoor',
      industry: 'sports',
      location: '迪拜，阿联酋',
      year: 2023,
      image: '/api/placeholder/600/400',
      images: ['/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400'],
      description: '为迪拜国际体育中心提供的大型户外LED显示系统，包括主屏幕和周边显示屏，支持高清直播和广告播放。',
      challenge: '需要在强光环境下保证清晰显示，同时满足体育赛事的高刷新率要求。',
      solution: '采用高亮度P6户外LED显示屏，配备智能亮度调节系统和高刷新率驱动技术。',
      results: [
        '主屏幕面积达到500平方米',
        '亮度高达8000nits',
        '刷新率达到3840Hz',
        '成功举办多场国际赛事'
      ],
      specs: [
        { name: '像素间距', value: 'P6' },
        { name: '显示面积', value: '500㎡' },
        { name: '亮度', value: '8000nits' },
        { name: '刷新率', value: '3840Hz' }
      ],
      tags: ['体育场馆', '户外显示', '高亮度', '国际项目'],
      isFeatured: true,
      projectValue: '$1,200,000+',
      clientName: '迪拜体育局'
    },
    {
      id: '3',
      title: '时代广场商业中心',
      subtitle: '商业综合体LED广告显示系统',
      category: 'creative',
      industry: 'retail',
      location: '纽约，美国',
      year: 2022,
      image: '/api/placeholder/600/400',
      images: ['/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400'],
      description: '为纽约时代广场商业中心打造的创意LED显示系统，包括弧形屏、透明屏等多种形态。',
      challenge: '需要在复杂的建筑结构中实现创意显示效果，同时保证视觉冲击力。',
      solution: '采用定制化的创意LED显示屏，结合透明显示技术和弧形拼接工艺。',
      results: [
        '创意显示面积300平方米',
        '透明度达到85%',
        '日均观看人次超过10万',
        '成为地标性广告媒体'
      ],
      specs: [
        { name: '显示类型', value: '创意异形' },
        { name: '透明度', value: '85%' },
        { name: '显示面积', value: '300㎡' },
        { name: '像素间距', value: 'P10' }
      ],
      tags: ['创意显示', '透明屏', '商业广告', '地标项目'],
      isFeatured: true,
      projectValue: '$800,000+',
      clientName: '时代广场管理公司'
    },
    {
      id: '4',
      title: '国际会议中心',
      subtitle: '多功能会议显示解决方案',
      category: 'all-in-one',
      industry: 'conference',
      location: '新加坡',
      year: 2023,
      image: '/api/placeholder/600/400',
      images: ['/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400'],
      description: '为新加坡国际会议中心提供的智能会议显示系统，包括主会场大屏和分会场一体机。',
      challenge: '需要支持多种信号源和多语言显示，同时实现远程控制和管理。',
      solution: '采用MeeUs会议一体机和小间距LED显示屏的组合方案，配备智能控制系统。',
      results: [
        '覆盖20个会议室',
        '支持50种语言显示',
        '远程控制成功率99.9%',
        '获得国际会议组织认证'
      ],
      specs: [
        { name: '会议室数量', value: '20间' },
        { name: '主屏尺寸', value: '100㎡' },
        { name: '一体机尺寸', value: '75英寸' },
        { name: '分辨率', value: '4K' }
      ],
      tags: ['会议显示', '智能控制', '多语言', '一体机'],
      isFeatured: false,
      projectValue: '$600,000+',
      clientName: '新加坡会展局'
    },
    {
      id: '5',
      title: '购物中心数字标牌',
      subtitle: '零售连锁LED广告机部署',
      category: 'poster',
      industry: 'retail',
      location: '伦敦，英国',
      year: 2022,
      image: '/api/placeholder/600/400',
      images: ['/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400'],
      description: '为伦敦大型购物中心部署的LED广告机网络，实现统一内容管理和精准广告投放。',
      challenge: '需要在多个位置部署大量设备，同时实现内容的统一管理和更新。',
      solution: '采用G-T4系列LED广告机，配备云端内容管理系统和远程监控功能。',
      results: [
        '部署200台LED广告机',
        '覆盖50个商铺位置',
        '广告点击率提升300%',
        '运营成本降低40%'
      ],
      specs: [
        { name: '设备数量', value: '200台' },
        { name: '屏幕尺寸', value: '43英寸' },
        { name: '像素间距', value: 'P2.5' },
        { name: '亮度', value: '2000nits' }
      ],
      tags: ['数字标牌', '连锁部署', '内容管理', '零售'],
      isFeatured: false,
      projectValue: '$300,000+',
      clientName: '伦敦购物中心集团'
    },
    {
      id: '6',
      title: '音乐节舞台显示',
      subtitle: '大型演出租赁LED显示系统',
      category: 'rental',
      industry: 'entertainment',
      location: '洛杉矶，美国',
      year: 2023,
      image: '/api/placeholder/600/400',
      images: ['/api/placeholder/600/400', '/api/placeholder/600/400', '/api/placeholder/600/400'],
      description: '为洛杉矶国际音乐节提供的大型舞台LED显示系统，支持快速搭建和拆卸。',
      challenge: '需要在短时间内完成大面积显示屏的搭建，同时保证演出期间的稳定性。',
      solution: '采用R3系列租赁显示屏，配备快速锁扣系统和专业的现场技术支持。',
      results: [
        '主舞台屏幕800平方米',
        '搭建时间仅需8小时',
        '连续演出72小时无故障',
        '观众满意度达到98%'
      ],
      specs: [
        { name: '像素间距', value: 'P3.91' },
        { name: '显示面积', value: '800㎡' },
        { name: '重量', value: '7.5kg/㎡' },
        { name: '亮度', value: '5000nits' }
      ],
      tags: ['舞台演出', '租赁屏', '快速搭建', '音乐节'],
      isFeatured: false,
      projectValue: '$400,000+',
      clientName: '洛杉矶音乐节组委会'
    }
  ];
  
  // 筛选选项
  const categories = [
    { value: 'all', label: '全部类型' },
    { value: 'fine-pitch', label: '小间距显示屏' },
    { value: 'outdoor', label: '户外显示屏' },
    { value: 'rental', label: '租赁显示屏' },
    { value: 'creative', label: '创意显示屏' },
    { value: 'all-in-one', label: '会议一体机' },
    { value: 'poster', label: 'LED广告机' }
  ];
  
  const industries = [
    { value: 'all', label: '全部行业' },
    { value: 'government', label: '政府机构' },
    { value: 'sports', label: '体育场馆' },
    { value: 'retail', label: '商业零售' },
    { value: 'conference', label: '会议展览' },
    { value: 'entertainment', label: '文化娱乐' },
    { value: 'media', label: '广电传媒' }
  ];
  
  // 筛选案例
  const filteredCases = useMemo(() => {
    return allCases.filter(caseItem => {
      const categoryMatch = selectedCategory === 'all' || caseItem.category === selectedCategory;
      const industryMatch = selectedIndustry === 'all' || caseItem.industry === selectedIndustry;
      return categoryMatch && industryMatch;
    });
  }, [allCases, selectedCategory, selectedIndustry]);
  
  // 精选案例
  const featuredCases = allCases.filter(caseItem => caseItem.isFeatured);
  
  // 打开案例详情
  const openCaseModal = (caseItem: CaseStudy) => {
    setSelectedCase(caseItem);
    setIsModalOpen(true);
  };

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
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-center relative overflow-hidden">
        <FloatingLights />
        <div className="container mx-auto px-6 relative z-10">
          <FadeInUp>
            <h1 className="led-title-section text-5xl mb-8">成功案例</h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              遍布全球的卓越项目，见证联锦光电的专业实力
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-4">
              1000+成功项目，160+服务国家，50+行业领域的丰富经验
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* 精选案例 */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <FadeInUp>
            <h2 className="led-title-section text-center mb-16">精选案例</h2>
          </FadeInUp>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {featuredCases.map((caseItem, index) => (
              <FadeInUp key={caseItem.id} delay={index * 100}>
                <div className="led-card overflow-hidden hover-lift cursor-pointer" onClick={() => openCaseModal(caseItem)}>
                  <div className="relative h-64 overflow-hidden">
                    <OptimizedImage
                      src={caseItem.image}
                      alt={caseItem.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="led-badge bg-orange-500 text-white">精选</span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-white">
                        <div className="text-sm opacity-80">{caseItem.location} • {caseItem.year}</div>
                        <div className="text-lg font-bold">{caseItem.title}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="led-badge-outline text-xs">{categories.find(c => c.value === caseItem.category)?.label}</span>
                      <span className="led-badge-outline text-xs">{industries.find(i => i.value === caseItem.industry)?.label}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {caseItem.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-orange-400 font-semibold">
                        {caseItem.projectValue}
                      </div>
                      <button className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                        查看详情 →
                      </button>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* 案例筛选和展示 */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <FadeInUp>
            <h2 className="led-title-section text-center mb-16">全部案例</h2>
          </FadeInUp>
          
          {/* 筛选器 */}
          <FadeInUp delay={200}>
            <div className="flex flex-col lg:flex-row gap-6 mb-12">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">产品类型</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">应用行业</label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                >
                  {industries.map(industry => (
                    <option key={industry.value} value={industry.value}>
                      {industry.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedIndustry('all');
                  }}
                  className="btn-led-outline px-6 py-3 whitespace-nowrap"
                >
                  重置筛选
                </button>
              </div>
            </div>
          </FadeInUp>
          
          {/* 案例网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCases.map((caseItem, index) => (
              <FadeInUp key={caseItem.id} delay={index * 50}>
                <div className="led-card overflow-hidden hover-lift cursor-pointer group" onClick={() => openCaseModal(caseItem)}>
                  <div className="relative h-48 overflow-hidden">
                    <OptimizedImage
                      src={caseItem.image}
                      alt={caseItem.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {caseItem.isFeatured && (
                      <div className="absolute top-4 left-4">
                        <span className="led-badge bg-orange-500 text-white">精选</span>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-white">
                        <div className="text-xs opacity-80">{caseItem.location} • {caseItem.year}</div>
                        <div className="font-bold">{caseItem.title}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {caseItem.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span key={tagIndex} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {caseItem.subtitle}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-orange-400 text-sm font-semibold">
                        {caseItem.projectValue}
                      </div>
                      <button className="text-orange-400 hover:text-orange-300 text-sm font-medium group-hover:translate-x-1 transition-transform">
                        查看详情 →
                      </button>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
          
          {filteredCases.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">未找到匹配的案例</h3>
              <p className="text-gray-400">请尝试调整筛选条件</p>
            </div>
          )}
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-blue-500 to-purple-500"></div>
        <div className="container mx-auto px-6 relative z-10">
          <FadeInUp>
            <h2 className="led-title-section text-center mb-16">全球项目分布</h2>
          </FadeInUp>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCounter
              value={1000}
              label="成功项目"
              suffix="+"
              icon={<span className="text-orange-400">🏆</span>}
              className="hover-lift"
            />
            <StatCounter
              value={160}
              label="服务国家"
              suffix="+"
              icon={<span className="text-blue-400">🌍</span>}
              className="hover-lift"
            />
            <StatCounter
              value={50}
              label="行业领域"
              suffix="+"
              icon={<span className="text-green-400">🏢</span>}
              className="hover-lift"
            />
            <StatCounter
              value={99}
              label="客户满意度"
              suffix="%"
              icon={<span className="text-purple-400">😊</span>}
              className="hover-lift"
            />
          </div>
          
          {/* 地区分布 */}
          <FadeInUp delay={500}>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-700/50 rounded-lg backdrop-blur-sm">
                <div className="text-3xl mb-3">🌏</div>
                <h3 className="text-xl font-bold text-white mb-2">亚太地区</h3>
                <p className="text-gray-300 text-sm mb-3">中国、日本、韩国、新加坡、澳大利亚等</p>
                <div className="text-orange-400 font-bold">400+ 项目</div>
              </div>
              <div className="text-center p-6 bg-gray-700/50 rounded-lg backdrop-blur-sm">
                <div className="text-3xl mb-3">🌍</div>
                <h3 className="text-xl font-bold text-white mb-2">欧美地区</h3>
                <p className="text-gray-300 text-sm mb-3">美国、英国、德国、法国、加拿大等</p>
                <div className="text-blue-400 font-bold">350+ 项目</div>
              </div>
              <div className="text-center p-6 bg-gray-700/50 rounded-lg backdrop-blur-sm">
                <div className="text-3xl mb-3">🌍</div>
                <h3 className="text-xl font-bold text-white mb-2">其他地区</h3>
                <p className="text-gray-300 text-sm mb-3">中东、非洲、南美洲等新兴市场</p>
                <div className="text-green-400 font-bold">250+ 项目</div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Industry Applications */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <FadeInUp>
            <h2 className="led-title-section text-center mb-16">行业应用</h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
              我们的LED显示解决方案广泛应用于各个行业，为不同领域的客户提供专业服务
            </p>
          </FadeInUp>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <FadeInUp delay={100}>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform hover-glow">
                  <span className="text-white text-3xl">🏛️</span>
                </div>
                <div className="text-white font-semibold mb-1">政府机构</div>
                <div className="text-gray-400 text-sm">指挥中心、会议室</div>
              </div>
            </FadeInUp>

            <FadeInUp delay={200}>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform hover-glow">
                  <span className="text-white text-3xl">🏢</span>
                </div>
                <div className="text-white font-semibold mb-1">企业办公</div>
                <div className="text-gray-400 text-sm">会议室、展厅</div>
              </div>
            </FadeInUp>

            <FadeInUp delay={300}>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform hover-glow">
                  <span className="text-white text-3xl">📺</span>
                </div>
                <div className="text-white font-semibold mb-1">广电传媒</div>
                <div className="text-gray-400 text-sm">演播室、直播间</div>
              </div>
            </FadeInUp>

            <FadeInUp delay={400}>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform hover-glow">
                  <span className="text-white text-3xl">🏟️</span>
                </div>
                <div className="text-white font-semibold mb-1">体育场馆</div>
                <div className="text-gray-400 text-sm">体育场、健身房</div>
              </div>
            </FadeInUp>

            <FadeInUp delay={500}>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform hover-glow">
                  <span className="text-white text-3xl">🛍️</span>
                </div>
                <div className="text-white font-semibold mb-1">商业零售</div>
                <div className="text-gray-400 text-sm">购物中心、店铺</div>
              </div>
            </FadeInUp>

            <FadeInUp delay={600}>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform hover-glow">
                  <span className="text-white text-3xl">🎭</span>
                </div>
                <div className="text-white font-semibold mb-1">文化娱乐</div>
                <div className="text-gray-400 text-sm">剧院、音乐厅</div>
              </div>
            </FadeInUp>
          </div>
          
          {/* 行业案例统计 */}
          <FadeInUp delay={700}>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-blue-400 mb-1">200+</div>
                <div className="text-gray-300 text-sm">政府项目</div>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-green-400 mb-1">180+</div>
                <div className="text-gray-300 text-sm">企业项目</div>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-purple-400 mb-1">150+</div>
                <div className="text-gray-300 text-sm">传媒项目</div>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-red-400 mb-1">120+</div>
                <div className="text-gray-300 text-sm">体育项目</div>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400 mb-1">200+</div>
                <div className="text-gray-300 text-sm">零售项目</div>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-pink-400 mb-1">150+</div>
                <div className="text-gray-300 text-sm">娱乐项目</div>
              </div>
            </div>
          </FadeInUp>
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
      
      {/* 案例详情模态框 */}
      <CaseDetailModal
        caseStudy={selectedCase}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCase(null);
        }}
      />
      
      <BackToTop />
    </div>
  );
}