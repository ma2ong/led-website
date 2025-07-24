'use client';

import { useState } from 'react';
import { MediaGallery } from '@/components/ui/media-gallery';
import { CaseStudyCard } from '@/components/case-study/case-study-card';
import { NewsCard } from '@/components/news/news-card';
import { InquiryForm } from '@/components/inquiry/inquiry-form';
import { ContactMap } from '@/components/contact/contact-map';
import { Locale } from '@/lib/i18n-config';

interface MediaComponentsDemoProps {
  locale: Locale;
}

export default function MediaComponentsDemo({ locale }: MediaComponentsDemoProps) {
  // 示例媒体项
  const mediaItems = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGVkJTIwZGlzcGxheXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      alternativeText: 'LED显示屏1',
      type: 'image',
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGVkJTIwZGlzcGxheXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      alternativeText: 'LED显示屏2',
      type: 'image',
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1595761970922-2d7b59283ce6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGVkJTIwZGlzcGxheXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      alternativeText: 'LED显示屏3',
      type: 'image',
    },
    {
      id: '4',
      url: 'https://player.vimeo.com/external/328428416.sd.mp4?s=39df9f60fdeaeff0f4e3fbf32554e802b0bc7cd8&profile_id=164&oauth2_token_id=57447761',
      alternativeText: 'LED显示屏视频',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bGVkJTIwZGlzcGxheXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      duration: '0:30',
    },
  ];
  
  // 示例案例研究
  const caseStudy = {
    id: '1',
    title: locale === 'zh-Hans' ? '上海某商场LED显示屏项目' : 'Shanghai Shopping Mall LED Display Project',
    slug: 'shanghai-mall-led-project',
    client: locale === 'zh-Hans' ? '上海环球商场' : 'Shanghai Global Mall',
    location: locale === 'zh-Hans' ? '上海市' : 'Shanghai',
    industry: 'retail',
    industryInfo: {
      name: locale === 'zh-Hans' ? '零售' : 'Retail',
      icon: '🛍️',
    },
    summary: locale === 'zh-Hans' 
      ? '为上海某大型商场提供了室内外LED显示屏解决方案，提升了商场的视觉体验和广告效果。' 
      : 'Provided indoor and outdoor LED display solutions for a large shopping mall in Shanghai, enhancing the visual experience and advertising effectiveness.',
    mainImage: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGVkJTIwZGlzcGxheXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    projectDate: '2023-06-15',
    formattedProjectDate: '2023年6月',
    projectValue: 1500000,
    formattedProjectValue: '¥1,500,000',
    readingTime: 5,
    productCount: 3,
    isFeatured: true,
  };
  
  // 示例新闻
  const news = {
    id: '1',
    title: locale === 'zh-Hans' ? '联锦光电推出新一代小间距LED显示屏' : 'Lianjin LED Launches New Generation of Fine Pitch LED Displays',
    slug: 'new-fine-pitch-led-displays',
    excerpt: locale === 'zh-Hans' 
      ? '联锦光电今日发布了新一代小间距LED显示屏，像素间距低至0.7mm，为高端会议室和控制中心提供超清显示解决方案。' 
      : 'Lianjin LED today released a new generation of fine pitch LED displays with pixel pitch as low as 0.7mm, providing ultra-high definition display solutions for high-end conference rooms and control centers.',
    category: 'product',
    categoryInfo: {
      name: locale === 'zh-Hans' ? '产品资讯' : 'Product News',
      icon: '📱',
    },
    tags: ['LED', locale === 'zh-Hans' ? '小间距' : 'Fine Pitch', locale === 'zh-Hans' ? '新品' : 'New Product'],
    featuredImage: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGVkJTIwZGlzcGxheXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    publishDate: '2023-09-20',
    formattedPublishDate: '2023-09-20',
    author: locale === 'zh-Hans' ? '张明' : 'Zhang Ming',
    viewCount: 1250,
    readingTime: 3,
    isFeatured: true,
  };
  
  // 示例位置数据
  const locations = [
    {
      id: '1',
      name: locale === 'zh-Hans' ? '联锦光电总部' : 'Lianjin LED Headquarters',
      address: locale === 'zh-Hans' ? '中国广东省深圳市宝安区福永街道凤凰社区兴业一路46号' : '46 Xingye 1st Road, Fenghuang Community, Fuyong Street, Baoan District, Shenzhen, Guangdong, China',
      phone: '+86 755-2345-6789',
      email: 'info@lianjin-led.com',
      coordinates: { lat: 22.6738, lng: 113.8129 },
      isHeadquarters: true,
    },
    {
      id: '2',
      name: locale === 'zh-Hans' ? '上海办事处' : 'Shanghai Office',
      address: locale === 'zh-Hans' ? '中国上海市浦东新区张江高科技园区博云路2号' : '2 Boyun Road, Zhangjiang Hi-Tech Park, Pudong New Area, Shanghai, China',
      phone: '+86 21-5432-1098',
      email: 'shanghai@lianjin-led.com',
      coordinates: { lat: 31.2304, lng: 121.4737 },
      isHeadquarters: false,
    },
  ];
  
  // 状态管理
  const [selectedLocationId, setSelectedLocationId] = useState<string>(locations[0].id);
  
  // 处理询盘表单提交成功
  const handleInquirySuccess = () => {
    console.log('Inquiry submitted successfully');
  };
  
  // 处理询盘表单提交失败
  const handleInquiryError = (error: Error) => {
    console.error('Inquiry submission error:', error);
  };
  
  // 处理位置选择
  const handleLocationSelect = (locationId: string) => {
    setSelectedLocationId(locationId);
  };
  
  return (
    <div className="space-y-16">
      {/* 媒体画廊演示 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          {locale === 'zh-Hans' ? '媒体画廊组件' : 'Media Gallery Component'}
        </h2>
        
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">
              {locale === 'zh-Hans' ? '默认样式' : 'Default Style'}
            </h3>
            <MediaGallery items={mediaItems} />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">
              {locale === 'zh-Hans' ? '无缩略图' : 'Without Thumbnails'}
            </h3>
            <MediaGallery items={mediaItems} showThumbnails={false} />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">
              {locale === 'zh-Hans' ? '自动播放视频' : 'Autoplay Video'}
            </h3>
            <MediaGallery items={mediaItems} autoPlay={true} loop={true} />
          </div>
        </div>
      </section>
      
      {/* 案例研究卡片演示 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          {locale === 'zh-Hans' ? '案例研究卡片组件' : 'Case Study Card Component'}
        </h2>
        
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">
              {locale === 'zh-Hans' ? '默认样式' : 'Default Style'}
            </h3>
            <CaseStudyCard caseStudy={caseStudy} />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">
              {locale === 'zh-Hans' ? '特色样式' : 'Featured Style'}
            </h3>
            <CaseStudyCard caseStudy={caseStudy} variant="featured" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">
              {locale === 'zh-Hans' ? '紧凑样式' : 'Compact Style'}
            </h3>
            <CaseStudyCard caseStudy={caseStudy} variant="compact" />
          </div>
        </div>
      </section>
      
      {/* 新闻卡片演示 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          {locale === 'zh-Hans' ? '新闻卡片组件' : 'News Card Component'}
        </h2>
        
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">
              {locale === 'zh-Hans' ? '默认样式' : 'Default Style'}
            </h3>
            <NewsCard news={news} />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">
              {locale === 'zh-Hans' ? '特色样式' : 'Featured Style'}
            </h3>
            <NewsCard news={news} variant="featured" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">
              {locale === 'zh-Hans' ? '列表样式' : 'List Style'}
            </h3>
            <NewsCard news={news} variant="list" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">
              {locale === 'zh-Hans' ? '紧凑样式' : 'Compact Style'}
            </h3>
            <NewsCard news={news} variant="compact" />
          </div>
        </div>
      </section>
      
      {/* 询盘表单演示 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          {locale === 'zh-Hans' ? '询盘表单组件' : 'Inquiry Form Component'}
        </h2>
        
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">
              {locale === 'zh-Hans' ? '默认样式' : 'Default Style'}
            </h3>
            <div className="p-6 border border-gray-200 rounded-lg">
              <InquiryForm 
                locale={locale} 
                onSuccess={handleInquirySuccess}
                onError={handleInquiryError}
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">
              {locale === 'zh-Hans' ? '紧凑样式' : 'Compact Style'}
            </h3>
            <div className="p-6 border border-gray-200 rounded-lg">
              <InquiryForm 
                locale={locale} 
                variant="compact"
                onSuccess={handleInquirySuccess}
                onError={handleInquiryError}
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">
              {locale === 'zh-Hans' ? '产品询价样式' : 'Product Inquiry Style'}
            </h3>
            <div className="p-6 border border-gray-200 rounded-lg">
              <InquiryForm 
                locale={locale} 
                variant="product"
                productId="1"
                productName={locale === 'zh-Hans' ? 'P3 室内高清显示屏' : 'P3 Indoor HD Display'}
                onSuccess={handleInquirySuccess}
                onError={handleInquiryError}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* 联系地图演示 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">
          {locale === 'zh-Hans' ? '联系地图组件' : 'Contact Map Component'}
        </h2>
        
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">
              {locale === 'zh-Hans' ? '默认样式' : 'Default Style'}
            </h3>
            <ContactMap 
              locations={locations}
              locale={locale}
              selectedLocationId={selectedLocationId}
              onLocationSelect={handleLocationSelect}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">
              {locale === 'zh-Hans' ? '仅地图' : 'Map Only'}
            </h3>
            <ContactMap 
              locations={locations}
              locale={locale}
              showInfo={false}
            />
          </div>
        </div>
      </section>
    </div>
  );
}