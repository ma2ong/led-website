'use client';

import { useEffect, useRef } from 'react';

interface CompanyMapProps {
  className?: string;
}

export default function CompanyMap({ className = '' }: CompanyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  // 公司位置信息
  const companyInfo = {
    name: '深圳联锦光电有限公司',
    address: '深圳市宝安区石岩街道塘头第一工业区C栋',
    englishAddress: 'Building C, Tangtou First Industrial Zone, Shiyan Street, Bao\'an District, Shenzhen',
    coordinates: {
      lat: 22.6329,
      lng: 113.9441
    },
    phone: '+86 755-8259-5016',
    email: 'bruce@lianjinled.com',
    area: '50,000㎡',
    established: '2007年'
  };

  useEffect(() => {
    // 这里可以集成真实的地图API，比如百度地图、高德地图或Google Maps
    // 目前使用静态展示
  }, []);

  return (
    <div className={`bg-gray-800 rounded-2xl overflow-hidden shadow-2xl ${className}`}>
      {/* 地图头部信息 */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">{companyInfo.name}</h3>
            <p className="text-orange-100 mb-1">{companyInfo.address}</p>
            <p className="text-orange-200 text-sm">{companyInfo.englishAddress}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl mb-2">🏭</div>
            <div className="text-sm text-orange-100">
              {companyInfo.area} 生产基地
            </div>
          </div>
        </div>
      </div>

      {/* 地图区域 */}
      <div className="relative">
        <div 
          ref={mapRef}
          className="h-96 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden"
        >
          {/* 地图背景装饰 */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
            <div className="absolute top-20 right-20 w-24 h-24 border border-white rounded-full"></div>
            <div className="absolute bottom-10 left-1/3 w-16 h-16 border border-white rounded-full"></div>
          </div>

          {/* 中心标记 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* 脉冲动画 */}
              <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-30"></div>
              <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-20 animation-delay-500"></div>
              
              {/* 主标记 */}
              <div className="relative w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-white text-2xl">📍</span>
              </div>
              
              {/* 信息卡片 */}
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white rounded-lg p-4 shadow-xl min-w-64">
                <div className="text-gray-800">
                  <div className="font-bold text-lg mb-2 text-orange-600">联锦光电</div>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center">
                      <span className="mr-2">🏢</span>
                      <span>现代化LED生产基地</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📏</span>
                      <span>{companyInfo.area} 厂房面积</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">📅</span>
                      <span>{companyInfo.established}成立</span>
                    </div>
                  </div>
                </div>
                {/* 箭头 */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
              </div>
            </div>
          </div>

          {/* 地图控制按钮 */}
          <div className="absolute top-4 right-4 space-y-2">
            <button className="w-10 h-10 bg-white bg-opacity-90 rounded-lg flex items-center justify-center shadow-lg hover:bg-opacity-100 transition-all">
              <span className="text-gray-700">+</span>
            </button>
            <button className="w-10 h-10 bg-white bg-opacity-90 rounded-lg flex items-center justify-center shadow-lg hover:bg-opacity-100 transition-all">
              <span className="text-gray-700">-</span>
            </button>
          </div>

          {/* 地图图例 */}
          <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-lg p-3 shadow-lg">
            <div className="text-xs text-gray-700 space-y-1">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                <span>联锦光电总部</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>生产车间</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>办公区域</span>
              </div>
            </div>
          </div>
        </div>

        {/* 地图底部信息 */}
        <div className="bg-gray-700 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-orange-400 text-2xl mb-2">🚗</div>
              <h4 className="text-white font-semibold mb-1">交通便利</h4>
              <p className="text-gray-300 text-sm">距离深圳宝安国际机场30分钟车程</p>
            </div>
            <div className="text-center">
              <div className="text-blue-400 text-2xl mb-2">🏭</div>
              <h4 className="text-white font-semibold mb-1">现代化工厂</h4>
              <p className="text-gray-300 text-sm">智能化生产线，年产能100万平方米</p>
            </div>
            <div className="text-center">
              <div className="text-green-400 text-2xl mb-2">🌱</div>
              <h4 className="text-white font-semibold mb-1">绿色环保</h4>
              <p className="text-gray-300 text-sm">通过ISO环保认证，绿色生产</p>
            </div>
          </div>
        </div>
      </div>

      {/* 快速联系按钮 */}
      <div className="bg-gray-700 p-4 border-t border-gray-600">
        <div className="flex flex-col sm:flex-row gap-3">
          <a 
            href={`tel:${companyInfo.phone}`}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-center py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            <span className="mr-2">📞</span>
            立即致电
          </a>
          <a 
            href={`mailto:${companyInfo.email}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            <span className="mr-2">✉️</span>
            发送邮件
          </a>
          <button 
            onClick={() => {
              // 这里可以集成导航功能
              const address = encodeURIComponent(companyInfo.address);
              window.open(`https://maps.google.com/maps?q=${address}`, '_blank');
            }}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            <span className="mr-2">🧭</span>
            导航到这里
          </button>
        </div>
      </div>
    </div>
  );
}

// 简化的地图组件
export function SimpleMap({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-gray-800 rounded-lg p-6 ${className}`}>
      <div className="h-64 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white to-transparent"></div>
        </div>
        
        {/* 主要内容 */}
        <div className="text-white text-center relative z-10">
          <div className="text-6xl mb-4 animate-float">🗺️</div>
          <div className="text-2xl font-bold mb-2">深圳联锦光电</div>
          <div className="text-lg mb-2">深圳市宝安区石岩街道塘头第一工业区C栋</div>
          <div className="text-sm opacity-80 mb-4">50,000㎡现代化生产基地</div>
          <button 
            onClick={() => {
              const address = encodeURIComponent('深圳市宝安区石岩街道塘头第一工业区C栋');
              window.open(`https://maps.google.com/maps?q=${address}`, '_blank');
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            查看详细地图
          </button>
        </div>
      </div>
    </div>
  );
}