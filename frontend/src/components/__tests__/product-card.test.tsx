/**
 * ProductCard组件测试
 */

import { render, screen } from '@testing-library/react';
import ProductCard from '../product/product-card';
import { Product } from '../../types/product';

const mockProduct: Product = {
  id: 1,
  name: 'LED显示屏P2.5',
  slug: 'led-display-p25',
  description: '高清室内LED显示屏，适用于会议室、展厅等场所',
  shortDescription: '高清室内LED显示屏',
  price: '¥15,000',
  category: {
    id: 1,
    name: '室内显示屏',
    slug: 'indoor-displays',
  },
  images: [
    {
      id: 1,
      url: '/images/products/led-p25-1.jpg',
      alternativeText: 'LED显示屏P2.5正面图',
      caption: '产品正面图',
    },
    {
      id: 2,
      url: '/images/products/led-p25-2.jpg',
      alternativeText: 'LED显示屏P2.5侧面图',
      caption: '产品侧面图',
    },
  ],
  specifications: {
    pixelPitch: '2.5mm',
    resolution: '1920x1080',
    brightness: '1000cd/m²',
    refreshRate: '3840Hz',
    viewingAngle: '160°',
    powerConsumption: '300W/m²',
  },
  features: [
    '高清显示',
    '低功耗',
    '长寿命',
    '易维护',
  ],
  applications: [
    '会议室',
    '展厅',
    '商场',
    '酒店大堂',
  ],
  isActive: true,
  isFeatured: true,
  publishedAt: '2024-01-15T10:00:00.000Z',
  createdAt: '2024-01-15T10:00:00.000Z',
  updatedAt: '2024-01-15T10:00:00.000Z',
};

describe('ProductCard Component', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} locale="zh" />);
    
    expect(screen.getByText('LED显示屏P2.5')).toBeInTheDocument();
    expect(screen.getByText('高清室内LED显示屏')).toBeInTheDocument();
    expect(screen.getByText('¥15,000')).toBeInTheDocument();
    expect(screen.getByText('室内显示屏')).toBeInTheDocument();
  });

  it('renders product image with correct attributes', () => {
    render(<ProductCard product={mockProduct} locale="zh" />);
    
    const image = screen.getByAltText('LED显示屏P2.5正面图');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('led-p25-1.jpg'));
  });

  it('renders product link with correct href', () => {
    render(<ProductCard product={mockProduct} locale="zh" />);
    
    const productLink = screen.getByRole('link');
    expect(productLink).toHaveAttribute('href', '/zh/products/led-display-p25');
  });

  it('displays featured badge when product is featured', () => {
    render(<ProductCard product={mockProduct} locale="zh" />);
    
    const featuredBadge = screen.getByText('推荐');
    expect(featuredBadge).toBeInTheDocument();
    expect(featuredBadge).toHaveClass('bg-red-500');
  });

  it('does not display featured badge when product is not featured', () => {
    const nonFeaturedProduct = { ...mockProduct, isFeatured: false };
    render(<ProductCard product={nonFeaturedProduct} locale="zh" />);
    
    expect(screen.queryByText('推荐')).not.toBeInTheDocument();
  });

  it('renders key specifications', () => {
    render(<ProductCard product={mockProduct} locale="zh" />);
    
    expect(screen.getByText('像素间距: 2.5mm')).toBeInTheDocument();
    expect(screen.getByText('分辨率: 1920x1080')).toBeInTheDocument();
    expect(screen.getByText('亮度: 1000cd/m²')).toBeInTheDocument();
  });

  it('handles missing image gracefully', () => {
    const productWithoutImage = {
      ...mockProduct,
      images: [],
    };
    
    render(<ProductCard product={productWithoutImage} locale="zh" />);
    
    // 应该显示占位符图片
    const placeholderImage = screen.getByAltText('LED显示屏P2.5');
    expect(placeholderImage).toBeInTheDocument();
  });

  it('handles missing price gracefully', () => {
    const productWithoutPrice = {
      ...mockProduct,
      price: undefined,
    };
    
    render(<ProductCard product={productWithoutPrice} locale="zh" />);
    
    expect(screen.getByText('询价')).toBeInTheDocument();
  });

  it('applies hover effects', () => {
    render(<ProductCard product={mockProduct} locale="zh" />);
    
    const card = screen.getByRole('link');
    expect(card).toHaveClass('hover:shadow-lg', 'transition-shadow');
  });

  it('has proper accessibility attributes', () => {
    render(<ProductCard product={mockProduct} locale="zh" />);
    
    const card = screen.getByRole('link');
    expect(card).toHaveAttribute('aria-label', expect.stringContaining('LED显示屏P2.5'));
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'LED显示屏P2.5正面图');
  });
});

describe('ProductCard Component - English Locale', () => {
  it('renders English content correctly', () => {
    const englishProduct = {
      ...mockProduct,
      name: 'LED Display P2.5',
      shortDescription: 'High-definition indoor LED display',
      category: {
        ...mockProduct.category,
        name: 'Indoor Displays',
      },
    };
    
    render(<ProductCard product={englishProduct} locale="en" />);
    
    expect(screen.getByText('LED Display P2.5')).toBeInTheDocument();
    expect(screen.getByText('High-definition indoor LED display')).toBeInTheDocument();
    expect(screen.getByText('Indoor Displays')).toBeInTheDocument();
  });

  it('renders English product link with correct href', () => {
    render(<ProductCard product={mockProduct} locale="en" />);
    
    const productLink = screen.getByRole('link');
    expect(productLink).toHaveAttribute('href', '/en/products/led-display-p25');
  });

  it('displays English featured badge', () => {
    render(<ProductCard product={mockProduct} locale="en" />);
    
    const featuredBadge = screen.getByText('Featured');
    expect(featuredBadge).toBeInTheDocument();
  });

  it('displays English inquiry text for missing price', () => {
    const productWithoutPrice = {
      ...mockProduct,
      price: undefined,
    };
    
    render(<ProductCard product={productWithoutPrice} locale="en" />);
    
    expect(screen.getByText('Inquiry')).toBeInTheDocument();
  });
});