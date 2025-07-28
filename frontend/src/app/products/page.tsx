'use client';

import { useState, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import Breadcrumb from '@/components/Breadcrumb';
import BackToTop from '@/components/BackToTop';
import { useLanguage } from '@/contexts/LanguageContext';
import ProductFilters, { ProductFilters as FilterType, MobileFilterDrawer } from '@/components/ProductFilters';
import { ProductGrid, Product } from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { FadeInUp, FadeInRight } from '@/components/AnimatedSection';
import { FloatingLights } from '@/components/ParticleBackground';

export default function ProductsPage() {
  const { t } = useLanguage();
  
  // 状态管理
  const [filters, setFilters] = useState<FilterType>({
    search: '',
    category: '',
    application: '',
    priceRange: '',
    inStock: false,
    sortBy: 'name',
  });
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // 模拟产品数据（实际应用中从API获取）
  const allProducts: Product[] = [
    {
      id: '1',
      name: 'X3-SMD P1.25 小间距显示屏',
      category: 'fine-pitch',
      description: '高清小间距LED显示屏，适用于控制室、会议室等室内精密显示应用',
      image: '/api/placeholder/400/300',
      specs: [
        { name: '像素间距', value: '1.25', unit: 'mm' },
        { name: '亮度', value: '800', unit: 'nits' },
        { name: '刷新率', value: '3840', unit: 'Hz' },
        { name: '视角', value: '160', unit: '°' },
      ],
      applications: ['控制室', '会议室', '展示厅', '监控中心'],
      features: ['超高清显示', '低功耗设计', '无缝拼接', '前维护'],
      price: { min: 2500, max: 3500, currency: 'USD' },
      inStock: true,
      isNew: true,
      isFeatured: true,
    },
    {
      id: '2',
      name: 'R3 租赁显示屏',
      category: 'rental',
      description: '轻便易装的租赁LED显示屏，专为舞台演出和活动展示设计',
      image: '/api/placeholder/400/300',
      specs: [
        { name: '像素间距', value: '3.91', unit: 'mm' },
        { name: '亮度', value: '5000', unit: 'nits' },
        { name: '重量', value: '7.5', unit: 'kg/㎡' },
        { name: '厚度', value: '75', unit: 'mm' },
      ],
      applications: ['舞台演出', '活动展示', '临时安装', '巡回演出'],
      features: ['快速安装', '轻量化设计', '高刷新率', '防水防尘'],
      price: { min: 1800, max: 2800, currency: 'USD' },
      inStock: true,
      isFeatured: true,
    },
    {
      id: '3',
      name: 'ES-P6 户外显示屏',
      category: 'outdoor',
      description: '高亮度户外LED显示屏，适用于户外广告和大型场馆显示',
      image: '/api/placeholder/400/300',
      specs: [
        { name: '像素间距', value: '6', unit: 'mm' },
        { name: '亮度', value: '8000', unit: 'nits' },
        { name: '防护等级', value: 'IP65', unit: '' },
        { name: '工作温度', value: '-20~60', unit: '℃' },
      ],
      applications: ['户外广告', '体育场馆', '交通显示', '建筑媒体'],
      features: ['超高亮度', '全天候防护', '节能设计', '远程监控'],
      price: { min: 1200, max: 2000, currency: 'USD' },
      inStock: true,
    },
    {
      id: '4',
      name: '透明LED显示屏',
      category: 'creative',
      description: '创新透明LED显示技术，打造独特的视觉体验',
      image: '/api/placeholder/400/300',
      specs: [
        { name: '透明度', value: '85', unit: '%' },
        { name: '像素间距', value: '10', unit: 'mm' },
        { name: '亮度', value: '4000', unit: 'nits' },
        { name: '厚度', value: '12', unit: 'mm' },
      ],
      applications: ['玻璃幕墙', '商业展示', '艺术装置', '建筑媒体'],
      features: ['高透明度', '超薄设计', '创意显示', '节能环保'],
      price: { min: 3000, max: 5000, currency: 'USD' },
      inStock: false,
      isNew: true,
    },
    {
      id: '5',
      name: 'MeeUs 会议一体机',
      category: 'all-in-one',
      description: '智能会议显示一体机，集成触控、投屏等多种功能',
      image: '/api/placeholder/400/300',
      specs: [
        { name: '屏幕尺寸', value: '75', unit: '英寸' },
        { name: '分辨率', value: '4K', unit: '' },
        { name: '触控点数', value: '20', unit: '点' },
        { name: '响应时间', value: '8', unit: 'ms' },
      ],
      applications: ['会议室', '教育培训', '协作办公', '远程会议'],
      features: ['多点触控', '无线投屏', '智能系统', '一体化设计'],
      price: { min: 4000, max: 6000, currency: 'USD' },
      inStock: true,
    },
    {
      id: '6',
      name: 'G-T4 LED广告机',
      category: 'poster',
      description: '便携式LED广告海报，适用于零售和商业展示',
      image: '/api/placeholder/400/300',
      specs: [
        { name: '屏幕尺寸', value: '43', unit: '英寸' },
        { name: '像素间距', value: '2.5', unit: 'mm' },
        { name: '亮度', value: '2000', unit: 'nits' },
        { name: '厚度', value: '65', unit: 'mm' },
      ],
      applications: ['零售店铺', '餐饮连锁', '展览展示', '机场车站'],
      features: ['便携设计', '远程管理', '高清显示', '节能省电'],
      price: { min: 800, max: 1500, currency: 'USD' },
      inStock: true,
    },
  ];
  
  // 筛选选项
  const filterOptions = {
    categories: [
      { value: 'fine-pitch', label: '小间距显示屏', count: 1 },
      { value: 'rental', label: '租赁显示屏', count: 1 },
      { value: 'outdoor', label: '户外显示屏', count: 1 },
      { value: 'creative', label: '创意显示屏', count: 1 },
      { value: 'all-in-one', label: '会议一体机', count: 1 },
      { value: 'poster', label: 'LED广告机', count: 1 },
    ],
    applications: [
      { value: '控制室', label: '控制室' },
      { value: '会议室', label: '会议室' },
      { value: '舞台演出', label: '舞台演出' },
      { value: '户外广告', label: '户外广告' },
      { value: '商业展示', label: '商业展示' },
    ],
    priceRanges: [
      { value: '0-1000', label: '$0 - $1,000' },
      { value: '1000-3000', label: '$1,000 - $3,000' },
      { value: '3000-5000', label: '$3,000 - $5,000' },
      { value: '5000+', label: '$5,000+' },
    ],
  };
  
  // 筛选和排序产品
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      // 搜索筛选
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (!product.name.toLowerCase().includes(searchLower) &&
            !product.description.toLowerCase().includes(searchLower)) {
          return false;
        }
      }
      
      // 分类筛选
      if (filters.category && product.category !== filters.category) {
        return false;
      }
      
      // 应用场景筛选
      if (filters.application && !product.applications.includes(filters.application)) {
        return false;
      }
      
      // 价格范围筛选
      if (filters.priceRange && product.price) {
        const [min, max] = filters.priceRange.split('-').map(p => p.replace('+', ''));
        const productMin = product.price.min;
        if (max) {
          if (productMin < parseInt(min) || productMin > parseInt(max)) {
            return false;
          }
        } else {
          if (productMin < parseInt(min)) {
            return false;
          }
        }
      }
      
      // 库存筛选
      if (filters.inStock && !product.inStock) {
        return false;
      }
      
      return true;
    });
    
    // 排序
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return (a.price?.min || 0) - (b.price?.min || 0);
        case 'price-high':
          return (b.price?.min || 0) - (a.price?.min || 0);
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'popular':
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });
    
    return filtered;
  }, [allProducts, filters]);
  
  // 处理产品详情查看
  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  // 处理询价请求
  const handleRequestQuote = (product: Product) => {
    // 这里可以打开询价表单或跳转到联系页面
    console.log('Request quote for:', product.name);
    // 实际应用中可能会打开一个询价模态框或跳转页面
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
            <h1 className="led-title-section text-5xl mb-8">{t('products.title')}</h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t('products.subtitle')}
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-4">
              {t('products.description')}
            </p>
          </FadeInUp>
          
          {/* 产品统计 */}
          <FadeInUp delay={200}>
            <div className="flex justify-center items-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">{allProducts.length}+</div>
                <div className="text-sm text-gray-400">产品型号</div>
              </div>
              <div className="w-px h-12 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">6</div>
                <div className="text-sm text-gray-400">产品系列</div>
              </div>
              <div className="w-px h-12 bg-gray-600"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">160+</div>
                <div className="text-sm text-gray-400">服务国家</div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* 产品筛选和展示 */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 左侧筛选器 - 桌面端 */}
            <div className="hidden lg:block lg:w-80 flex-shrink-0">
              <ProductFilters
                categories={filterOptions.categories}
                applications={filterOptions.applications}
                priceRanges={filterOptions.priceRanges}
                onFiltersChange={setFilters}
              />
            </div>
            
            {/* 右侧产品列表 */}
            <div className="flex-1">
              {/* 移动端筛选按钮和结果统计 */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden btn-led-outline px-4 py-2 text-sm"
                  >
                    <span className="mr-2">🔍</span>
                    筛选
                  </button>
                  <div className="text-gray-300">
                    找到 <span className="font-bold text-orange-400">{filteredProducts.length}</span> 个产品
                  </div>
                </div>
                
                {/* 视图切换（可选功能） */}
                <div className="hidden sm:flex items-center gap-2">
                  <button className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors">
                    <span className="text-orange-400">⊞</span>
                  </button>
                  <button className="p-2 bg-gray-800 rounded hover:bg-gray-600 transition-colors">
                    <span className="text-gray-400">☰</span>
                  </button>
                </div>
              </div>
              
              {/* 产品网格 */}
              <ProductGrid
                products={filteredProducts}
                onViewDetails={handleViewDetails}
                onRequestQuote={handleRequestQuote}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 移动端筛选抽屉 */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
      >
        <ProductFilters
          categories={filterOptions.categories}
          applications={filterOptions.applications}
          priceRanges={filterOptions.priceRanges}
          onFiltersChange={(newFilters) => {
            setFilters(newFilters);
            setIsMobileFilterOpen(false);
          }}
        />
      </MobileFilterDrawer>

      {/* 产品详情模态框 */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRequestQuote={handleRequestQuote}
      />

      {/* 旧的产品分类展示 - 保留作为参考 */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <FadeInUp>
            <h2 className="led-title-section text-center mb-16">产品系列</h2>
          </FadeInUp>
          <div className="led-grid-3">
            
            {/* Fine Pitch LED */}
            <article className="led-card animate-fade-in-up">
              <div className="h-64 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="text-white text-center relative z-10">
                  <div className="text-7xl mb-4 filter drop-shadow-lg">📺</div>
                  <div className="text-2xl font-bold mb-2">小间距LED显示屏</div>
                  <div className="led-badge">P0.9-P1.87</div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">{t('products.finePitch.title')}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {t('products.finePitch.description')}
                </p>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">主要系列：</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <span className="text-gray-300">X3-SMD系列</span>
                      <span className="led-badge-outline text-xs">高清</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <span className="text-gray-300">X3-COB系列</span>
                      <span className="led-badge-outline text-xs">超清</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <span className="text-gray-300">Mi-Pro系列</span>
                      <span className="led-badge-outline text-xs">专业</span>
                    </div>
                  </div>
                </div>
                <a href="/contact" className="btn-led-secondary w-full text-center">
                  {t('products.getSpecs')}
                </a>
              </div>
            </article>

            {/* Rental LED */}
            <article className="product-card">
              <div className="h-64 bg-gradient-to-br from-purple-700 to-purple-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">🎭</div>
                  <div className="text-2xl font-bold">租赁LED显示屏</div>
                  <div className="text-sm mt-2 opacity-80">Rental LED Display</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">租赁显示屏系列</h3>
                <p className="text-gray-400 mb-4">
                  轻便易装，高刷新率，专为舞台活动、展览展示、演出租赁等应用设计，支持快速安装拆卸。
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">主要系列：</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• R3系列</li>
                    <li>• R系列标准版</li>
                    <li>• XR虚拟制作系列</li>
                  </ul>
                </div>
                <a href="#" className="text-orange-500 hover:text-orange-400 font-medium">
                  查看详细规格 →
                </a>
              </div>
            </article>

            {/* Outdoor LED */}
            <article className="product-card">
              <div className="h-64 bg-gradient-to-br from-green-700 to-green-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">🏢</div>
                  <div className="text-2xl font-bold">户外LED显示屏</div>
                  <div className="text-sm mt-2 opacity-80">Outdoor LED Display</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">户外显示屏系列</h3>
                <p className="text-gray-400 mb-4">
                  高亮防水，稳定耐用，适用于户外广告、体育场馆、交通显示等应用，支持高达8000nits亮度。
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">主要系列：</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• ES节能系列</li>
                    <li>• Ti节能系列</li>
                    <li>• 标准户外系列</li>
                  </ul>
                </div>
                <a href="#" className="text-orange-500 hover:text-orange-400 font-medium">
                  查看详细规格 →
                </a>
              </div>
            </article>

            {/* Creative LED */}
            <article className="product-card">
              <div className="h-64 bg-gradient-to-br from-pink-700 to-pink-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">✨</div>
                  <div className="text-2xl font-bold">创意LED显示屏</div>
                  <div className="text-sm mt-2 opacity-80">Creative LED Display</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">创意显示屏系列</h3>
                <p className="text-gray-400 mb-4">
                  透明屏、柔性屏等创新产品，打破常规显示形态，创造无限视觉可能，适用于建筑媒体、艺术装置。
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">主要类型：</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• 透明LED显示屏</li>
                    <li>• 柔性LED显示屏</li>
                    <li>• 异形LED显示屏</li>
                  </ul>
                </div>
                <a href="#" className="text-orange-500 hover:text-orange-400 font-medium">
                  查看详细规格 →
                </a>
              </div>
            </article>

            {/* All-in-One Display */}
            <article className="product-card">
              <div className="h-64 bg-gradient-to-br from-teal-700 to-teal-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">💼</div>
                  <div className="text-2xl font-bold">会议一体机</div>
                  <div className="text-sm mt-2 opacity-80">All-in-One Display</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">会议一体机系列</h3>
                <p className="text-gray-400 mb-4">
                  集成式智能会议显示解决方案，支持触控交互、无线投屏等功能，专为现代会议室设计。
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">主要系列：</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• MeeUs一体机系列</li>
                    <li>• 触控交互功能</li>
                    <li>• 无线投屏支持</li>
                  </ul>
                </div>
                <a href="#" className="text-orange-500 hover:text-orange-400 font-medium">
                  查看详细规格 →
                </a>
              </div>
            </article>

            {/* Poster LED */}
            <article className="product-card">
              <div className="h-64 bg-gradient-to-br from-red-700 to-red-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">📱</div>
                  <div className="text-2xl font-bold">LED广告机</div>
                  <div className="text-sm mt-2 opacity-80">Poster LED Display</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">LED广告机系列</h3>
                <p className="text-gray-400 mb-4">
                  便携式数字LED广告海报，超薄设计，支持远程内容管理，适用于零售、餐饮等商业环境。
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">主要系列：</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• G-T4系列</li>
                    <li>• G-X4系列</li>
                    <li>• G-T5系列</li>
                  </ul>
                </div>
                <a href="#" className="text-orange-500 hover:text-orange-400 font-medium">
                  查看详细规格 →
                </a>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* 技术规格对比 */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <FadeInUp>
            <h2 className="led-title-section text-center mb-16">技术规格对比</h2>
          </FadeInUp>
          <FadeInUp delay={200}>
            <div className="overflow-x-auto">
              <table className="w-full bg-gray-700 rounded-lg overflow-hidden shadow-2xl">
                <thead className="bg-gradient-to-r from-orange-600 to-orange-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-semibold">产品系列</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">像素间距</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">亮度</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">应用场景</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">价格范围</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-600 hover:bg-gray-600 transition-colors">
                    <td className="px-6 py-4 font-medium text-blue-300">小间距显示屏</td>
                    <td className="px-6 py-4">P0.9-P1.87</td>
                    <td className="px-6 py-4">800-1200 nits</td>
                    <td className="px-6 py-4">控制室、会议室</td>
                    <td className="px-6 py-4 text-orange-400">$2,500-$3,500</td>
                  </tr>
                  <tr className="border-b border-gray-600 hover:bg-gray-600 transition-colors">
                    <td className="px-6 py-4 font-medium text-purple-300">租赁显示屏</td>
                    <td className="px-6 py-4">P2.6-P4.8</td>
                    <td className="px-6 py-4">4000-6000 nits</td>
                    <td className="px-6 py-4">舞台、活动</td>
                    <td className="px-6 py-4 text-orange-400">$1,800-$2,800</td>
                  </tr>
                  <tr className="border-b border-gray-600 hover:bg-gray-600 transition-colors">
                    <td className="px-6 py-4 font-medium text-green-300">户外显示屏</td>
                    <td className="px-6 py-4">P4-P10</td>
                    <td className="px-6 py-4">5000-8000 nits</td>
                    <td className="px-6 py-4">户外广告、体育场</td>
                    <td className="px-6 py-4 text-orange-400">$1,200-$2,000</td>
                  </tr>
                  <tr className="border-b border-gray-600 hover:bg-gray-600 transition-colors">
                    <td className="px-6 py-4 font-medium text-pink-300">创意显示屏</td>
                    <td className="px-6 py-4">定制</td>
                    <td className="px-6 py-4">1000-4000 nits</td>
                    <td className="px-6 py-4">建筑媒体、艺术</td>
                    <td className="px-6 py-4 text-orange-400">$3,000-$5,000</td>
                  </tr>
                  <tr className="border-b border-gray-600 hover:bg-gray-600 transition-colors">
                    <td className="px-6 py-4 font-medium text-teal-300">会议一体机</td>
                    <td className="px-6 py-4">4K分辨率</td>
                    <td className="px-6 py-4">400-600 nits</td>
                    <td className="px-6 py-4">会议室、教育</td>
                    <td className="px-6 py-4 text-orange-400">$4,000-$6,000</td>
                  </tr>
                  <tr className="hover:bg-gray-600 transition-colors">
                    <td className="px-6 py-4 font-medium text-red-300">LED广告机</td>
                    <td className="px-6 py-4">P2.5</td>
                    <td className="px-6 py-4">2000 nits</td>
                    <td className="px-6 py-4">零售、展示</td>
                    <td className="px-6 py-4 text-orange-400">$800-$1,500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* 服务优势 */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-700">
        <div className="container mx-auto px-6">
          <FadeInUp>
            <h2 className="led-title-section text-center mb-16">为什么选择我们</h2>
          </FadeInUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FadeInUp delay={100}>
              <div className="text-center p-6 bg-gray-700 rounded-lg hover-lift">
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-white mb-3">17年经验</h3>
                <p className="text-gray-300 text-sm">专业LED显示屏制造经验，技术成熟可靠</p>
              </div>
            </FadeInUp>
            <FadeInUp delay={200}>
              <div className="text-center p-6 bg-gray-700 rounded-lg hover-lift">
                <div className="text-5xl mb-4">🌍</div>
                <h3 className="text-xl font-bold text-white mb-3">全球服务</h3>
                <p className="text-gray-300 text-sm">产品销往160+国家，全球化服务网络</p>
              </div>
            </FadeInUp>
            <FadeInUp delay={300}>
              <div className="text-center p-6 bg-gray-700 rounded-lg hover-lift">
                <div className="text-5xl mb-4">🔧</div>
                <h3 className="text-xl font-bold text-white mb-3">技术支持</h3>
                <p className="text-gray-300 text-sm">7×24小时技术支持，专业工程师服务</p>
              </div>
            </FadeInUp>
            <FadeInUp delay={400}>
              <div className="text-center p-6 bg-gray-700 rounded-lg hover-lift">
                <div className="text-5xl mb-4">🛡️</div>
                <h3 className="text-xl font-bold text-white mb-3">品质保证</h3>
                <p className="text-gray-300 text-sm">2年质保服务，终身技术支持维护</p>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* 联系咨询 */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <FadeInUp>
            <h2 className="text-4xl font-bold mb-4">需要产品咨询？</h2>
            <p className="text-xl mb-8 text-orange-100 max-w-2xl mx-auto">
              我们的技术专家将为您推荐最适合的LED显示解决方案
            </p>
          </FadeInUp>
          <FadeInUp delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-white text-orange-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all hover-lift">
                获取产品报价
              </a>
              <a href="tel:+8675582595016" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-orange-700 transition-all hover-lift">
                致电咨询
              </a>
            </div>
          </FadeInUp>
          
          {/* 联系信息 */}
          <FadeInUp delay={400}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-12 text-orange-100">
              <div className="flex items-center">
                <span className="text-2xl mr-3">📞</span>
                <div>
                  <div className="font-semibold">销售热线</div>
                  <div className="text-sm">+86 755-8259-5016</div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">✉️</span>
                <div>
                  <div className="font-semibold">邮箱咨询</div>
                  <div className="text-sm">bruce@lianjinled.com</div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">💬</span>
                <div>
                  <div className="font-semibold">在线客服</div>
                  <div className="text-sm">24小时在线</div>
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
            <FadeInUp>
              <div>
                <div className="text-2xl font-bold text-white mb-4">
                  RGBSHARE <span className="text-orange-500">联锦</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  深圳联锦光电有限公司，专业LED显示屏制造商，为全球客户提供高品质的显示解决方案。
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                    <span className="text-xl">📘</span>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                    <span className="text-xl">🐦</span>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                    <span className="text-xl">📺</span>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                    <span className="text-xl">💼</span>
                  </a>
                </div>
              </div>
            </FadeInUp>
            <FadeInUp delay={100}>
              <div>
                <h4 className="font-bold text-lg mb-4">产品系列</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-orange-400 transition-colors">小间距显示屏</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition-colors">租赁显示屏</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition-colors">户外显示屏</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition-colors">创意显示屏</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition-colors">会议一体机</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition-colors">LED广告机</a></li>
                </ul>
              </div>
            </FadeInUp>
            <FadeInUp delay={200}>
              <div>
                <h4 className="font-bold text-lg mb-4">技术支持</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-orange-400 transition-colors">产品手册下载</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition-colors">安装指南</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition-colors">维护保养</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition-colors">常见问题</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition-colors">技术培训</a></li>
                  <li><a href="#" className="hover:text-orange-400 transition-colors">在线支持</a></li>
                </ul>
              </div>
            </FadeInUp>
            <FadeInUp delay={300}>
              <div>
                <h4 className="font-bold text-lg mb-4">联系方式</h4>
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-center hover:text-orange-400 transition-colors">
                    <span className="mr-3 text-lg">📞</span>
                    <div>
                      <div>销售热线</div>
                      <div className="text-white">+86 755-8259-5016</div>
                    </div>
                  </div>
                  <div className="flex items-center hover:text-orange-400 transition-colors">
                    <span className="mr-3 text-lg">✉️</span>
                    <div>
                      <div>邮箱</div>
                      <div className="text-white">bruce@lianjinled.com</div>
                    </div>
                  </div>
                  <div className="flex items-center hover:text-orange-400 transition-colors">
                    <span className="mr-3 text-lg">📍</span>
                    <div>
                      <div>地址</div>
                      <div className="text-white">深圳市宝安区</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400 mb-4 md:mb-0">
                © 2024 深圳联锦光电有限公司 版权所有
              </p>
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-orange-400 transition-colors">隐私政策</a>
                <a href="#" className="hover:text-orange-400 transition-colors">服务条款</a>
                <a href="#" className="hover:text-orange-400 transition-colors">网站地图</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}