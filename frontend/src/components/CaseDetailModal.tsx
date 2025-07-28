'use client';

import { useState, useEffect } from 'react';
import { OptimizedImage } from './OptimizedImage';

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

interface CaseDetailModalProps {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CaseDetailModal({ caseStudy, isOpen, onClose }: CaseDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // 处理ESC键关闭
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isImageModalOpen) {
          setIsImageModalOpen(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isImageModalOpen, onClose]);

  // 重置状态
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setIsImageModalOpen(false);
    }
  }, [isOpen]);

  if (!isOpen || !caseStudy) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === caseStudy.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? caseStudy.images.length - 1 : prev - 1
    );
  };

  return (
    <>
      {/* 主模态框 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* 背景遮罩 */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* 模态框内容 */}
        <div className="relative bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <span className="text-xl">×</span>
          </button>

          {/* 滚动内容 */}
          <div className="overflow-y-auto max-h-[90vh]">
            {/* 头部图片区域 */}
            <div className="relative h-80 overflow-hidden">
              <OptimizedImage
                src={caseStudy.images[currentImageIndex]}
                alt={caseStudy.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* 图片导航 */}
              {caseStudy.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white transition-all"
                  >
                    <span className="text-xl">‹</span>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white transition-all"
                  >
                    <span className="text-xl">›</span>
                  </button>
                  
                  {/* 图片指示器 */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {caseStudy.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex ? 'bg-orange-500' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
              
              {/* 放大图片按钮 */}
              <button
                onClick={() => setIsImageModalOpen(true)}
                className="absolute top-4 left-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm transition-all"
              >
                🔍 查看大图
              </button>
              
              {/* 头部信息 */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  {caseStudy.isFeatured && (
                    <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      精选案例
                    </span>
                  )}
                  <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    {caseStudy.location} • {caseStudy.year}
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-2">{caseStudy.title}</h1>
                <p className="text-lg text-gray-200">{caseStudy.subtitle}</p>
              </div>
            </div>

            {/* 内容区域 */}
            <div className="p-8">
              {/* 基本信息 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-700 p-6 rounded-xl">
                  <div className="text-orange-400 text-2xl mb-3">💼</div>
                  <h3 className="text-white font-semibold mb-2">客户信息</h3>
                  <p className="text-gray-300">{caseStudy.clientName || '保密客户'}</p>
                  <p className="text-gray-400 text-sm mt-1">{caseStudy.location}</p>
                </div>
                <div className="bg-gray-700 p-6 rounded-xl">
                  <div className="text-blue-400 text-2xl mb-3">💰</div>
                  <h3 className="text-white font-semibold mb-2">项目价值</h3>
                  <p className="text-gray-300">{caseStudy.projectValue || '商业机密'}</p>
                  <p className="text-gray-400 text-sm mt-1">合同金额</p>
                </div>
                <div className="bg-gray-700 p-6 rounded-xl">
                  <div className="text-green-400 text-2xl mb-3">📅</div>
                  <h3 className="text-white font-semibold mb-2">完成时间</h3>
                  <p className="text-gray-300">{caseStudy.year}年</p>
                  <p className="text-gray-400 text-sm mt-1">项目交付</p>
                </div>
              </div>

              {/* 标签 */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">项目标签</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-orange-500 bg-opacity-20 text-orange-300 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 项目描述 */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">项目概述</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {caseStudy.description}
                </p>
              </div>

              {/* 挑战、解决方案、成果 */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="bg-red-900 bg-opacity-20 p-6 rounded-xl border border-red-500 border-opacity-30">
                  <div className="text-red-400 text-2xl mb-3">⚡</div>
                  <h3 className="text-xl font-bold text-white mb-4">项目挑战</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {caseStudy.challenge}
                  </p>
                </div>
                <div className="bg-blue-900 bg-opacity-20 p-6 rounded-xl border border-blue-500 border-opacity-30">
                  <div className="text-blue-400 text-2xl mb-3">💡</div>
                  <h3 className="text-xl font-bold text-white mb-4">解决方案</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {caseStudy.solution}
                  </p>
                </div>
                <div className="bg-green-900 bg-opacity-20 p-6 rounded-xl border border-green-500 border-opacity-30">
                  <div className="text-green-400 text-2xl mb-3">🎯</div>
                  <h3 className="text-xl font-bold text-white mb-4">项目成果</h3>
                  <ul className="space-y-2">
                    {caseStudy.results.map((result, index) => (
                      <li key={index} className="text-gray-300 flex items-start">
                        <span className="text-green-400 mr-2 mt-1">✓</span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 技术规格 */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">技术规格</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {caseStudy.specs.map((spec, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded-lg text-center">
                      <div className="text-orange-400 font-bold text-lg mb-1">
                        {spec.value}
                      </div>
                      <div className="text-gray-300 text-sm">
                        {spec.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 联系CTA */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-center">
                <h3 className="text-2xl font-bold text-white mb-2">对此案例感兴趣？</h3>
                <p className="text-orange-100 mb-4">
                  联系我们获取更多详细信息和类似解决方案
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="/contact"
                    className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    获取详细资料
                  </a>
                  <a
                    href="tel:+8675582595016"
                    className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
                  >
                    立即咨询
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 图片放大模态框 */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black bg-opacity-90"
            onClick={() => setIsImageModalOpen(false)}
          />
          <div className="relative max-w-7xl max-h-full">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white text-2xl transition-colors"
            >
              ×
            </button>
            <OptimizedImage
              src={caseStudy.images[currentImageIndex]}
              alt={caseStudy.title}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
            />
            {caseStudy.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white text-2xl transition-all"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white text-2xl transition-all"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}