'use client';

import { useState, useEffect } from 'react';
import { OptimizedImage } from '@/components/OptimizedImage';
import { Product } from '@/components/ProductCard';
import { AnimatedProgressBar } from '@/components/CounterAnimation';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestQuote: (product: Product) => void;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
  onRequestQuote,
}: ProductModalProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 模拟产品图片数组（实际应用中从产品数据获取）
  const productImages = product ? [
    product.image,
    product.image, // 这里应该是不同角度的图片
    product.image,
  ] : [];

  // 关闭模态框时重置状态
  useEffect(() => {
    if (!isOpen) {
      setActiveTab('overview');
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  // 处理键盘事件
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const tabs = [
    { id: 'overview', label: '产品概述', icon: '📋' },
    { id: 'specs', label: '技术规格', icon: '⚙️' },
    { id: 'applications', label: '应用场景', icon: '🎯' },
    { id: 'support', label: '技术支持', icon: '🛠️' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 模态框内容 */}
      <div className="relative bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-colors"
        >
          ✕
        </button>

        <div className="flex flex-col lg:flex-row h-full">
          {/* 左侧：产品图片 */}
          <div className="lg:w-1/2 bg-gray-900 relative">
            <div className="aspect-square relative">
              <OptimizedImage
                src={productImages[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
              />
              
              {/* 图片导航 */}
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(
                      currentImageIndex > 0 ? currentImageIndex - 1 : productImages.length - 1
                    )}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full flex items-center justify-center text-white transition-all"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(
                      currentImageIndex < productImages.length - 1 ? currentImageIndex + 1 : 0
                    )}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full flex items-center justify-center text-white transition-all"
                  >
                    →
                  </button>
                </>
              )}
            </div>

            {/* 缩略图 */}
            {productImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-orange-500'
                        : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* 产品徽章 */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <span className="led-badge bg-orange-500 text-white">新品</span>
              )}
              {product.isFeatured && (
                <span className="led-badge bg-yellow-500 text-black">推荐</span>
              )}
              {!product.inStock && (
                <span className="led-badge bg-red-500 text-white">缺货</span>
              )}
            </div>
          </div>

          {/* 右侧：产品信息 */}
          <div className="lg:w-1/2 flex flex-col">
            {/* 产品标题和价格 */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {product.name}
                  </h2>
                  <p className="text-gray-400">
                    分类: {product.category} | 库存: {product.inStock ? '有货' : '缺货'}
                  </p>
                </div>
                {product.price && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-400">
                      ${product.price.min} - ${product.price.max}
                    </div>
                    <div className="text-sm text-gray-400">起价 (USD)</div>
                  </div>
                )}
              </div>

              <p className="text-gray-300 leading-relaxed">
                {product.description}
              </p>

              {/* 快速操作按钮 */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => onRequestQuote(product)}
                  className="btn-led-primary flex-1"
                  disabled={!product.inStock}
                >
                  {product.inStock ? '立即询价' : '缺货中'}
                </button>
                <button className="btn-led-outline px-6">
                  收藏
                </button>
                <button className="btn-led-outline px-6">
                  分享
                </button>
              </div>
            </div>

            {/* 标签页导航 */}
            <div className="flex border-b border-gray-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-orange-400 border-b-2 border-orange-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 标签页内容 */}
            <div className="flex-1 p-6 overflow-y-auto">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* 主要特点 */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">主要特点</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-700 rounded-lg">
                          <span className="text-orange-400 mr-3">✓</span>
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 核心优势 */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">核心优势</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-gradient-to-r from-blue-900/30 to-blue-800/30 rounded-lg border border-blue-700/30">
                        <h4 className="font-medium text-blue-300 mb-2">高清显示</h4>
                        <p className="text-sm text-gray-300">采用先进的LED封装技术，提供卓越的色彩表现和清晰度</p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-green-900/30 to-green-800/30 rounded-lg border border-green-700/30">
                        <h4 className="font-medium text-green-300 mb-2">节能环保</h4>
                        <p className="text-sm text-gray-300">低功耗设计，比传统显示设备节能30%以上</p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-purple-900/30 to-purple-800/30 rounded-lg border border-purple-700/30">
                        <h4 className="font-medium text-purple-300 mb-2">稳定可靠</h4>
                        <p className="text-sm text-gray-300">工业级设计，支持7×24小时连续运行</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white mb-4">技术规格</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {product.specs.map((spec, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                        <span className="text-gray-300 font-medium">{spec.name}</span>
                        <span className="text-white">
                          {spec.value}{spec.unit}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* 性能指标 */}
                  <div className="mt-8">
                    <h4 className="text-md font-semibold text-white mb-4">性能指标</h4>
                    <div className="space-y-4">
                      <AnimatedProgressBar
                        percentage={95}
                        label="色彩还原度"
                        color="bg-gradient-to-r from-red-500 to-red-600"
                      />
                      <AnimatedProgressBar
                        percentage={88}
                        label="能效比"
                        color="bg-gradient-to-r from-green-500 to-green-600"
                      />
                      <AnimatedProgressBar
                        percentage={92}
                        label="稳定性"
                        color="bg-gradient-to-r from-blue-500 to-blue-600"
                      />
                      <AnimatedProgressBar
                        percentage={90}
                        label="易维护性"
                        color="bg-gradient-to-r from-purple-500 to-purple-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'applications' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white mb-4">应用场景</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {product.applications.map((application, index) => (
                      <div key={index} className="p-4 bg-gray-700 rounded-lg">
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-3">🎯</span>
                          <h4 className="font-medium text-white">{application}</h4>
                        </div>
                        <p className="text-sm text-gray-300 ml-11">
                          适用于{application}环境，提供专业的显示解决方案
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* 成功案例 */}
                  <div className="mt-8">
                    <h4 className="text-md font-semibold text-white mb-4">成功案例</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 bg-gradient-to-r from-orange-900/30 to-orange-800/30 rounded-lg border border-orange-700/30">
                        <h5 className="font-medium text-orange-300 mb-2">某大型会议中心</h5>
                        <p className="text-sm text-gray-300">部署了200平方米的LED显示系统，显示效果获得客户高度认可</p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-teal-900/30 to-teal-800/30 rounded-lg border border-teal-700/30">
                        <h5 className="font-medium text-teal-300 mb-2">国际体育赛事</h5>
                        <p className="text-sm text-gray-300">为多个国际体育场馆提供显示设备，稳定运行超过5000小时</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'support' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-white mb-4">技术支持</h3>
                  
                  {/* 服务内容 */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">📞</span>
                        <h4 className="font-medium text-white">技术咨询</h4>
                      </div>
                      <p className="text-sm text-gray-300 ml-11">
                        7×24小时技术热线支持，专业工程师在线解答
                      </p>
                    </div>
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">🔧</span>
                        <h4 className="font-medium text-white">安装调试</h4>
                      </div>
                      <p className="text-sm text-gray-300 ml-11">
                        提供专业的现场安装和调试服务，确保设备正常运行
                      </p>
                    </div>
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">🛡️</span>
                        <h4 className="font-medium text-white">质保服务</h4>
                      </div>
                      <p className="text-sm text-gray-300 ml-11">
                        提供2年质保服务，终身技术支持和维护
                      </p>
                    </div>
                  </div>

                  {/* 下载资源 */}
                  <div className="mt-8">
                    <h4 className="text-md font-semibold text-white mb-4">下载资源</h4>
                    <div className="space-y-3">
                      <a href="#" className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                        <div className="flex items-center">
                          <span className="text-xl mr-3">📄</span>
                          <span className="text-gray-300">产品规格书</span>
                        </div>
                        <span className="text-orange-400">下载</span>
                      </a>
                      <a href="#" className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                        <div className="flex items-center">
                          <span className="text-xl mr-3">📋</span>
                          <span className="text-gray-300">安装手册</span>
                        </div>
                        <span className="text-orange-400">下载</span>
                      </a>
                      <a href="#" className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                        <div className="flex items-center">
                          <span className="text-xl mr-3">🎥</span>
                          <span className="text-gray-300">产品演示视频</span>
                        </div>
                        <span className="text-orange-400">观看</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}