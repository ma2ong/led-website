'use client';

import { useState } from 'react';
import { ProductCard } from './product-card';
import { ProductFilter, FilterGroup } from './product-filter';
import { ProductComparison, ProductForComparison } from './product-comparison';
import { TechnicalSpecs, SpecGroup } from './technical-specs';
import { Locale } from '@/lib/i18n-config';

interface ProductComponentsDemoProps {
  locale: Locale;
}

export default function ProductComponentsDemo({ locale }: ProductComponentsDemoProps) {
  // 示例产品数据
  const sampleProducts = [
    {
      id: '1',
      slug: 'outdoor-p10',
      title: locale === 'zh-Hans' ? 'P10 户外全彩显示屏' : 'P10 Outdoor Full Color Display',
      description: locale === 'zh-Hans' 
        ? '高亮度户外LED显示屏，适用于广告牌、体育场馆等场景' 
        : 'High brightness outdoor LED display for billboards, stadiums, etc.',
      category: locale === 'zh-Hans' ? '户外显示屏' : 'Outdoor Display',
      pixelPitch: '10mm',
      brightness: '7000cd/m²',
      thumbnailUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGVkJTIwZGlzcGxheXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      isNew: true,
      isFeatured: false,
    },
    {
      id: '2',
      slug: 'indoor-p3',
      title: locale === 'zh-Hans' ? 'P3 室内高清显示屏' : 'P3 Indoor HD Display',
      description: locale === 'zh-Hans' 
        ? '高清室内LED显示屏，适用于会议室、展厅等场景' 
        : 'High definition indoor LED display for conference rooms, exhibition halls, etc.',
      category: locale === 'zh-Hans' ? '室内显示屏' : 'Indoor Display',
      pixelPitch: '3mm',
      brightness: '1200cd/m²',
      thumbnailUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGVkJTIwZGlzcGxheXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      isNew: false,
      isFeatured: true,
    },
    {
      id: '3',
      slug: 'rental-p4',
      title: locale === 'zh-Hans' ? 'P4 租赁显示屏' : 'P4 Rental Display',
      description: locale === 'zh-Hans' 
        ? '轻便易安装的租赁LED显示屏，适用于舞台、活动等场景' 
        : 'Lightweight and easy-to-install rental LED display for stages, events, etc.',
      category: locale === 'zh-Hans' ? '租赁显示屏' : 'Rental Display',
      pixelPitch: '4mm',
      brightness: '4500cd/m²',
      thumbnailUrl: 'https://images.unsplash.com/photo-1595761970922-2d7b59283ce6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGVkJTIwZGlzcGxheXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      isNew: false,
      isFeatured: false,
    },
    {
      id: '4',
      slug: 'creative-p6',
      title: locale === 'zh-Hans' ? 'P6 创意曲面显示屏' : 'P6 Creative Curved Display',
      description: locale === 'zh-Hans' 
        ? '可弯曲的创意LED显示屏，适用于商场、展览等场景' 
        : 'Flexible creative LED display for shopping malls, exhibitions, etc.',
      category: locale === 'zh-Hans' ? '创意显示屏' : 'Creative Display',
      pixelPitch: '6mm',
      brightness: '5000cd/m²',
      thumbnailUrl: 'https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bGVkJTIwZGlzcGxheXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      isNew: true,
      isFeatured: true,
    },
  ];
  
  // 示例过滤器数据
  const filterGroups: FilterGroup[] = [
    {
      id: 'category',
      name: locale === 'zh-Hans' ? '分类' : 'Category',
      options: [
        { id: 'outdoor', name: locale === 'zh-Hans' ? '户外显示屏' : 'Outdoor Display', value: 'outdoor' },
        { id: 'indoor', name: locale === 'zh-Hans' ? '室内显示屏' : 'Indoor Display', value: 'indoor' },
        { id: 'rental', name: locale === 'zh-Hans' ? '租赁显示屏' : 'Rental Display', value: 'rental' },
        { id: 'creative', name: locale === 'zh-Hans' ? '创意显示屏' : 'Creative Display', value: 'creative' },
      ],
    },
    {
      id: 'pixelPitch',
      name: locale === 'zh-Hans' ? '点间距' : 'Pixel Pitch',
      options: [
        { id: 'p1', name: '≤ 1.0mm', value: '1' },
        { id: 'p2', name: '1.1mm - 2.5mm', value: '2' },
        { id: 'p3', name: '2.6mm - 4.0mm', value: '3' },
        { id: 'p4', name: '4.1mm - 8.0mm', value: '4' },
        { id: 'p5', name: '> 8.0mm', value: '5' },
      ],
    },
    {
      id: 'brightness',
      name: locale === 'zh-Hans' ? '亮度' : 'Brightness',
      options: [
        { id: 'b1', name: '≤ 1000cd/m²', value: '1' },
        { id: 'b2', name: '1001cd/m² - 3000cd/m²', value: '2' },
        { id: 'b3', name: '3001cd/m² - 5000cd/m²', value: '3' },
        { id: 'b4', name: '> 5000cd/m²', value: '4' },
      ],
    },
  ];
  
  // 示例比较产品数据
  const productsForComparison: ProductForComparison[] = [
    {
      id: '1',
      title: locale === 'zh-Hans' ? 'P10 户外全彩显示屏' : 'P10 Outdoor Full Color Display',
      slug: 'outdoor-p10',
      thumbnailUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGVkJTIwZGlzcGxheXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      category: locale === 'zh-Hans' ? '户外显示屏' : 'Outdoor Display',
      specs: [
        { name: locale === 'zh-Hans' ? '点间距' : 'Pixel Pitch', value: '10mm' },
        { name: locale === 'zh-Hans' ? '亮度' : 'Brightness', value: '7000cd/m²' },
        { name: locale === 'zh-Hans' ? '刷新率' : 'Refresh Rate', value: '3840Hz' },
        { name: locale === 'zh-Hans' ? '灰度等级' : 'Gray Scale', value: '14bit' },
        { name: locale === 'zh-Hans' ? '视角' : 'Viewing Angle', value: '140°/140°' },
        { name: locale === 'zh-Hans' ? '防护等级' : 'IP Rating', value: 'IP65' },
      ],
    },
    {
      id: '2',
      title: locale === 'zh-Hans' ? 'P3 室内高清显示屏' : 'P3 Indoor HD Display',
      slug: 'indoor-p3',
      thumbnailUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGVkJTIwZGlzcGxheXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      category: locale === 'zh-Hans' ? '室内显示屏' : 'Indoor Display',
      specs: [
        { name: locale === 'zh-Hans' ? '点间距' : 'Pixel Pitch', value: '3mm' },
        { name: locale === 'zh-Hans' ? '亮度' : 'Brightness', value: '1200cd/m²' },
        { name: locale === 'zh-Hans' ? '刷新率' : 'Refresh Rate', value: '3840Hz' },
        { name: locale === 'zh-Hans' ? '灰度等级' : 'Gray Scale', value: '16bit' },
        { name: locale === 'zh-Hans' ? '视角' : 'Viewing Angle', value: '160°/160°' },
        { name: locale === 'zh-Hans' ? '防护等级' : 'IP Rating', value: 'IP30' },
      ],
    },
  ];
  
  // 示例技术规格数据
  const specGroups: SpecGroup[] = [
    {
      name: 'General',
      specs: [
        { name: locale === 'zh-Hans' ? '型号' : 'Model', value: 'P3-UHD' },
        { name: locale === 'zh-Hans' ? '应用' : 'Application', value: locale === 'zh-Hans' ? '室内' : 'Indoor' },
        { name: locale === 'zh-Hans' ? '像素密度' : 'Pixel Density', value: '111,111 dots/m²' },
      ],
    },
    {
      name: 'Physical',
      specs: [
        { name: locale === 'zh-Hans' ? '箱体尺寸' : 'Cabinet Size', value: '500 × 500 × 75mm' },
        { name: locale === 'zh-Hans' ? '箱体重量' : 'Cabinet Weight', value: '7.5kg' },
        { name: locale === 'zh-Hans' ? '箱体材质' : 'Cabinet Material', value: locale === 'zh-Hans' ? '铝合金' : 'Aluminum' },
      ],
    },
    {
      name: 'Optical',
      specs: [
        { name: locale === 'zh-Hans' ? '点间距' : 'Pixel Pitch', value: '3mm' },
        { name: locale === 'zh-Hans' ? '亮度' : 'Brightness', value: '1200cd/m²' },
        { name: locale === 'zh-Hans' ? '对比度' : 'Contrast Ratio', value: '5000:1' },
        { name: locale === 'zh-Hans' ? '视角' : 'Viewing Angle', value: '160°/160°' },
      ],
    },
    {
      name: 'Electrical',
      specs: [
        { name: locale === 'zh-Hans' ? '功耗' : 'Power Consumption', value: '650W/m² (max), 220W/m² (avg)' },
        { name: locale === 'zh-Hans' ? '输入电压' : 'Input Voltage', value: 'AC 100-240V' },
        { name: locale === 'zh-Hans' ? '刷新率' : 'Refresh Rate', value: '3840Hz' },
      ],
    },
  ];
  
  // 状态管理
  const [selectedProducts, setSelectedProducts] = useState<ProductForComparison[]>(productsForComparison);
  const [availableProducts, setAvailableProducts] = useState<ProductForComparison[]>([
    {
      id: '3',
      title: locale === 'zh-Hans' ? 'P4 租赁显示屏' : 'P4 Rental Display',
      slug: 'rental-p4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1595761970922-2d7b59283ce6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGVkJTIwZGlzcGxheXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      category: locale === 'zh-Hans' ? '租赁显示屏' : 'Rental Display',
      specs: [
        { name: locale === 'zh-Hans' ? '点间距' : 'Pixel Pitch', value: '4mm' },
        { name: locale === 'zh-Hans' ? '亮度' : 'Brightness', value: '4500cd/m²' },
        { name: locale === 'zh-Hans' ? '刷新率' : 'Refresh Rate', value: '3840Hz' },
        { name: locale === 'zh-Hans' ? '灰度等级' : 'Gray Scale', value: '14bit' },
        { name: locale === 'zh-Hans' ? '视角' : 'Viewing Angle', value: '140°/140°' },
        { name: locale === 'zh-Hans' ? '防护等级' : 'IP Rating', value: 'IP54' },
      ],
    },
    {
      id: '4',
      title: locale === 'zh-Hans' ? 'P6 创意曲面显示屏' : 'P6 Creative Curved Display',
      slug: 'creative-p6',
      thumbnailUrl: 'https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bGVkJTIwZGlzcGxheXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      category: locale === 'zh-Hans' ? '创意显示屏' : 'Creative Display',
      specs: [
        { name: locale === 'zh-Hans' ? '点间距' : 'Pixel Pitch', value: '6mm' },
        { name: locale === 'zh-Hans' ? '亮度' : 'Brightness', value: '5000cd/m²' },
        { name: locale === 'zh-Hans' ? '刷新率' : 'Refresh Rate', value: '1920Hz' },
        { name: locale === 'zh-Hans' ? '灰度等级' : 'Gray Scale', value: '14bit' },
        { name: locale === 'zh-Hans' ? '视角' : 'Viewing Angle', value: '140°/140°' },
        { name: locale === 'zh-Hans' ? '防护等级' : 'IP Rating', value: 'IP43' },
      ],
    },
  ]);
  
  // 处理添加产品到比较列表
  const handleAddProduct = (productId: string) => {
    const product = availableProducts.find(p => p.id === productId);
    if (product) {
      setSelectedProducts([...selectedProducts, product]);
      setAvailableProducts(availableProducts.filter(p => p.id !== productId));
    }
  };
  
  // 处理从比较列表中移除产品
  const handleRemoveProduct = (productId: string) => {
    const product = selectedProducts.find(p => p.id === productId);
    if (product) {
      setAvailableProducts([...availableProducts, product]);
      setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
    }
  };
  
  // 处理过滤器变化
  const handleFilterChange = (filters: Record<string, string[]>) => {
    console.log('Filters changed:', filters);
  };
  
  return (
    <div className="space-y-16">
      {/* 产品卡片演示 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          {locale === 'zh-Hans' ? '产品卡片组件' : 'Product Card Component'}
        </h2>
        
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">
              {locale === 'zh-Hans' ? '默认样式' : 'Default Style'}
            </h3>
            <ProductCard {...sampleProducts[0]} locale={locale} />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">
              {locale === 'zh-Hans' ? '特色样式' : 'Featured Style'}
            </h3>
            <ProductCard {...sampleProducts[1]} locale={locale} variant="featured" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">
              {locale === 'zh-Hans' ? '网格样式' : 'Grid Style'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sampleProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  {...product} 
                  locale={locale} 
                  variant="grid" 
                />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">
              {locale === 'zh-Hans' ? '紧凑样式' : 'Compact Style'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sampleProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  {...product} 
                  locale={locale} 
                  variant="compact" 
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* 产品过滤器演示 */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold mb-6">
            {locale === 'zh-Hans' ? '产品过滤器组件' : 'Product Filter Component'}
          </h2>
          <ProductFilter 
            filterGroups={filterGroups} 
            locale={locale} 
            onFilterChange={handleFilterChange}
          />
        </div>
        
        <div className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sampleProducts.map(product => (
              <ProductCard 
                key={product.id} 
                {...product} 
                locale={locale} 
                variant="grid" 
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* 产品比较演示 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          {locale === 'zh-Hans' ? '产品比较组件' : 'Product Comparison Component'}
        </h2>
        <ProductComparison 
          products={selectedProducts}
          availableProducts={availableProducts}
          locale={locale}
          onAddProduct={handleAddProduct}
          onRemoveProduct={handleRemoveProduct}
        />
      </section>
      
      {/* 技术规格演示 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          {locale === 'zh-Hans' ? '技术规格组件' : 'Technical Specifications Component'}
        </h2>
        
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">
              {locale === 'zh-Hans' ? '默认样式' : 'Default Style'}
            </h3>
            <TechnicalSpecs 
              specGroups={specGroups} 
              locale={locale} 
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">
              {locale === 'zh-Hans' ? '紧凑样式' : 'Compact Style'}
            </h3>
            <TechnicalSpecs 
              specGroups={specGroups} 
              locale={locale} 
              variant="compact"
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">
              {locale === 'zh-Hans' ? '详细样式' : 'Detailed Style'}
            </h3>
            <TechnicalSpecs 
              specGroups={specGroups} 
              locale={locale} 
              variant="detailed"
            />
          </div>
        </div>
      </section>
    </div>
  );
}